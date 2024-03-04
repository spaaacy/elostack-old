import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { businessId } = res.params;
    const { data, error } = await supabase
      .from("purchase")
      .select(`* , individual(*)`)
      .eq("business_id", businessId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ purchases: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
