import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import nodeMailer from "nodemailer";
import { google } from "googleapis";
import { redirect } from "next/navigation";

export async function POST(req, res) {
  try {
    // Authentication
    const access_token = req.headers.get("x-supabase-auth").split(" ")[0];
    const refresh_token = req.headers.get("x-supabase-auth").split(" ")[1];
    if (!access_token || !refresh_token) throw Error("You must be authorized to do this action!");
    const auth = await supabase.auth.setSession({ access_token, refresh_token });
    if (auth.error) throw auth.error;

    const { email, user_id } = await req.json();

    const { data, error } = await supabase
      .from("user")
      .select("gmail_refresh_token, gmail_access_token")
      .eq("user_id", user_id)
      .single();
    if (error) throw error;
    if (!data.gmail_refresh_token || !data.gmail_access_token)
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
        refreshToken: data.gmail_refresh_token,
        accessToken: data.gmail_access_token,
      },
    });

    const info = await transporter.sendMail({
      from: email,
      to: "elostackinc@gmail.com",
      subject: "Hello from EloStack!",
      html: "<h1>Hello!</h1>",
    });

    console.log(`Email ${info.messageId} sent!`);

    return NextResponse.json({ message: "Application made successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
