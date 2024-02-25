"use client";
import React, { useState } from "react";
import Head from "next/head";

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  appliedOn: string; // Date in ISO format for simplicity
  status: "Applied" | "Interviewing" | "Offered" | "Rejected";
}

// Mock application data
const initialApplications: Application[] = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    company: "Tech Solutions",
    appliedOn: "2024-02-20",
    status: "Interviewing",
  },
  {
    id: 2,
    jobTitle: "Backend Developer",
    company: "Innovatech",
    appliedOn: "2024-02-18",
    status: "Applied",
  },
  {
    id: 3,
    jobTitle: "Data Scientist",
    company: "DataWiz",
    appliedOn: "2024-02-15",
    status: "Offered",
  },
  // Add more applications as needed
];

const TrackApplications: React.FC = () => {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  // Convert ISO date string to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Head>
        <title>Track Applications | Your Company</title>
      </Head>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6 text-blue-600">
          Track Your Applications
        </h1>

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
              {applications.map((application) => (
                <tr key={application.id} className="border-b">
                  <td className="p-4">{application.jobTitle}</td>
                  <td className="p-4">{application.company}</td>
                  <td className="p-4">{formatDate(application.appliedOn)}</td>
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
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
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
