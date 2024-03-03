import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { id } = res.params;
    const user = req.nextUrl.searchParams.get("user");
    let result;
    if (user === "true") {
      result = await supabase.from("business").select("*, user(*)").eq("user_id", id).single();
    } else {
      result = await supabase.from("business").select().eq("user_id", id).single();
    }
    if (result.error) throw result.error;
    return NextResponse.json({ business: result.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
