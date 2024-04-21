import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    // Authentication
    const access_token = req.headers.get("x-supabase-auth").split(" ")[0];
    const refresh_token = req.headers.get("x-supabase-auth").split(" ")[1];
    if (!access_token || !refresh_token) throw Error("You must be authorized to do this action!");
    const auth = await supabase.auth.setSession({ access_token, refresh_token });
    if (auth.error) throw auth.error;

    const formData = await req.formData();
    const subscriber = JSON.parse(formData.get("subscriber"));

    const { error } = await supabase.from("subscriber").update(subscriber).eq("user_id", subscriber.user_id);
    if (error) throw error;

    // Iterate over the entries in the formData object
    for (const [key, value] of formData.entries()) {
      if (key === "subscriber") {
        continue;
      }

      if (value instanceof File) {
        // Upload files
        const { error } = await supabase.storage
          .from("attachments")
          .upload(`${subscriber.user_id}/${key}`, value, { cacheControl: 3600, upsert: true });
        if (error) throw error;
      }
    }

    return NextResponse.json({ message: "Subscriber created successfully!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
