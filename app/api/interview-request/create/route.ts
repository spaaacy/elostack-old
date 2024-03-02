import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const request = await req.json();
    const { error } = await supabase.from("interview_request").insert(request);
    if (error) throw error;
    return NextResponse.json({ message: "Request made successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
