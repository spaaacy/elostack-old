import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const interview = await req.json();
    let results;
    results = await supabase.from("interview").insert(interview);
    if (results.error) throw results.error;
    results = await supabase
      .from("interview")
      .select("id")
      .eq("individual_id", interview.individual_id)
      .order("created_at", { ascending: false });
    if (results.error) throw results.error;
    const interviewId = results.data[0].id;
    results = await supabase
      .from("individual")
      .update({ interview_id: interviewId })
      .eq("user_id", interview.individual_id);
    if (results.error) throw results.error;
    return NextResponse.json({ message: "Interview created successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
