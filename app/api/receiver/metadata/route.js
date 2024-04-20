import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    // Authentication
    const auth = await supabase.auth.signInWithPassword({
      email: process.env.SUPABASE_ADMIN_EMAIL,
      password: process.env.SUPABASE_ADMIN_PASSWORD,
    });
    if (auth.error) throw auth.error;

    let results = await supabase.from("unique_lead_states").select("state");
    if (results.error) throw results.error;
    const states = results.data.filter((item) => item.state !== null);

    results = await supabase.from("unique_lead_companies").select();
    if (results.error) throw results.error;
    const companies = results.data.filter((item) => item.organization_name !== null);

    results = await supabase.from("unique_lead_cities").select();
    if (results.error) throw results.error;
    const cities = results.data.filter((item) => item.city !== null && item.state !== null);

    results = await supabase.from("unique_lead_seniorities").select();
    if (results.error) throw results.error;
    const seniorities = results.data.filter((item) => item.seniority !== null);

    return NextResponse.json({ companies, cities, states, seniorities }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
