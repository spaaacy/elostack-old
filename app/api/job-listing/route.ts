import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const business_id = req.nextUrl.searchParams.get("business_id");
    let results;
    if (business_id) {
      results = await supabase.from("job_listing").select("*, business(*)").eq("business_id", business_id);
    } else {
      results = await supabase.from("job_listing").select("*, business(*)").eq("active", true);
    }
    if (results.error) throw results.error;
    return NextResponse.json({ data: results.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
