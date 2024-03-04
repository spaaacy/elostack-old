import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { id } = res.params;
    const { data: jobListing, error } = await supabase.from("job_listing").select().eq("id", id).single();
    if (error) throw error;
    return NextResponse.json({ jobListing }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
