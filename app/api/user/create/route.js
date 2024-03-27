import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const user = await req.json();
    const { error } = await supabase
      .from("user")
      .insert({ user_id: user.user_id, business: user.business, email: user.email });
    if (error) throw error;
    return NextResponse.json({ message: "User created successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
