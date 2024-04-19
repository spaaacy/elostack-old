import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";

export async function POST(req, res) {
  try {
    const { companies, cities, states, seniority } = await req.json();

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

    // Convert all options to lower case
    const companiesLower = companies.map((company) => company.toLowerCase());
    const statesLower = states.map((state) => state.toLowerCase());
    const citiesLower = cities.map((city) => {
      return { city: city.city.toLowerCase(), state: city.state.toLowerCase() };
    });
    const seniorityLower = seniority.map((seniority) => seniority.toLowerCase());

    const leadsFound = [];
    leads.forEach((lead) => {
      // Check if the object matches the input criteria
      if (
        (companiesLower.length === 0 || companiesLower.includes(lead.organization_name.toLowerCase())) &&
        (seniorityLower.length === 0 || seniorityLower.includes(lead.seniority.toLowerCase())) &&
        lead.country.toLowerCase() === "united states"
      ) {
        if (citiesLower.length === 0 && statesLower.length === 0) {
          leadsFound.push({
            name: lead.name,
            organization_name: lead.organization_name,
            seniority: lead.seniority,
            state: lead.state,
            city: lead.city,
            linkedin_url: lead.linkedin_url,
          });
        } else if (statesLower.includes(lead.state.toLowerCase())) {
          leadsFound.push({
            name: lead.name,
            organization_name: lead.organization_name,
            seniority: lead.seniority,
            state: lead.state,
            city: lead.city,
            linkedin_url: lead.linkedin_url,
          });
        } else if (
          citiesLower.some((city) => city.state === lead.state.toLowerCase() && city.city === lead.city.toLowerCase())
        ) {
          leadsFound.push({
            name: lead.name,
            organization_name: lead.organization_name,
            seniority: lead.seniority,
            state: lead.state,
            city: lead.city,
            linkedin_url: lead.linkedin_url,
          });
        }
      }
    });

    return NextResponse.json({ leads: leadsFound }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
