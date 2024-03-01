"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BusinessDashboard: React.FC = () => {
  const [jobListings, setJobListings] = useState([
    {
      id: 1,
      role: "Frontend Developer",
      location: "New York, NY",
      postedDate: "2022-01-01",
      status: "Open",
    },
    {
      id: 2,
      role: "Backend Developer",
      location: "San Francisco, CA",
      postedDate: "2022-01-15",
      status: "Closed",
    },
    {
      id: 3,
      role: "Full Stack",
      location: "Remote",
      postedDate: "2022-02-01",
      status: "Open",
    },
  ]);

  const toggleJobListing = (id: number) => {
    setJobListings(
      jobListings.map((listing) =>
        listing.id === id
          ? {
              ...listing,
              status: listing.status === "Open" ? "Closed" : "Open",
            }
          : listing
      )
    );
  };

  return (
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8">
        <section>
          <div className="p-5 text-center border-b border-gray-200">
            <h2 className="text-4xl font-bold text-blueprimary ">
              Your Job Listings
            </h2>
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
            {jobListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-gray-50 p-6 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">{listing.role}</h3>
                  <p className="text-sm text-gray-600">{listing.location}</p>
                  <p className="text-sm text-gray-600">
                    Posted on: {listing.postedDate}
                  </p>
                  <p className="text-sm text-gray-600">{listing.status}</p>
                </div>
                <div className="space-x-4">
                  <button
                    className="text-white bg-blueprimary px-4 py-2 rounded"
                    onClick={() => toggleJobListing(listing.id)}
                  >
                    {listing.status === "Open" ? "Close" : "Open"} Listing
                  </button>
                  <button className="text-white bg-gray-600 px-4 py-2 rounded">
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </main>
  );
};

export default BusinessDashboard;
