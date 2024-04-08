const stripe = require("stripe")(
  process.env.NODE_ENV === "production" ? process.env.STRIPE_SECRET_LIVE_KEY : process.env.STRIPE_SECRET_TEST_KEY
);
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { user_id, weeks } = await req.json();
    if (!user_id || !weeks) throw Error("User ID/weeks not provided!");
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
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
      mode: "payment",
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
