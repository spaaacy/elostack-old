import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id, active } = await req.json();
    if (!id) throw Error("Job listing ID not provided!");
    const { error } = await supabase.from("job_listing").update({ active: active }).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ message: "Job listing closed successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
