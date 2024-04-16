const stripe = require("stripe")(
  process.env.NODE_ENV === "production" ? process.env.STRIPE_SECRET_LIVE_KEY : process.env.STRIPE_SECRET_TEST_KEY
);
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

    const { user_id, weeks } = await req.json();
    if (!user_id || !weeks) throw Error("Required request parameters not provided!");

    let { data, error } = await supabase.from("user").select().eq("user_id", user_id).single();
    if (error) throw error;

    const sessionObject = {
      billing_address_collection: "auto",
      line_items: [
        {
          price:
            weeks === 2
              ? process.env.STRIPE_TWO_WEEK_PRICE_ID
              : weeks === 4
              ? process.env.STRIPE_FOUR_WEEK_PRICE_ID
              : weeks === 8
              ? process.env.STRIPE_EIGHT_WEEK_PRICE_ID
              : "",
          quantity: 1,
        },
      ],
      customer: data.stripe_customer_id,
      mode: "subscription",
      subscription_data: {
        metadata: {
          user_id,
          weeks,
        },
      },

      success_url: `${req.nextUrl.origin}/emailing?success=true`,
      cancel_url: `${req.nextUrl.origin}/emailing?cancelled=true`,
    };

    if (data.trial_used === false) sessionObject["subscription_data"]["trial_period_days"] = 7;

    const checkoutSession = await stripe.checkout.sessions.create(sessionObject);

    return NextResponse.json({ session: checkoutSession }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: error.statusCode || 500 });
  }
}
