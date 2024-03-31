import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import nodeMailer from "nodemailer";
import { google } from "googleapis";
import { redirect } from "next/navigation";
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
    const access_token = req.headers.get("x-supabase-auth").split(" ")[0];
    const refresh_token = req.headers.get("x-supabase-auth").split(" ")[1];
    if (!access_token || !refresh_token) throw Error("You must be authorized to do this action!");
    const auth = await supabase.auth.setSession({ access_token, refresh_token });
    if (auth.error) throw auth.error;

    const { email, user_id } = await req.json();

    // Fetch authorized URL for leads from private bucket
    let results;
    results = await supabase.storage.from("leads").createSignedUrl("test.csv", 3600);
    if (results.error) throw results.error;

    // Use URL to get convert CSV file to JSON
    const leads = await getLeads(results.data.signedUrl);

    results = await supabase
      .from("user")
      .select("gmail_refresh_token, gmail_access_token")
      .eq("user_id", user_id)
      .single();
    if (results.error) throw results.error;
    if (!results.data.gmail_refresh_token || !results.data.gmail_access_token)
      throw Error("Refresh token and/or access token not found!");

    const transporter = nodeMailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        user: email,
        refreshToken: results.data.gmail_refresh_token,
        accessToken: results.data.gmail_access_token,
      },
    });

    const info = await transporter.sendMail({
      from: email,
      to: leads[0].email,
      subject: "Interest in job opening",
      text: `Dear Hiring Manager,

    I hope this email finds you well. I am writing to express my keen interest in the Software Engineer Junior position advertised by ABC Business. With my educational background and hands-on experience in software development, I am excited about the opportunity to contribute to your team and grow both personally and professionally within your esteemed company.

    I recently graduated with a degree in Computer Science from XYZ University and have completed internships where I gained practical experience in software development methodologies, coding languages, and problem-solving skills. During my internship at [Previous Company/Institution], I had the opportunity to work on a diverse range of projects, which enhanced my understanding of software engineering principles and methodologies. Additionally, my coursework equipped me with a solid foundation in algorithms, data structures, and object-oriented programming.

    What particularly draws me to ABC Business is your reputation for innovative solutions and commitment to excellence. I am impressed by the projects your team has undertaken, especially [mention any specific projects or technologies you admire about the company]. I am eager to bring my skills and enthusiasm for software development to contribute to your ongoing success.

    I am confident that my technical skills, coupled with my strong work ethic and passion for continuous learning, make me a valuable asset to your team. I am excited about the prospect of collaborating with talented professionals at ABC Business to tackle challenging projects and make meaningful contributions to your objectives.

    Thank you for considering my application. I have attached my resume for your review, and I would welcome the opportunity to discuss how my background, skills, and enthusiasm align with the needs of your team in more detail.

    I am available for an interview at your earliest convenience and can be reached via email at email@gmail.com or by phone at (123) 456 7890.

    Thank you for your time and consideration.

    Warm regards,
    Mohamed
    `,
    });

    console.log(`Email ${info.messageId} sent!`);

    return NextResponse.json({ message: "Application made successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
