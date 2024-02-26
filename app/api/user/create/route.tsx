import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await req.json();
    const { error: errorUsers } = await supabase.from("user").insert(user);
    if (errorUsers) throw errorUsers;
    if (!user.business) {
      const { error: errorProfile } = await supabase.from("individual").insert({ user_id: user.user_id });
      if (errorProfile) throw errorProfile;
    }
    return NextResponse.json({ message: "User created successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
