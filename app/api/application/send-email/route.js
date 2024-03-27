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

    const transporter = nodeMailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "",
        pass: "",
      },
    });

    const info = await transporter.sendMail({
      from: "Mohamed <aakifahamath@gmail.com>",
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
