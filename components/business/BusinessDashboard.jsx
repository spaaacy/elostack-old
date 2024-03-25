"use client";

import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import Footer from "../common/Footer";

const BusinessDashboard = () => {
  const { session } = useContext(UserContext);
  const [jobListings, setJobListings] = useState();
  const [businessDetails, setBusinessDetails] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    if (session) {
      fetchListings();
      fetchBusinessDetails();
      fetchUser();
    }
  }, [session]);

  const fetchUser = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const { user } = await response.json();
        setUser(user);
      }
    }
  };

  const fetchListings = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/job-listing?business_id=${userId}&latest=true`, {
        method: "GET",
      });
      if (response.status === 200) {
        const results = await response.json();
        setJobListings(results.data);
      }
    }
  };

  const fetchBusinessDetails = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/business/${userId}?user=true`);
      const result = await response.json();
      if (response.status === 200) {
        setBusinessDetails(result.business);
      } else {
        console.error("Fetching business details failed!");
      }
    }
  };

  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
      <Head>
        <title>Business Dashboard | EloStack</title>
      </Head>

      <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8">
        {/* Profile Summary */}
        <section className="p-5 border-b border-gray-700">
          <div className="text-center">
            {businessDetails && <h1 className="text-4xl font-bold">{`${businessDetails?.name} Dashboard`}</h1>}
          </div>
        </section>

        {/* Job Listings */}
        <section className="p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Latest Job Listings</h2>
            <div className="flex justify-center items-center gap-4">
              <Link
                href="/dashboard/create-listing"
                className="inline-block bg-purpleprimary text-white px-6 py-3 rounded hover:bg-purple-700 transition duration-150 ease-in-out"
              >
                Create Listing
              </Link>
              <Link
                href="/dashboard/view-listings"
                className="inline-block bg-purpleprimary text-white px-6 py-3 rounded hover:bg-purple-700 transition duration-150 ease-in-out"
              >
                View All Listings
              </Link>
            </div>
          </div>

          <div className="space-y-6 mt-4">
            {jobListings &&
              jobListings.map((jobListing) => (
                <div
                  key={jobListing.id}
                  className="bg-[#0f0f1c] p-6 rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{jobListing.title}</h3>
                    <p className="text-sm text-gray-400">{jobListing.location}</p>
                    <p className="text-sm text-gray-400">{`$${jobListing.starting_pay} - $${jobListing.ending_pay}`}</p>
                  </div>
                  <Link href={`/job-listing/${jobListing.id}`} className="text-purple-500 font-bold hover:underline">
                    Details
                  </Link>
                </div>
              ))}
          </div>
        </section>

        {/* Your Candidates */}
        <section className="p-8 rounded-lg shadow-lg mt-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-3xl font-bold text-white">Your Candidates</h2>
            </div>
            <div className="flex justify-center items-center gap-4">
              {/* <Link
                href="/dashboard/request-interview"
                className="inline-block bg-purpleprimary text-white px-6 py-3 rounded hover:bg-purple-700 transition duration-150 ease-in-out"
              >
                Request an Interview
              </Link> */}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* {purchases?.length > 0 ? (
              purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="bg-[#0f0f1c] p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 flex items-center"
                >
                  <Avatar
                    name={`${purchase.individual.first_name} ${purchase.individual.last_name}`}
                    size="100"
                    round={true}
                    className="mr-4"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-lg">{`${purchase.individual.first_name} ${purchase.individual.last_name}`}</h3>
                    <p className="text-sm text-gray-400 capitalize">{purchase.individual.position}</p>
                    <Link
                      href={`/individual/${purchase.individual.user_id}`}
                      className="mt-4 inline-block bg-purpleprimary text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-150 ease-in-out"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="font-bold">No purchases made</div>
            )} */}
          </div>
        </section>
      </main>
      <Footer />
    </main>
  );
};

export default BusinessDashboard;
