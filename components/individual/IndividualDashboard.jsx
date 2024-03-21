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
  const [purchase, setPurchase] = useState(null);
  const [bookInterview, setBookInterview] = useState(false);
  const { profileData, setProfileData } = profileStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (session) {
      if (searchParams.has("success")) {
        toast.success("Purchase made successfully!");
      } else if (searchParams.has("cancelled")) {
        toast.error("Purchase was unsuccessful!");
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
        await fetchPurchase();
        setLoading(false);
      } else {
        router.push("/signin");
        console.error("Error fetching profile:", result.error);
      }
    } else {
      console.log("Session not loaded or user ID undefined");
    }
  };

  const confirmBooking = async (payment_intent_id) => {
    const response = await fetch("/api/purchase/confirm-booking", {
      method: "POST",
      body: JSON.stringify({ payment_intent_id }),
    });
    if (response.status === 200) {
      toast.success("Booking confirmed!");
    }
  };

  const fetchPurchase = async () => {
    const userId = session?.data.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/purchase/${userId}`);
      if (response.status !== 200) return;
      const result = await response.json();
      setPurchase(result.data);
      if (result.data.status === "pending") {
        if (searchParams.has("booking_confirmed")) {
          confirmBooking(result.data.payment_intent_id);
        } else {
          setBookInterview(true);
        }
      }
    } else {
      console.log("Session not loaded or user ID undefined");
    }
  };

  const handlePayment = async () => {
    if (!profileData.user_id) return;
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ individual_id: profileData.user_id }),
      });
      const result = await response.json();
      if (response.status !== 200) {
        throw Error("Something went wrong");
      }
      const stripe = await loadStripe(
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_LIVE_KEY
          : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TEST_KEY
      );
      if (!stripe) {
        throw Error("Something went wrong");
      }
      await stripe.redirectToCheckout({ sessionId: result.session.id });
    } catch (error) {
      toast.error(error);
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

      <div className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8">
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
              {purchase && purchase?.status !== "complete" && (
                <p className="mr-4">
                  {`Booking Status: `}
                  <span className="font-bold capitalize ">{purchase?.status}</span>
                </p>
              )}
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
              {!purchase && (
                <button
                  onClick={handlePayment}
                  className="text-left inline-block bg-purple-700 text-white px-6 py-3 rounded hover:bg-purple-900 transition duration-150 ease-in-out"
                >
                  Purchase Mock Interview
                </button>
              )}
              {bookInterview && (
                <Link
                  target="_blank"
                  href={"https://calendly.com/elostack/30min"}
                  className="inline-block text-left bg-blueprimary text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-150 ease-in-out"
                >
                  Book interview
                </Link>
              )}
            </div>
          </div>

          <div className="space-y-6 mt-4">
            {applications &&
              applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-[#0f0f1c] p-6 rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {app.job_listing.title} at {app.job_listing.business.name}
                    </h3>
                    <p className="text-sm text-gray-400">{formatDate(app.created_at)}</p>
                  </div>
                  <Link
                    href={`/job-listing/${app.job_listing.id}`}
                    className="text-purple-500 font-bold hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              ))}
          </div>
        </section>
        <Toaster />
      </div>
    </main>
  );
};

export default IndividualDashboard;
