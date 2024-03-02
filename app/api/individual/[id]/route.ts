import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { id } = res.params;
    const { data, error } = await supabase?.from("individual").select().eq("user_id", id).single();
    if (error) throw error;
    return NextResponse.json({ individual: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
