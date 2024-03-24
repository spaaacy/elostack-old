import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { id } = res.params;
    const { data, error } = await supabase.from("user").select().eq("user_id", id).single();
    if (error) throw error;
    return NextResponse.json({ user: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
