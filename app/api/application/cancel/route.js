import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req, res) {
  try {
    // Authentication
    const access_token = req.headers.get("x-supabase-auth").split(" ")[0];
    const refresh_token = req.headers.get("x-supabase-auth").split(" ")[1];
    if (!access_token || !refresh_token) throw Error("You must be authorized to do this action!");
    const auth = await supabase.auth.setSession({ access_token, refresh_token });
    if (auth.error) throw auth.error;

    const application = await req.json();
    if (!application.user_id || !application.job_listing_id) throw Error("User ID and/or job listing ID not provided!");
    const { error } = await supabase.from("application").delete().match(application);
    if (error) throw error;
    return NextResponse.json({ message: "Application deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
