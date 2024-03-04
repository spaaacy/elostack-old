"use client";

import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import Avatar from "react-avatar";

const BusinessDashboard: React.FC = () => {
  const { session } = useContext(UserContext);
  const [jobListings, setJobListings] = useState();
  const [businessDetails, setBusinessDetails] = useState();
  const [purchases, setPurchases] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    if (session) {
      fetchListings();
      fetchBusinessDetails();
      fetchPurchases();
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

  const fetchPurchases = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/purchase/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const results = await response.json();
        console.log(results);
        setPurchases(results.purchases);
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
    <>
      <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
        <Head>
          <title>Job Seeker Dashboard | EloStack</title>
        </Head>
        <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8">
          {/* Profile Summary */}

          <section>
            <div className="p-5 text-center border-b border-gray-200">
              {businessDetails && <h1 className="text-4xl font-bold ">{`${businessDetails?.name} Dashboard`}</h1>}
            </div>
          </section>

          {/* Job Listings */}
          {/* Your Applications */}
          <section className="bg-center mt-4 p-8 rounded-lg shadow-lg">
            <div className="flex justify-between mb-4 items-center -mt-[2rem] ">
              <h2 className="text-3xl font-bold text-blueprimary">Latest Job Listings</h2>
              <div className="flex items-center justify-center gap-4">
                <Link href="/dashboard/create-listing">
                  <button className="inline-block bg-blueprimary text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-150 ease-in-out">
                    Create Listing
                  </button>
                </Link>

                <Link href="/dashboard/view-listings">
                  <button className="inline-block bg-blueprimary text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-150 ease-in-out">
                    View All Listings
                  </button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              {jobListings &&
                jobListings.map((jobListing) => (
                  <div
                    key={jobListing.id}
                    className="bg-gray-50 p-6 rounded-lg flex justify-between items-center hover:shadow-xl transition-shadow duration-300 relative"
                  >
                    <div>
                      <h3 className="font-semibold text-lg">{jobListing.title}</h3>
                      <p className="text-sm text-gray-600">{jobListing.location}</p>
                      <p className="text-sm text-gray-600">{`$${jobListing.starting_pay} - $${jobListing.ending_pay}`}</p>
                    </div>
                    <Link href={`/job-listing/${jobListing.id}`} className="text-blueprimary hover:underline">
                      Details
                    </Link>
                  </div>
                ))}
            </div>
          </section>

          <section className="bg-cover bg-white mt-4 bg-center p-8 rounded-lg shadow-2xl space-y-6 ">
            <div className="flex justify-between items-center ">
              <div className="flex flex-col justify-center items-start">
                <h2 className="text-3xl font-bold text-blueprimary">Your candidates</h2>
                {user?.credits && <h3 className="text-sm text-gray-500">{`Balance: ${user?.credits} interviews`}</h3>}
              </div>
              <div className="flex justify-center items-center gap-4">
                <Link href="/dashboard/search-individuals">
                  <button className="inline-block bg-blueprimary text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-150 ease-in-out">
                    Search for Candidates
                  </button>
                </Link>
                <Link href="/dashboard/request-interview">
                  <button className="inline-block bg-blueprimary text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-150 ease-in-out">
                    Request an Interview
                  </button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchases?.length > 0 ? (
                purchases.map((purchase) => (
                  <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 flex items-center">
                    <Avatar
                      name={`${purchase.individual.first_name} ${purchase.individual.last_name}`}
                      size="100"
                      round={true}
                      className="mr-4"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-lg">{`${purchase.individual.first_name} ${purchase.individual.last_name} `}</h3>
                      <p className="text-sm text-gray-600 capitalize">{purchase.individual.position}</p>
                      <div>
                        <Link
                          href={`/individual/${purchase.individual.user_id}`}
                          className=" mt-6 inline-block bg-blueprimary text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-150 ease-in-out"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="font-bold">No purchases made</div>
              )}
            </div>
          </section>

          {/* Post a Job */}
        </main>{" "}
        <div className="mt-52"></div>
      </main>
    </>
  );
};

export default BusinessDashboard;
