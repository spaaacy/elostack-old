import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    // Authentication
    const access_token = req.headers.get("x-supabase-auth").split(" ")[0];
    const refresh_token = req.headers.get("x-supabase-auth").split(" ")[1];
    if (!access_token || !refresh_token) throw Error("You must be authorized to do this action!");
    const auth = await supabase.auth.setSession({ access_token, refresh_token });
    if (auth.error) throw auth.error;

    const user_id = req.nextUrl.searchParams.get("user_id");
    const job_listing_id = req.nextUrl.searchParams.get("job_listing_id");
    let results;
    if (user_id && job_listing_id) {
      results = await supabase.from("application").select().match({ user_id, job_listing_id }).single();
    } else if (job_listing_id) {
      results = await supabase.from("application").select("*)").eq("job_listing_id", job_listing_id);
    } else {
      throw Error("No job listing id and/or user id provided!");
    }

    if (results.error) throw results.error;
    return NextResponse.json({ data: results.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
