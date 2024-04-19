import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(
  process.env.NODE_ENV === "production" ? process.env.STRIPE_SECRET_LIVE_KEY : process.env.STRIPE_SECRET_TEST_KEY
);

export async function POST(req, res) {
  try {
    // Authentication
    const access_token = req.headers.get("x-supabase-auth").split(" ")[0];
    const refresh_token = req.headers.get("x-supabase-auth").split(" ")[1];
    if (!access_token || !refresh_token) throw Error("You must be authorized to do this action!");
    const auth = await supabase.auth.setSession({ access_token, refresh_token });
    if (auth.error) throw auth.error;

    // Create Stripe customer first
    const user = await req.json();
    const customer = await stripe.customers.create({
      name: user.name,
      email: user.email,
    });

    const { error } = await supabase
      .from("user")
      .insert({ user_id: user.user_id, email: user.email, stripe_customer_id: customer.id });
    if (error) throw error;

    return NextResponse.json({ message: "User created successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
