import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const listing = await req.json();
    const { error } = await supabase.from("job_listing").insert(listing);
    if (error) throw error;
    return NextResponse.json({ message: "Job listed successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
