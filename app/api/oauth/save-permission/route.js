import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req, res) {
  try {
    // Authentication
    const supabase_access_token = req.headers.get("x-supabase-auth").split(" ")[0];
    const supabase_refresh_token = req.headers.get("x-supabase-auth").split(" ")[1];
    if (!supabase_access_token || !supabase_refresh_token) throw Error("You must be authorized to do this action!");
    const auth = await supabase.auth.setSession({
      access_token: supabase_access_token,
      refresh_token: supabase_refresh_token,
    });
    if (auth.error) throw auth.error;

    const { code, user_id } = await req.json();

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.GOOGLE_OAUTH_REDIRECT_URL
    );

    const { tokens } = await oauth2Client.getToken(code);
    console.log(tokens);
    const { error } = await supabase.from("subscribed_user").insert({
      user_id,
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
    });
    if (error) throw error;

    return NextResponse.json({ message: "OAuth added successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
