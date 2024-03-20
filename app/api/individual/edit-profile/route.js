import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const formData = await req.formData();
    const profilePicture = formData.get("profile_picture");
    const profileData = JSON.parse(formData.get("profile_data"));

    // Authentication
    const access_token = req.headers.get("x-supabase-auth").split(" ")[0];
    const refresh_token = req.headers.get("x-supabase-auth").split(" ")[1];
    if (!access_token || !refresh_token) throw Error("You must be authorized to do this action!");
    let results;
    results = await supabase.auth.setSession({ access_token, refresh_token });
    if (results.error) throw results.error;

    // Upload picture
    if (profilePicture) {
      results = await supabase.storage
        .from("profile-pictures")
        .upload(`${profileData.user_id}/default`, profilePicture, { cacheControl: 3600, upsert: true });
      if (results.error) throw results.error;
    }

    // Update user profile
    results = await supabase.from("individual").upsert(profileData);
    if (results.error) throw results.error;
    return NextResponse.json({ message: "Profile updated successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
