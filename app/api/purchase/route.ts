import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const individual_id = req.nextUrl.searchParams.get("individual_id");
    const business_id = req.nextUrl.searchParams.get("business_id");
    if (!individual_id || !business_id) throw Error("Individual ID and/or business ID not provided");
    const { data, error } = await supabase.from("purchase").select().match({ individual_id, business_id }).single();
    if (error) throw error;
    return NextResponse.json({ purchase: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
