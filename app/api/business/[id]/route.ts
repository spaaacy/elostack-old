import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { id } = res.params;
    const { data: business, error } = await supabase.from("business").select().eq("user_id", id).single();
    if (error) throw error;
    return NextResponse.json({ business }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
