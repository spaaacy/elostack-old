import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(
  process.env.NODE_ENV === "production" ? process.env.STRIPE_SECRET_LIVE_KEY : process.env.STRIPE_SECRET_TEST_KEY
);

export async function POST(req, res) {
  try {
    // Authentication
    const auth = await supabase.auth.signInWithPassword({
      email: process.env.SUPABASE_ADMIN_EMAIL,
      password: process.env.SUPABASE_ADMIN_PASSWORD,
    });
    if (auth.error) throw auth.error;

    const { userId, referralCode } = await req.json();
    const { data, error } = await supabase.rpc("redeem_code", { p_user_id: userId, p_referral_code: referralCode });
    if (error) throw error;

    console.log(data);
    if (data === false) throw Error("Referral code redemption unsuccessful!");

    return NextResponse.json({ message: "Code redeemed successfully!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
