import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { data, error } = await supabase
      .from("individual")
      .select("*, interview!public_individual_interview_id_fkey(grade)")
      .eq("searching", true)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
