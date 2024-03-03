import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { business_id, individual_id } = await req.json();
    if (!individual_id || !business_id) throw Error("Individual ID and/or business ID not provided");
    let result;

    // Returns false if insufficient credits
    result = await supabase.rpc("decrementcredits", { id: business_id });
    if (result.error) throw result.error;
    if (!result.data) throw Error("Purchase unsuccessful. Insufficient credits.");

    result = await supabase.from("purchase").insert({ business_id, individual_id });
    if (result.error) {
      // Refund credit if error occurred during purchase
      result = await supabase.rpc("incrementcredits", { id: business_id, amount: 1 });
      throw result.error;
    }
    return NextResponse.json({ message: "Purchase made successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
