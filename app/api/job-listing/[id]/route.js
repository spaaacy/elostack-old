import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const custom = req.nextUrl.searchParams.get("c");
    const { id } = res.params;
    let results;
    if (custom) {
      results = await supabase.from("job_listing_custom").select("*").eq("id", id).single();
    } else {
      results = await supabase.from("job_listing").select("*, business(*)").eq("id", id).single();
    }
    if (results.error) throw results.error;
    return NextResponse.json({ jobListing: results.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
