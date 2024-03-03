"use client";
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { profileStore } from "../profileStore";
import Loader from "@/components/common/Loader";

const TrackApplications: React.FC = () => {
  const { session } = useContext(UserContext);
  const [loadingData, setLoadingData] = useState(true);
  const [applications, setApplications] = useState();
  const [error, setError] = useState();
  const { profileData, setProfileData } = profileStore();

  // Convert ISO date string to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (session) {
      fetchIndividual();
      fetchApplications();
    }
  }, [session]);

  const fetchIndividual = async () => {
    const userId = session?.data.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/individual/${userId}`);
      const result = await response.json();
      if (response.status === 200) {
        setProfileData(result.individual);
        setLoadingData(false);
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
        setLoadingData(false);
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

  if (loadingData) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <Head>
        <title>Track Applications | Your Company</title>
      </Head>
      <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8">
        <section data-aos="fade-up">
          <div className="p-5 text-center border-b border-gray-200">
            <h2 className="text-2xl font-bold ">{`Welcome back, ${profileData.first_name}`}</h2>
            <p className="text-md text-gray-500 capitalize">{profileData.position}</p>
          </div>
        </section>
        <section data-aos="fade-right" className="bg-center p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center -mt-[2rem] ">
            <h2 className="text-3xl font-bold text-blueprimary mt-4 mb-4">Your Applications</h2>
          </div>
          <div className="space-y-6">
            {applications &&
              applications.map((app) => (
                <div
                  key={app.job_listing_id}
                  className="bg-gray-50 p-6 rounded-lg flex justify-between items-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {app.job_listing.title} at {app.job_listing.business.name}
                    </h3>
                    <p className="text-sm text-gray-600">Applied on {formatDate(app.created_at)}</p>
                  </div>
                  <div className="flex">
                    <Link
                      href={`/job-listing/${app.job_listing.id}`}
                      className="text-blue-600 hover:underline px-4 py-2 rounded mr-2"
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
              ))}
          </div>
        </section>
      </main>
    </main>
  );
};

export default TrackApplications;
