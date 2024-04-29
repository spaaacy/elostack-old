import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { data } from "autoprefixer";

export async function POST(req, res) {
  try {
    // Authentication
    // const supabase_access_token = req.headers.get("x-supabase-auth").split(" ")[0];
    // const supabase_refresh_token = req.headers.get("x-supabase-auth").split(" ")[1];
    // if (!supabase_access_token || !supabase_refresh_token) throw Error("You must be authorized to do this action!");
    // const auth = await supabase.auth.setSession({
    //   access_token: supabase_access_token,
    //   refresh_token: supabase_refresh_token,
    // });
    // if (auth.error) throw auth.error;
    // Authentication
    const auth = await supabase.auth.signInWithPassword({
      email: process.env.SUPABASE_ADMIN_EMAIL,
      password: process.env.SUPABASE_ADMIN_PASSWORD,
    });
    if (auth.error) throw auth.error;
    // const { code, user_id } = await req.json();

    const dateNow = Date.now();
    const date = new Date(dateNow);
    const gmt = date.toLocaleString("en-US", { timeZone: "GMT" });
    const gmtDate = new Date(gmt);
    const unixGmtTimestamp = Math.floor(gmtDate.getTime() / 1000);

    const { data, error } = await supabase
      .from("subscriber")
      .select()
      .eq("user_id", "2bd290a3-1c51-4df0-9871-803520cfdc39");

    console.log({ a: Date.parse(data[0].oauth_expiry_date), b: gmtDate.getTime() });

    // const oauth2Client = new google.auth.OAuth2(
    //   process.env.GOOGLE_OAUTH_CLIENT_ID,
    //   process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    //   process.env.GOOGLE_OAUTH_REDIRECT_URL
    // );

    // const { tokens } = await oauth2Client.getToken(code);
    // console.log(tokens);
    // const date = new Date(tokens.expiry_date);
    // const { error } = await supabase
    //   .from("subscriber")
    //   .update({
    //     active: true,
    //     refresh_token: tokens.refresh_token,
    //     access_token: tokens.access_token,
    //     oauth_expiry_date: date.toLocaleString("en-US", { timeZone: "GMT" }),
    //   })
    //   .eq("user_id", user_id);
    // if (error) throw error;

    return NextResponse.json({ message: "OAuth added successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
