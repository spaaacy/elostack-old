import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { companies, cities, states, seniority } = await req.json();

    // Authentication
    const auth = await supabase.auth.signInWithPassword({
      email: process.env.SUPABASE_ADMIN_EMAIL,
      password: process.env.SUPABASE_ADMIN_PASSWORD,
    });
    if (auth.error) throw auth.error;

    let query = supabase
      .from("lead")
      .select("organization_name, linkedin_url, seniority, name, city, state")
      .limit(100);
    if (companies.length > 0) query = query.in("organization_name", companies);
    if (states.length > 0) query = query.in("state", states);
    if (seniority.length > 0) query = query.in("seniority", seniority);
    const leads = await query;
    if (leads.error) throw leads.error;

    query = supabase.from("lead").select("*", { count: "exact", head: true }).limit(100);
    if (companies.length > 0) query = query.in("organization_name", companies);
    if (states.length > 0) query = query.in("state", states);
    if (seniority.length > 0) query = query.in("seniority", seniority);
    const count = await query;
    if (count.error) throw count.error;
    console.log(count);

    return NextResponse.json({ leads: leads.data, count: count.count }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
