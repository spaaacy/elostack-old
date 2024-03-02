import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const latest = req.nextUrl.searchParams.get("latest");
    const { userId } = res.params;
    let results;
    if (latest) {
      results = await supabase
        .from("application")
        .select(`* , job_listing("*", business(*))`)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .range(0, 4);
    } else {
      results = await supabase
        .from("application")
        .select(`* , job_listing("*", business(*))`)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
    }
    if (results.error) throw results.error;
    return NextResponse.json({ data: results.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
