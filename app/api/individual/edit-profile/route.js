import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const profile = await req.json();
    const { error } = await supabase.from("individual").upsert(profile);
    if (error) throw error;
    return NextResponse.json({ message: "Profile updated successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};