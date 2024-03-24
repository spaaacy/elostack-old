"use client";

import NavBar from "@/components/common/NavBar";
import Loader from "@/components/common/Loader";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import formatDate from "@/utils/formatDate";
const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [jobListings, setJobListings] = useState();

  useEffect(() => {
    const loadData = async () => {
      const success = await verifyLogin("business");
      if (success) {
        await fetchListings();
        setLoading(false);
      }
    };

    if (session) {
      loadData();
    }
  }, [session]);

  const fetchListings = async () => {
    const userId = session?.data?.session?.user.id;
    if (!userId) return;
    const response = await fetch(`/api/job-listing?business_id=${userId}`, {
      method: "GET",
    });
    console.log(response);
    if (response.status === 200) {
      const results = await response.json();
      console.log(results);
      setJobListings(results.data);
    }
  };

  const closeJobListing = async (listingId, active) => {
    const response = await fetch("/api/job-listing/update-status", {
      method: "POST",
      body: JSON.stringify({ id: listingId, active }),
    });
    if (response.status === 200) {
      window.location.reload();
      console.log("Job listing deleted successfully.");
    }
  };

  if (loading)
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );

  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
        <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8">
          <section className="p-5 border-b border-gray-700">
            <div className="text-center">
              <h2 className="text-4xl font-bold">Your Job Listings</h2>
            </div>
          </section>

          <section className="p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Listings</h2>
              <div>
                <Link href="/dashboard/create-listing">
                  <button className="inline-block bg-purpleprimary text-white px-6 py-3 rounded hover:bg-purple-700 transition duration-150 ease-in-out">
                    Create New Listing
                  </button>
                </Link>
              </div>
            </div>

            <div className="space-y-6 mt-4">
              {jobListings &&
                jobListings.map((listing) => (
                  <Link
                    href={`/job-listing/${listing.id}`}
                    key={listing.id}
                    className="bg-[#0f0f1c] p-6 rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
                  >
                    <div>
                      <h3 className="font-semibold text-lg">{listing.title}</h3>
                      <p className="text-sm text-gray-400">{listing.location}</p>
                      <p className="text-sm text-gray-400">Posted on: {formatDate(listing.created_at)}</p>
                      <div className="flex text-sm text-gray-400">
                        <p>{`$${listing.starting_pay}`}</p>
                        <p>{"-"}</p>
                        <p>{`$${listing.ending_pay}`}</p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                      <Link
                        href={`/job-listing/${listing.id}/view-applicants`}
                        className="text-white bg-purpleprimary px-4 py-2 rounded hover:bg-purple-700 transition duration-150 ease-in-out"
                      >
                        View Applicants
                      </Link>
                      <Link
                        href={`/dashboard/edit-listing/${listing.id}`}
                        className="text-white bg-purpleprimary px-4 py-2 rounded hover:bg-purple-700 transition duration-150 ease-in-out"
                      >
                        Edit
                      </Link>
                      <button
                        className={`text-white ${
                          listing.active ? "bg-red-500 hover:bg-red-700" : "bg-purpleprimary hover:bg-purple-700"
                        } px-4 py-2 rounded transition duration-150 ease-in-out`}
                        onClick={() => closeJobListing(listing.id, !listing.active)}
                      >
                        {listing.active ? "Close" : "Re-Open"} Listing
                      </button>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </main>
      </main>
    </>
  );
};

export default Page;
