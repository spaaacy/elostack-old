"use client";

import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Loader from "@/components/common/Loader";
import formatDate from "@/utils/formatDate";
import { profileStore } from "@/components/individual/profileStore";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState();
  const [error, setError] = useState();
  const { profileData, setProfileData } = profileStore();

  useEffect(() => {
    const loadData = async () => {
      const success = await verifyLogin("individual");
      if (success) {
        await setLoading(false);
        fetchIndividual();
        fetchApplications();
      }
    };

    if (session) {
      loadData();
    }
  }, [session]);

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

  const fetchApplications = async () => {
    const userId = session.data.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/application/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const results = await response.json();
        console.log(results);
        setApplications(results.data);
        setLoading(false);
      }
    }
  };

  const cancelApplication = async (jobListingId) => {
    const userId = session.data.session?.user.id;
    if (userId && jobListingId) {
      const response = await fetch(`/api/application/cancel`, {
        method: "DELETE",
        body: JSON.stringify({
          user_id: userId,
          job_listing_id: jobListingId,
        }),
      });
      if (response.status === 200) {
        console.log("Application cancelled successfully!");
        window.location.reload();
      }
    }
  };

  if (error) {
    return <ErrorComponent message={error} />;
  }

  if (loading)
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );

  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
      <NavBar />
      <Head>
        <title>Track Applications | EloStack</title>
      </Head>  
      <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8">
        <section className="p-5 border-b border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold">{`Welcome back, ${profileData.first_name}`}</h2>
            <p className="text-md text-gray-400 capitalize">{profileData.position}</p>
          </div>
        </section>
        <section className="p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Your Applications</h2>
          </div>
          <div className="space-y-6 mt-4">
            {applications?.length > 0 ? (
              applications.map((app) => (
                <div
                  key={app.job_listing_id}
                  className="bg-[#0f0f1c] p-6 rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {app.job_listing.title} at {app.job_listing.business.name}
                    </h3>
                    <p className="text-sm text-gray-400">Applied on {formatDate(app.created_at)}</p>
                  </div>
                  <div className="flex">
                    <Link
                      href={`/job-listing/${app.job_listing.id}`}
                      className="text-purple-500 font-bold hover:underline px-4 py-2 rounded mr-2"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => cancelApplication(app.job_listing.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-bold">You have made no applications</p>
            )}
          </div>
        </section>
      </main>
    </main>
  );
};

export default Page;