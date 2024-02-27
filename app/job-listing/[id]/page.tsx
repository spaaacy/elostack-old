"use client";

import NavBar from "@/components/NavBar";
import Loader from "@/components/ui/Loader";
import { JobListing } from "@/types/JobListing";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({}) => {
  const { id } = useParams();
  const [jobListing, setJobListing] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    const response = await fetch(`/api/job-listing/${id}`, {
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

  return (
    <main className="flex flex-col flex-1">
      <NavBar />
      {loading ? (
        <div className="flex flex-1">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col max-width w-full">
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
                <Link href={``} className="outline-button">
                  Find candidates
                </Link>
              </div>
              <p>{`${jobListing.location}, (${jobListing.remote ? "Remote" : "On-site"})`}</p>
              <p>{`$${jobListing.startingPay}-$${jobListing.endingPay}`}</p>
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
