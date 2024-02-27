import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// TODO: Redo this to fetch all and then filter on frontend
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const params = await req.json();
    const nonEmptyParams = {};
    for (const key in params) {
      if (params[key] !== "") {
        nonEmptyParams[key] = params[key];
      }
    }
    const { data, error } = await supabase
      .from("job_listing")
      .select("*, business(*)")
      .match({
        active: true,
        ...nonEmptyParams,
      });
    if (error) throw error;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
