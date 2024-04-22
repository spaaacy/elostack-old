import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { companies, states, seniorities, page } = await req.json();

    // Authentication
    const auth = await supabase.auth.signInWithPassword({
      email: process.env.SUPABASE_ADMIN_EMAIL,
      password: process.env.SUPABASE_ADMIN_PASSWORD,
    });
    if (auth.error) throw auth.error;

    let results = await supabase.rpc("show_leads_by_page", {
      companies,
      seniorities,
      states,
      page_number: page,
      page_size: 100,
    });
    if (results.error) throw results.error;
    const leads = results.data;

    results = await supabase.rpc("find_leads_count", {
      companies,
      seniorities,
      states,
    });
    if (results.error) throw results.error;
    const count = results.data;

    return NextResponse.json({ leads, count }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
