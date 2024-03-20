import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const json = await req.json();
    if (!json) throw Error("Interview data not provided!");
    const { individual_id, grade, feedback, video_url, payment_intent_id } = json;
    let results;

    // Create interview
    results = await supabase
      .from("interview")
      .insert({ individual_id, grade, feedback, video_url })
      .select("id")
      .single();
    if (results.error) throw results.error;
    const interviewId = results.data.id;

    // Update purchase status to complete
    if (!interviewId) throw Error("Interview ID not found!");
    results = await supabase
      .from("purchase")
      .update({ interview_id: interviewId, status: "complete" })
      .eq("payment_intent_id", payment_intent_id);
    if (results.error) throw results.error;

    // Update individual table with interview ID
    results = await supabase.from("individual").update({ interview_id: interviewId }).eq("user_id", individual_id);
    if (results.error) throw results.error;

    return NextResponse.json({ message: "Interview created successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
