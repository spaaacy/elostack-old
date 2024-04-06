import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";

export async function POST(req, res) {
  try {
    const { companies, cities, states } = await req.json();

    // Authentication
    const auth = await supabase.auth.signInWithPassword({
      email: process.env.SUPABASE_ADMIN_EMAIL,
      password: process.env.SUPABASE_ADMIN_PASSWORD,
    });
    if (auth.error) throw auth.error;

    // Fetch authorized URL for leads from private bucket
    const results = await supabase.storage.from("leads").createSignedUrl("leads_1.csv", 3600);
    if (results.error) throw results.error;

    // Use URL to get convert CSV file to JSON
    const response = await fetch(results.data.signedUrl);

    if (!response.ok) {
      console.error(`Request Failed. Status Code: ${response.status}`);
      return;
    }

    const csvString = await response.text();
    const leads = Papa.parse(csvString, { header: true, skipEmptyLines: "greedy" }).data;

    let count = 0;
    leads.forEach((lead) => {
      // Check if the object matches the input criteria
      if (
        (companies.length === 0 || companies.includes(lead.organization_name)) &&
        (!states || lead.state.toLowerCase() === states.toLowerCase()) &&
        (!cities || lead.city.toLowerCase() === cities.toLowerCase()) &&
        lead.country.toLowerCase() === "united states"
      ) {
        count++;
      }
    });
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
