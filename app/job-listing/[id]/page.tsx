"use client";

import NavBar from "@/components/NavBar";
import Loader from "@/components/ui/Loader";
import { UserContext, UserContextType } from "@/context/UserContext";
import { JobListing } from "@/types/JobListing";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const page = ({}) => {
  const { id: jobListingId } = useParams();
  const { session } = useContext(UserContext) as UserContextType;
  const [jobListing, setJobListing] = useState();
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState();

  useEffect(() => {
    if (session) {
      fetchListing();
      fetchApplication();
    }
  }, [session]);

  const fetchListing = async () => {
    const userId = session.data.session?.user.id;
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
        <div className="flex flex-col max-width w-full py-6">
          <div className="flex">
            <div className="flex flex-col flex-1">
              <p className="font-light">{jobListing.company}</p>
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold">{jobListing.title}</h1>
                {applied ? (
                  <div className="flex gap-2 items-center justify-center">
                    <p className="font-medium">Applied</p>
                    <Image src={"/done.svg"} alt="done" width={25} height={25} />
                  </div>
                ) : session.data.session?.user.id !== jobListing?.business_id ? (
                  <button onClick={handleApply} className="outline-button">
                    Apply
                  </button>
                ) : (
                  <Link href={"/dashboard/edit-listing"} onClick={handleApply} className="outline-button">
                    Edit Listing
                  </Link>
                )}
              </div>
              <p>{`${jobListing.location}, (${jobListing.remote ? "Remote" : "On-site"})`}</p>
              <p>{`$${jobListing.starting_pay} - $${jobListing.ending_pay}`}</p>
            </div>
          </div>
          <h2 className="font-bold mt-8">Description:</h2>
          <p className="text-lg">{jobListing.description}</p>
        </div>
      )}
    </main>
  );
};

export default page;
