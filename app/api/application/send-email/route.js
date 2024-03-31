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

    // console.log(results.data);
    results.data.forEach(async (user) => {
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

      let chosenLead,
        unique = false;
      while (!unique) {
        chosenLead = leads[Math.floor(Math.random() * leads.length)];
        unique = true;
      }

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
    });

    return NextResponse.json({ message: "Applications made successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
