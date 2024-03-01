import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const user = await req.json();
    const { error: errorUsers } = await supabase.from("user").insert({ user_id: user.userId, business: user.business });
    if (errorUsers) throw errorUsers;
    if (!user.business) {
      const { error: errorProfile } = await supabase
        .from("individual")
        .insert({ user_id: user.userId, first_name: user.firstName, last_name: user.lastName });
      if (errorProfile) throw errorProfile;
    } else {
      const { error: errorProfile } = await supabase.from("business").insert({ user_id: user.userId, name: user.name });
      if (errorProfile) throw errorProfile;
    }
    return NextResponse.json({ message: "User created successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
