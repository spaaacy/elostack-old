import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { userId } = res.params;
    const { data, error } = await supabase.from("application").select(`* , job_listing("*")`).eq("user_id", userId);
    if (error) throw error;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
