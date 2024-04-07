import Cors from "micro-cors";
import { headers } from "next/headers";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(
  process.env.NODE_ENV === "production" ? process.env.STRIPE_SECRET_LIVE_KEY : process.env.STRIPE_SECRET_TEST_KEY
);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const secret =
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_WEBHOOK_SECRET_LIVE_KEY
    : process.env.STRIPE_WEBHOOK_SECRET_TEST_KEY;

export async function POST(req) {
  try {
    const body = await req.text();

    const signature = headers().get("stripe-signature");

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      const user_id = event.data.object.metadata.user_id;
      const weeks = event.data.object.metadata.weeks;
      if (!user_id || !weeks) throw Error("User ID/weeks missing from metadata!");

      const auth = await supabase.auth.signInWithPassword({
        email: process.env.SUPABASE_ADMIN_EMAIL,
        password: process.env.SUPABASE_ADMIN_PASSWORD,
      });
      if (auth.error) throw auth.error;

      const { error } = await supabase.rpc("increment_subscriber_credits", {
        subscriber_user_id: user_id,
        amount: weeks * 168,
      });
      if (error) throw error;
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}
