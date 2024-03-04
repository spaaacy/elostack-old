import { supabase } from "@/utils/supabase";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const pending = req.nextUrl.searchParams.get("pending");
    let results;
    if (pending) {
      results = await supabase
        .from("interview_request")
        .select("*, business(*), individual!inner(*)")
        .is("individual.interview_id", null)
        .order("created_at", { ascending: false });
      if (results.error) throw results.error;
    } else {
      results = await supabase
        .from("interview_request")
        .select("*, business(*)")
        .order("created_at", { ascending: false });
      if (results.error) throw results.error;
    }
    return NextResponse.json({ requests: results.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
