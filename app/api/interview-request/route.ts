import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const results = await supabase
      .from("interview_request")
      .select("*, business(*)")
      .order("created_at", { ascending: false });
    if (results.error) throw results.error;
    return NextResponse.json({ requests: results.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
