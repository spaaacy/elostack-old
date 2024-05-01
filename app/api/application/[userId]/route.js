import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    // Authentication
    const auth = await supabase.auth.signInWithPassword({
      email: process.env.SUPABASE_ADMIN_EMAIL,
      password: process.env.SUPABASE_ADMIN_PASSWORD,
    });
    if (auth.error) throw auth.error;

    const { userId } = res.params;
    const results = await supabase
      .from("application")
      .select(`*, lead(*)`)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (results.error) throw results.error;
    return NextResponse.json({ data: results.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
