import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { payment_intent_id, individual_id } = await req.json();
    if (!individual_id || !payment_intent_id)
      throw Error("Individual ID and/or Payment Intent ID missing from metadata!");
    const { error } = await supabase.from("purchase").insert({ payment_intent_id, individual_id });
    if (error) throw error;
    return NextResponse.json({ message: "Purchase made successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
