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
  const { session, user } = useContext(UserContext) as UserContextType;
  const [jobListing, setJobListing] = useState();
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(true);

  useEffect(() => {
    if (session) {
      fetchListing();
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

  const fetchApplication = async () => {
    const response = await fetch("/api/application/", {
      method: "POST",
      body: JSON.stringify({
        user_id: session.data.session?.user.id,
        job_listing_id: jobListingId,
      }),
    });
    const result = await response.json();
    if (response.status !== 200) {
      setApplied(false);
    }
  };

  const handleApply = async () => {
    const response = await fetch("/api/application/create", {
      method: "POST",
      body: JSON.stringify({
        user_id: session.data.session?.user.id,
        job_listing_id: jobListingId,
      }),
    });
    if (response.status === 201) {
      console.log("Application made successfully!");
    } else {
      console.error("Application unsuccessful!");
    }
    window.location.reload();
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
            {/* <Image
            alt="company-logo"
            style={{ objectFit: "cover" }}
            width={150}
            height={100}
            src={"https://1000logos.net/wp-content/uploads/2017/02/Apple-Logosu.png"}
            // src={"https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"}
            // src={"https://www.logodesignteam.com/blog/wp-content/uploads/2017/07/Google_Logo-770x360.jpg"}
          /> */}
            <div className="flex flex-col flex-1">
              <p className="font-light">{jobListing.company}</p>
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold">{jobListing.title}</h1>
                {/* TODO: only show if same business is logged in */}
                {/* <Link href={``} className="outline-button">
                  Find candidates
                </Link> */}
                {!applied && session?.data?.session?.user && !user?.business ? (
                  <button onClick={handleApply} className="outline-button">
                    Apply
                  </button>
                ) : (
                  <div className="flex gap-2 items-center justify-center">
                    <p className="font-medium">Applied</p>
                    <Image src={"/done.svg"} alt="done" width={25} height={25} />
                  </div>
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
