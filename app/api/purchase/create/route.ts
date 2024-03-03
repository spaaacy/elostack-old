import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const purchaseDetails = await req.json();
    const { error } = await supabase.from("purchase").insert(purchaseDetails);
    if (error) throw error;
    return NextResponse.json({ message: "Purchase made successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
