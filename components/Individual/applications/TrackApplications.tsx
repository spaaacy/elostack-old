"use client";
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { UserContext, UserContextType } from "@/context/UserContext";

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  appliedOn: string; // Date in ISO format for simplicity
  status: "Applied" | "Interviewing" | "Offered" | "Rejected";
}

const TrackApplications: React.FC = () => {
  const { session } = useContext(UserContext) as UserContextType;
  const [applications, setApplications] = useState<Application[]>();

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
                <th className="text-left p-4 text-blue-600">Status</th>
                <th className="text-left p-4 text-blue-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {console.log(applications)}
              {applications &&
                applications.map((application) => (
                  <tr key={application.id} className="border-b">
                    <td className="p-4">{application.jobTitle}</td>
                    <td className="p-4">{application.company}</td>
                    <td className="p-4">{formatDate(application.created_at)}</td>
                    <td
                      className={`p-4 font-semibold ${
                        application.status === "Offered"
                          ? "text-green-600"
                          : application.status === "Rejected"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {application.status}
                    </td>
                    <td className="p-4">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">
                        Details
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Cancel</button>
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
