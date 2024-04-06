import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const auth = await supabase.auth.signInWithPassword({
      email: process.env.SUPABASE_ADMIN_EMAIL,
      password: process.env.SUPABASE_ADMIN_PASSWORD,
    });
    if (auth.error) throw auth.error;

    const results = await supabase.rpc("decrement_subscriber_credits", {
      subscriber_user_id: "ba8a4ccd-8435-4b8b-ba4e-0e966aff085b",
    });
    console.log(results);
    if (results.error) throw results.error;

    return NextResponse.json({ message: "Subscriber created successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
