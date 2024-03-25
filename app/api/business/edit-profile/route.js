import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    // Authentication
    const access_token = req.headers.get("x-supabase-auth").split(" ")[0];
    const refresh_token = req.headers.get("x-supabase-auth").split(" ")[1];
    if (!access_token || !refresh_token) throw Error("You must be authorized to do this action!");
    const auth = await supabase.auth.setSession({ access_token, refresh_token });
    if (auth.error) throw auth.error;

    const profile = await req.json();
    console.log(profile);
    const { error } = await supabase.from("business").upsert(profile);
    if (error) throw error;
    return NextResponse.json({ message: "Profile updated successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
