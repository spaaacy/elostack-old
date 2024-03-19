const stripe = require("stripe")(
  process.env.NODE_ENV === "production" ? process.env.STRIPE_SECRET_LIVE_KEY : process.env.STRIPE_SECRET_TEST_KEY
);
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { individual_id } = await req.json();
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price:
            process.env.NODE_ENV === "production" ? "price_1OvAN0JipfpKYmm3XrwWsZh9" : "price_1OvAYeJipfpKYmm3vCwBfvfM",
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        individual_id,
      },
      success_url: `${req.nextUrl.origin}/dashboard?success=true`,
      cancel_url: `${req.nextUrl.origin}/dashboard?cancelled=true`,
    });

    return NextResponse.json({ session: checkoutSession }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ errormessage }, { status: error.statusCode || 500 });
  }
}
