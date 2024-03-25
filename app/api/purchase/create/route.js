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

    const { payment_intent_id, user_id } = await req.json();
    if (!user_id || !payment_intent_id) throw Error("User ID and/or Payment Intent ID missing from metadata!");
    const { error } = await supabase.from("purchase").insert({ payment_intent_id, user_id });
    if (error) throw error;
    return NextResponse.json({ message: "Purchase made successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
