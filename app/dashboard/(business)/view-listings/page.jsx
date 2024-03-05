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
        await setLoading(false);
        fetchListings();
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
      <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
        <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8">
          <section>
            <div className="p-5 text-center border-b border-gray-200">
              <h2 className="text-4xl font-bold text-blueprimary ">Your Job Listings</h2>
            </div>
          </section>

          <section className="bg-center p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center -mt-[2rem] ">
              <h2 className="text-3xl font-bold text-blueprimary">Listings</h2>
              <div className="mt-[2rem]">
                <Link href="/business/job-listing">
                  <button className="inline-block bg-blueprimary text-white px-6 py-3 mb-6 rounded">
                    Create New Listing
                  </button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              {jobListings &&
                jobListings.map((listing) => (
                  <div key={listing.id} className="bg-gray-50 p-6 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{listing.title}</h3>
                      <p className="text-sm text-gray-600">{listing.location}</p>
                      <p className="text-sm text-gray-600">Posted on: {formatDate(listing.created_at)}</p>
                      <div className="flex text-sm text-gray-600">
                        <p>{`$${listing.starting_pay}`}</p>
                        <p>{"-"}</p>
                        <p>{`$${listing.ending_pay}`}</p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                      <Link
                        href={`/job-listing/${listing.id}`}
                        className="text-white bg-blueprimary px-4 py-2 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/dashboard/create-listing?id=${listing.id}`}
                        className="text-white bg-blueprimary px-4 py-2 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                      >
                        Edit
                      </Link>
                      <button
                        className={`text-white ${
                          listing.active ? "bg-red-500 hover:bg-red-700" : "bg-blueprimary hover:bg-blue-700"
                        } px-4 py-2 rounded transition duration-150 ease-in-out`}
                        onClick={() => closeJobListing(listing.id, !listing.active)}
                      >
                        {listing.active ? "Close" : "Re-Open"} Listing
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </main>
      </main>
    </>
  );
};

export default Page;
