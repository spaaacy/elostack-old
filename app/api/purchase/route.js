import { supabase } from "@/utils/supabase";
import { cookies } from "next/headers";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const results = await supabase
      .from("purchase")
      .select("*, individual(*)")
      .neq("status", "complete")
      .order("created_at", { ascending: false });
    if (results.error) throw results.error;
    return NextResponse.json({ requests: results.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

// Prevents caching of results at build-time
export const dynamic = "force-dynamic";
