"use client";

import { UserContext } from "@/context/UserContext";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { profileStore } from "./profileStore";
import Loader from "@/components/common/Loader";
import Link from "next/link";
import formatDate from "@/utils/formatDate";
import { loadStripe } from "@stripe/stripe-js";
import toast, { Toaster } from "react-hot-toast";

const IndividualDashboard = () => {
  const { session } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState();
  const [error, setError] = useState();
  const { profileData, setProfileData } = profileStore();
  const router = useRouter();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (session) {
      console.log(session);
      if (searchParams.has("success")) {
        toast.success("Mock interview purchased!");
      } else if (searchParams.has("cancelled")) {
        toast.error("Purchase unsuccessful!");
      }
      fetchIndividual();
      fetchApplications();
    }
  }, [session]);

  const fetchApplications = async () => {
    const userId = session.data.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/application/${userId}?latest=true`, {
        method: "GET",
      });
      if (response.status === 200) {
        const results = await response.json();
        setApplications(results.data);
      }
    }
  };

  const fetchIndividual = async () => {
    const userId = session?.data.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/individual/${userId}`);
      const result = await response.json();
      if (response.status === 200) {
        setProfileData(result.individual);
        setLoading(false);
      } else {
        router.push("/signin");
        console.error("Error fetching profile:", result.error);
      }
    } else {
      console.log("Session not loaded or user ID undefined");
    }
  };

  if (loading) {
    return (
      <>
        <Loader />
        <Toaster />
      </>
    );
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#2b1f38]">
      <Head>
        <title>Individual Dashboard | EloStack</title>
      </Head>

      <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8">
        {/* Profile Summary */}
        <section className="p-5 border-b border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold">{`Welcome back, ${profileData.first_name}`}</h2>
            <p className="text-md text-gray-400 capitalize">{`${
              profileData.position ? profileData.position : "Your Position"
            } ${
              profileData.city && profileData.state ? ` | ${profileData.city}, ${profileData.state.toUpperCase()}` : ""
            }`}</p>
          </div>
        </section>

        {/* Job Application Status */}
        <section className="p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Your Applications</h2>
            <div className="flex justify-center items-center gap-4">
              <Link
                href={`/job-listing`}
                className="inline-block text-white px-6 py-3 rounded hover:bg-purple-900 transition duration-150 ease-in-out bg-purple-700"
              >
                Find Job Listings
              </Link>
              <Link
                href={"/dashboard/applications"}
                className="inline-block bg-purple-700 text-white px-6 py-3 rounded hover:bg-purple-900 transition duration-150 ease-in-out"
              >
                View All Applications
              </Link>
              <form action={"/api/payment/checkout-session"} method="POST">
                <button
                  className="text-left inline-block bg-purple-700 text-white px-6 py-3 mb-6 rounded hover:bg-purple-900 transition duration-150 ease-in-out"
                  type="submit"
                  role="link"
                >
                  Purchase Mock Interview
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            {applications &&
              applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-gray-50 p-6 rounded-lg flex justify-between items-center hover:shadow-xl transition-shadow duration-300"
                >
                  {console.log(app)}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {app.job_listing.title} at {app.job_listing.business.name}
                    </h3>
                    <p className="text-sm text-gray-600">{formatDate(app.created_at)}</p>
                  </div>
                  <Link href={`/job-listing/${app.job_listing.id}`} className="text-blue-600 hover:underline">
                    View Details
                  </Link>
                </div>
              ))}
          </div>
        </section>
        <Toaster />
      </main>
    </main>
  );
};

export default IndividualDashboard;
