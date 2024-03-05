"use client";

import NavBar from "@/components/common/NavBar";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Page = ({}) => {
  const { id: jobListingId } = useParams();
  const { session } = useContext(UserContext);
  const [jobListing, setJobListing] = useState();
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    if (session) {
      fetchListing();
      fetchUser();
      fetchApplication();
    }
  }, [session]);

  const fetchListing = async () => {
    const response = await fetch(`/api/job-listing/${jobListingId}`, {
      method: "GET",
    });
    const results = await response.json();
    if (response.status === 200) {
      setJobListing(results.jobListing);
      setLoading(false);
    } else {
      console.error(results.error);
    }
  };

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

  const fetchApplication = async () => {
    const userId = session.data.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/application?user_id=${userId}&job_listing_id=${jobListingId}`, {
        method: "GET",
      });
      if (response.status !== 200) {
        setApplied(false);
      } else {
        setApplied(true);
      }
    }
  };

  const handleApply = async () => {
    const userId = session.data.session?.user.id;
    if (userId) {
      const response = await fetch("/api/application/create", {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          job_listing_id: jobListingId,
        }),
      });
      if (response.status === 201) {
        console.log("Application made successfully!");
      } else {
        console.error("Application unsuccessful!");
      }
      window.location.reload();
    }
  };

  return (
    <main className="flex flex-col flex-1">
      <NavBar />
      {loading ? (
        <div className="flex flex-1">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col w-[1080px] mx-auto py-6">
          <div className="flex">
            <div className="flex flex-col flex-1">
              <Link
                href={`/business/${jobListing.business?.user_id}`}
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                {jobListing.business?.name}
              </Link>
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold capitalize">{jobListing.title}</h1>
                {applied ? (
                  <div className="flex gap-2 items-center justify-center">
                    <p className="font-medium">Applied</p>
                    <Image src={"/done.svg"} alt="done" width={25} height={25} />
                  </div>
                ) : session.data.session?.user.id === jobListing?.business_id ? (
                  <Link
                    href={`/dashboard/edit-listing/${jobListing?.id}`}
                    className="bg-blueprimary text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                  >
                    Edit Listing
                  </Link>
                ) : (
                  !user?.business && (
                    <button
                      onClick={handleApply}
                      className="bg-blueprimary text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                    >
                      Apply
                    </button>
                  )
                )}
              </div>
              <p className="text-gray-500 capitalize">{jobListing.position}</p>
              <p className="text-gray-500 capitalize">{`${jobListing.location}, (${
                jobListing.remote ? "Remote" : "On-site"
              })`}</p>
              <p className="text-gray-500 capitalize">{`$${jobListing.starting_pay} - $${jobListing.ending_pay}`}</p>
            </div>
          </div>
          <h2 className="font-bold mt-8">Description:</h2>
          <p className="whitespace-pre-line">{jobListing.description}</p>
        </div>
      )}
    </main>
  );
};

export default Page;
