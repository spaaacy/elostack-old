import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";

export async function POST(req, res) {
  try {
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

    const companies = [],
      cities = [],
      states = [],
      seniorities = [];
    leads.forEach((lead) => {
      if (lead.organization_name !== "" && !companies.includes(lead.organization_name.toLowerCase())) {
        companies.push(lead.organization_name.toLowerCase());
      }

      if (
        !cities.some(
          (city) =>
            (city.city !== "" || city.state !== "") &&
            lead.city.trim().toLowerCase() === city.city &&
            lead.state.trim().toLowerCase() == city.state
        )
      ) {
        cities.push({ city: lead.city.trim().toLowerCase(), state: lead.state.trim().toLowerCase() });
      }

      if (lead.state !== "" && !states.includes(lead.state.toLowerCase())) {
        states.push(lead.state.toLowerCase());
      }

      if (lead.seniority !== "" && !seniorities.includes(lead.seniority.toLowerCase())) {
        seniorities.push(lead.seniority.toLowerCase());
      }
    });

    return NextResponse.json({ metadata: { companies, cities, states, seniorities } }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
