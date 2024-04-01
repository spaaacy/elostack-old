import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import nodeMailer from "nodemailer";
import Papa from "papaparse";
import https from "https";

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

    results = await supabase.from("subscribed_user").select("*, user(*, individual(*))");

    results.data.forEach(async (user) => {
      try {
        if (!user.active) return;
        if (!user.refresh_token || !user.access_token) throw Error("Refresh token and/or access token not found!");

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

        user.options.companies = user.options.companies.map((company) => company.toLowerCase());
        user.options.states = user.options.states.map((state) => state.toLowerCase());
        user.options.cities = user.options.cities.map((city) => {
          return { city: city.city.toLowerCase(), state: city.state.toLowerCase() };
        });

        let chosenLead,
          found = false,
          count = 0,
          visitedLeads = [];
        while (!found) {
          const index = Math.floor(Math.random() * leads.length);
          if (visitedLeads.includes(index)) continue;
          visitedLeads.push(index);
          if (++count === 10) {
            // Exit after ten attempts made to find match
            console.log("No matches found!");
            break;
          }
          chosenLead = leads[index];

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

        // const { error } = await supabase
        //   .from("application")
        //   .insert({ user_id: user.user_id, receiver_email: chosenLead.email });
        // if (error) throw error;

        const formattedTemplate = user.template
          .replace(/{{SENDER_NAME}}/g, user.user.individual.first_name + " " + user.user.individual.last_name)
          .replace(/{{RECEIVER_NAME}}/g, chosenLead.name)
          .replace(/{{COMPANY}}/g, chosenLead.organization_name);

        const info = await transporter.sendMail({
          from: user.user.email,
          to: chosenLead.email,
          subject: "Interest in job opening",
          text: formattedTemplate,
        });
        console.log(`Email ${info.messageId} sent!`);
      } catch (error) {
        console.error(error);
      }
    });

    return NextResponse.json({ message: "Applications made successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
