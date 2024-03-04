import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { user_id, amount } = await req.json();
    if (!user_id || !amount) throw Error("User ID and/or amount not provided!");
    const { data, error } = await supabase.rpc("incrementcredits", { id: user_id, amount });
    if (!data) throw Error("Purchase unsuccessful! Something unexpected happened!");
    if (error) throw error;
    return NextResponse.json({ message: "Purchase made successfully!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
