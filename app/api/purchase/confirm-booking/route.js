import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    // Authentication
    const auth = await supabase.auth.signInWithPassword({
      email: process.env.SUPABASE_ADMIN_EMAIL,
      password: process.env.SUPABASE_ADMIN_PASSWORD,
    });
    if (auth.error) throw auth.error;
    console.log(auth.data);
    const { payment_intent_id } = await req.json();
    if (!payment_intent_id) throw Error("Payment Intent ID not provided!");
    const results = await supabase
      .from("purchase")
      .update({ status: "booked" })
      .match({ payment_intent_id, status: "pending" });
    console.log(results);
    if (results.error) throw results.error;
    return NextResponse.json({ message: "Purchase status changed to booked!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
