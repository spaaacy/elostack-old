import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const interview = await req.json();
    if (!interview) throw Error("Interview data not provided!");
    let results;

    // Update interview request with individual ID
    results = await supabase
      .from("interview_request")
      .update({ individual_id: interview.individual_id })
      .eq("id", interview.request_id);
    if (results.error) throw results.error;

    // Create interview
    results = await supabase.from("interview").insert(interview).select("id").single();
    if (results.error) throw results.error;
    const interviewId = results.data.id;

    // Update individual table with interview ID
    if (!interviewId) throw Error("Interview ID not found!");
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
