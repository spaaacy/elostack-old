import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const user_id = req.nextUrl.searchParams.get("user_id");
    const job_listing_id = req.nextUrl.searchParams.get("job_listing_id");
    if (!user_id || !job_listing_id) throw Error("No job listing id and/or user id provided!");
    const { data: application, error } = await supabase
      .from("application")
      .select()
      .match({ user_id, job_listing_id })
      .single();
    if (error) throw error;
    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
