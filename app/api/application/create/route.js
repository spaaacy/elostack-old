import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const application = await req.json();
    const { error } = await supabase.from("application").insert(application);
    if (error) throw error;
    return NextResponse.json({ message: "Application made successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
