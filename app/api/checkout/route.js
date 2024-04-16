const stripe = require("stripe")(
  process.env.NODE_ENV === "production" ? process.env.STRIPE_SECRET_LIVE_KEY : process.env.STRIPE_SECRET_TEST_KEY
);
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { user_id, weeks, customer_id } = await req.json();
    if (!user_id || !weeks || !customer_id) throw Error("Required request parameters not provided!");
    const checkoutSession = await stripe.checkout.sessions.create({
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
      customer: customer_id,
      mode: "subscription",
      subscription_data: {
        trial_period_days: 7,
      },
      metadata: {
        user_id,
        weeks,
      },
      success_url: `${req.nextUrl.origin}/emailing?success=true`,
      cancel_url: `${req.nextUrl.origin}/emailing?cancelled=true`,
    });

    return NextResponse.json({ session: checkoutSession }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ errormessage }, { status: error.statusCode || 500 });
  }
}
