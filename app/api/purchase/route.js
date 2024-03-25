import { supabase } from "@/utils/supabase";
import { cookies } from "next/headers";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    // Authentication
    const access_token = req.headers.get("x-supabase-auth").split(" ")[0];
    const refresh_token = req.headers.get("x-supabase-auth").split(" ")[1];
    if (!access_token || !refresh_token) throw Error("You must be authorized to do this action!");
    const auth = await supabase.auth.setSession({ access_token, refresh_token });
    if (auth.error) throw auth.error;

    const results = await supabase
      .from("purchase")
      .select("*, individual(*)")
      .eq("status", "booked")
      .order("created_at", { ascending: false });
    if (results.error) throw results.error;
    return NextResponse.json({ purchases: results.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

// Prevents caching of results at build-time
export const dynamic = "force-dynamic";
