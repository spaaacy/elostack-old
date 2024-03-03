import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { id } = res.params;
    const interview = req.nextUrl.searchParams.get("interview");
    let results;
    if (interview === "true") {
      results = await supabase?.from("individual").select("*, interview(*)").eq("user_id", id).single();
    } else {
      results = await supabase?.from("individual").select().eq("user_id", id).single();
    }
    if (results.error) throw results.error;
    return NextResponse.json({ individual: results.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}