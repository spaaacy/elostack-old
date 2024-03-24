import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const results = await supabase
      .from("purchase")
      .select("*, individual(*)")
      .neq("status", "complete")
      .order("created_at", { ascending: false });
    if (results.error) throw results.error;
    console.log(results.data);
    return NextResponse.json({ requests: results.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
