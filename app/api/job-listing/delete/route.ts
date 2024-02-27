import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    if (!id) throw Error("Job listing ID not provided!");
    const { error } = await supabase.from("job_listing").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ message: "Job listing deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
