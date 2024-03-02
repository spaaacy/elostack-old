"use client";
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

const TrackApplications: React.FC = () => {
  const { session } = useContext(UserContext);
  const [applications, setApplications] = useState();

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
      fetchApplications();
    }
  }, [session]);

  const fetchApplications = async () => {
    const userId = session.data.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/application/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const results = await response.json();
        setApplications(results.data);
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

  return (
    <>
      <Head>
        <title>Track Applications | Your Company</title>
      </Head>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6 text-blue-600">Track Your Applications</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="border-b-2 border-blue-600">
              <tr>
                <th className="text-left p-4 text-blue-600">Job Title</th>
                <th className="text-left p-4 text-blue-600">Company</th>
                <th className="text-left p-4 text-blue-600">Applied On</th>
                <th className="text-right p-4 text-blue-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications &&
                applications.map((application) => (
                  <tr key={application.job_listing_id} className="border-b">
                    <td className="p-4 font-semibold">{application.job_listing.title}</td>
                    <td className="p-4 font-semibold">{application.job_listing.business.name}</td>
                    <td className="p-4">{formatDate(application.created_at)}</td>
                    <td className="p-4 flex justify-end">
                      <Link
                        href={`/job-listing/${application.job_listing.id}`}
                        className="text-blueprimary px-4 py-2 rounded mr-2"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => cancelApplication(application.job_listing.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TrackApplications;
