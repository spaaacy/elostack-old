import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import nodeMailer from "nodemailer";
import Papa from "papaparse";
import https from "https";

const maxSendsPerReceiver = 10;

const getLeads = (url) => {
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        const { statusCode } = res;
        if (statusCode !== 200) {
          console.error(`Request Failed. Status Code: ${statusCode}`);
          return;
        }

        const csvData = [];
        res.on("data", (chunk) => csvData.push(chunk));

        res.on("end", async () => {
          const csvString = Buffer.concat(csvData).toString();

          resolve(Papa.parse(csvString, { header: true, skipEmptyLines: "greedy" }).data);
        });
      })
      .on("error", (error) => {
        console.error(`Error: ${error.message}`);
      });
  });
};

export async function POST(req, res) {
  try {
    // Authentication
    const auth = await supabase.auth.signInWithPassword({
      email: process.env.SUPABASE_ADMIN_EMAIL,
      password: process.env.SUPABASE_ADMIN_PASSWORD,
    });
    if (auth.error) throw auth.error;

    // Fetch authorized URL for leads from private bucket
    let results;
    results = await supabase.storage.from("leads").createSignedUrl("test.csv", 3600);
    if (results.error) throw results.error;

    // Use URL to get convert CSV file to JSON
    const leads = await getLeads(results.data.signedUrl);

    results = await supabase.from("subscriber").select("*, user(*, individual(*))");

    for (const user of results.data) {
      console.log("Beginning email loop...");
      try {
        // Check if user's subscription is active
        if (!user.active) continue;
        // Check if user's access & refresh token are available
        if (!user.refresh_token || !user.access_token) throw Error("Refresh token and/or access token not found!");

        // Convert all options to lower case
        user.options.companies = user.options.companies.map((company) => company.toLowerCase());
        user.options.states = user.options.states.map((state) => state.toLowerCase());
        user.options.cities = user.options.cities.map((city) => {
          return { city: city.city.toLowerCase(), state: city.state.toLowerCase() };
        });

        let chosenLead = null,
          found = false,
          visits = 0,
          visitedLeads = [];
        while (!found) {
          // Choose random index with the range of leads available
          const index = Math.floor(Math.random() * leads.length);
          // Check if lead was already visited and restart while loop if true
          if (visitedLeads.includes(index) && visitedLeads.length < leads.length) {
            console.log("Lead already checked.");
            continue;
          }
          visitedLeads.push(index);
          // Limit visits to 10, if lead still isn't found, exit while loop
          if (++visits === 10) {
            // Exit after ten attempts made to find match
            console.log("No matches found!");
            break;
          }

          chosenLead = leads[index];

          // Check how many times the lead was used already by others
          results = await supabase.from("receiver").select("send_count").eq("email", chosenLead.email);
          if (results.error) throw results.error;
          if (results.data.send_count >= maxSendsPerReceiver) {
            console.log("Max sends already met for this lead");
            continue;
          }

          // Check if the user aleady email the receiver
          results = await supabase
            .from("application")
            .select("*", { count: "exact", head: true })
            .match({ user_id: user.user_id, receiver_email: chosenLead.email });
          if (results.error) throw results.error;
          if (results.count > 0) {
            console.log("Lead has already been previously contacted");
            continue;
          }

          // Ensure lead matches user's preferences
          if (
            (user.options.companies.length > 0 &&
              user.options.companies.includes(chosenLead.organization_name.toLowerCase())) || // User specified a company & matches lead's company
            user.options.companies.length === 0 // Or user didn't specify any companies
          ) {
            if (user.options.cities.length === 0 && user.options.states.length === 0) {
              found = true;
              console.log("Match found!");
            } else if (
              user.options.cities.length > 0 && // User specified cities & lead's city matches specified city
              user.options.cities.some((city) => {
                return city.city === chosenLead.city.toLowerCase() && city.state === chosenLead.state.toLowerCase();
              })
            ) {
              found = true;
              console.log("Match found!");
            } else if (
              user.options.states.length > 0 && // User specified states & lead's state matches specified state
              user.options.states.includes(chosenLead.state.toLowerCase())
            ) {
              found = true;
              console.log("Match found!");
            }
          }
        }

        // If lead is found start emailing process
        if (found) {
          // Check if receiver record exists in receiver table
          results = await supabase
            .from("receiver")
            .select("*", { count: "exact", head: true })
            .eq("email", chosenLead.email);
          if (results.error) throw results.error;

          // Create receiver record if it doesn't exist
          if (results.count === 0) {
            console.log("Creating new receiver record.");
            const { error } = await supabase.from("receiver").insert({
              email: chosenLead.email,
              first_name: chosenLead.first_name,
              last_name: chosenLead.last_name,
              city: chosenLead.city,
              state: chosenLead.state,
              company: chosenLead.organization_name,
            });
            if (error) throw error;
          } else {
            // Increment the send count if the record does exist
            console.log("Incrementing receiver send count.");
            results = await supabase.rpc("increment_receiver_send_count", { receiver_email: chosenLead.email });
            if (results.error) throw results.error;
          }

          const formattedTemplate = user.template
            .replace(/{{SENDER_NAME}}/g, user.user.individual.first_name + " " + user.user.individual.last_name)
            .replace(/{{RECEIVER_NAME}}/g, chosenLead.name)
            .replace(/{{COMPANY}}/g, chosenLead.organization_name);

          const transporter = nodeMailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              type: "OAuth2",
              clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
              clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
              user: user.user.email,
              refreshToken: user.refresh_token,
              accessToken: user.access_token,
            },
          });

          const info = await transporter.sendMail({
            from: user.user.email,
            to: chosenLead.email,
            subject: "Interest in job opening",
            text: formattedTemplate,
          });
          console.log(`Email ${info.messageId} sent!`);

          // Create a record of the application if email succeeds
          const { error } = await supabase
            .from("application")
            .insert({ user_id: user.user_id, receiver_email: chosenLead.email });
          if (error) throw error;
        }

        console.log("Emails sent successfully!");
      } catch (error) {
        console.error(error);
      }
    }

    return NextResponse.json({ message: "Applications made successfully!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
