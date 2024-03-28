"use client";

import NavBar from "@/components/common/NavBar";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Footer from "@/components/common/Footer";

const Page = () => {
  const { id: jobListingId } = useParams();
  const { session } = useContext(UserContext);
  const [jobListing, setJobListing] = useState();
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState();
  const [user, setUser] = useState();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetchListing();
      fetchUser();
      fetchApplication();
    }
  }, [session]);

  const fetchListing = async () => {
    const response = await fetch(`/api/job-listing/${jobListingId}${searchParams.has("c") ? "?c=true" : ""}`, {
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
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
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
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
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

  const handleEmailApply = async () => {
    const userId = session.data.session?.user.id;
    if (!userId || !user) return;
    if (user.refresh_token && user.access_token) {
      const response = await fetch("/api/application/send-email", {
        method: "POST",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
        body: JSON.stringify({ user_id: userId, email: session.data.session.user.email }),
      });
      if (response.status === 201) {
        console.log("Application made successfully!");
      } else {
        console.error("Application unsuccessful!");
      }
      window.location.reload();
    } else {
      const response = await fetch("/api/oauth/request-permission", {
        method: "POST",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
      });
      if (response.status === 200) {
        const { url } = await response.json();
        router.push(url);
      }
    }
  };

  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
      <NavBar />
      {loading ? (
        <div className="flex flex-1">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8">
          <div className="p-5 border-b border-gray-700">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">{jobListing.title}</h1>
              <p className="text-lg text-gray-400 capitalize">{`${jobListing.position} | ${jobListing.location}, (${
                jobListing.remote ? "Remote" : "On-site"
              })`}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <Link
                href={`/business/${jobListing.business?.user_id}`}
                className="text-purple-500 hover:text-purple-400 hover:underline"
              >
                {jobListing.business?.name}
              </Link>
              <div className="flex justify-center items-center gap-2">
                {applied ? (
                  <div className="flex gap-2 items-center justify-center">
                    <p className="font-medium">Applied</p>
                    <Image src={"/done.svg"} alt="done" width={25} height={25} />
                  </div>
                ) : session.data.session?.user.id === jobListing?.business_id ? (
                  <Link
                    href={`/dashboard/edit-listing/${jobListing?.id}`}
                    className="bg-purpleprimary text-white px-6 py-3 rounded hover:bg-purple-700 transition duration-150 ease-in-out"
                  >
                    Edit Listing
                  </Link>
                ) : (
                  !user?.business && (
                    <button
                      onClick={searchParams.has("c") ? handleEmailApply : handleApply}
                      className="bg-purpleprimary text-white px-6 py-3 rounded hover:bg-purple-700 transition duration-150 ease-in-out"
                    >
                      Apply
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Salary Range</h2>
              <p className="text-lg text-gray-400">{`$${jobListing.starting_pay} - $${jobListing.ending_pay}`}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-lg text-gray-400 whitespace-pre-line">{jobListing.description}</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
};

export default Page;
