import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req, res) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    const scope = req.nextUrl.searchParams.get("scope");

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.GOOGLE_OAUTH_REDIRECT_URL
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    return NextResponse.json({ message: "OAuth added successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
