import stripePackage from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = stripePackage(process.env.STRIPE_SECRET_TEST_KEY);

export async function POST(req, res) {
  console.log(req.nextUrl.origin);
  console.log(req.nextUrl);
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1OvAYeJipfpKYmm3vCwBfvfM",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.nextUrl.origin}/dashboard?success=true`,
      cancel_url: `${req.nextUrl.origin}/dashboard?cancelled=true`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
  }
}
