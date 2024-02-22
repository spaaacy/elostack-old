"use client";

import NavBar from "@/components/NavBar";
import { JobListing } from "@/types/JobListing";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const page = ({}) => {
  const { id } = useParams();

  const listing: JobListing = {
    id: 1,
    title: "Software Engineer",
    description: "Develop and maintain software applications",
    company: "Acme Corp",
    location: "Seattle, WA",
    minimumPay: "80,000",
    maximumPay: "120,000",
    remote: false,
  };

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = () => {
    console.log(`Fetching listing ${id}`);
  };

  return (
    <main>
      <NavBar />
      <div className="flex flex-col max-width w-full">
        <div className="flex">
          <Image
            alt="company-logo"
            style={{ objectFit: "cover" }}
            width={150}
            height={100}
            src={"https://1000logos.net/wp-content/uploads/2017/02/Apple-Logosu.png"}
            // src={"https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"}
            // src={"https://www.logodesignteam.com/blog/wp-content/uploads/2017/07/Google_Logo-770x360.jpg"}
          />
          <div className="flex flex-col flex-1">
            <p className="font-light">{listing.company}</p>
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold">{listing.title}</h1>
              {/* TODO: only show if same business is logged in */}
              <Link href={`/business/search-candidates/${listing.id}`} className="outline-button">
                Find candidates
              </Link>
            </div>
            <p>{`${listing.location}, (${listing.remote ? "Remote" : "On-site"})`}</p>
            <p>{`$${listing.minimumPay}-$${listing.maximumPay}`}</p>
          </div>
        </div>
        <h2 className="font-bold mt-8">Description:</h2>
        <p className="text-lg">{listing.description}</p>
      </div>
    </main>
  );
};

export default page;
