"use client";

import Head from "next/head";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const BusinessDashboard: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Sample data
  const jobListings = [
    { id: 1, title: "Software Engineer", company: "Company A", status: "Open" },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Company B",
      status: "Closed",
    },
    // Add more job listings here
  ];

  const applications = [
    { id: 1, role: "Software Engineer", company: "Company A", status: "Open" },
    // Add more applications here
  ];

  const companyDetails = {
    name: "Company A",
    location: "New York, NY",
    industry: "Technology",
  };
  return (
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen animate-fadeIn bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <Head>
        <title>Job Seeker Dashboard | EloStack</title>
      </Head>

      <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8 animate-slideUp">
        {/* Profile Summary with AOS animation */}

        <section data-aos="fade-up">
          <div className="p-5 text-center border-b border-gray-200">
            <h2 className="text-2xl font-bold ">{`Welcome back, ${companyDetails.name}`}</h2>
            <p className="text-md text-gray-500">Software Dev</p>
            <div className="mt-0">
              <span className="text-lg font-semibold">Interview Score: </span>
              <span className="text-lg text-blue-600">88%</span>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        {/* Your Applications */}
        <section
          data-aos="fade-right"
          className="bg-center p-8 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center -mt-[2rem] ">
            <h2 className="text-3xl font-bold text-blueprimary">
              Your Job Listings
            </h2>
            <div className="mt-[2rem]">
              <Link href="/dashboard/applications">
                <button className="inline-block bg-blue-600 text-white px-6 py-3 mb-6 rounded hover:bg-blue-700 transition duration-150 ease-in-out">
                  View More Applications
                </button>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-gray-50 p-6 rounded-lg flex justify-between items-center hover:shadow-xl transition-shadow duration-300"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {app.role} at {app.company}
                  </h3>
                  <p className="text-sm text-gray-600">{app.status}</p>
                </div>
                <button className="text-blue-600 hover:underline">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>


        {/* Post a Job */}
        <section data-aos="fade-up" className="border-b pb-4 mb-4">
          <h2 className="text-3xl font-bold mt-4 mb-4">Post a Job</h2>
          <button className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Post a Job
          </button>
        </section>
      </main>
    </main>
  );
};

export default BusinessDashboard;
