"use client";

import Head from "next/head";
import React, { useEffect } from "react";
import Link from "next/link";

const BusinessDashboard: React.FC = () => {
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
    { id: 1, role: "Software Engineer", company: "Company A", status: "Open" },
    { id: 1, role: "Software Engineer", company: "Company A", status: "Open" },
    // Add more applications here
  ];

  const companyDetails = {
    name: "Company A",
    location: "New York, NY",
    industry: "Technology",
  };
  const potentialHires = [
    {
      id: 1,
      name: "John Doe",
      skills: "React, TypeScript",
      jobTitle: "Software Engineer",
      company: "Company A",
      profilePicture: "https://via.placeholder.com/150",
      link: "#",
    },
    {
      id: 2,
      name: "Jane Doe",
      skills: "Vue, JavaScript",
      jobTitle: "Frontend Developer",
      company: "Company B",
      profilePicture: "https://via.placeholder.com/150",
      link: "#",
    },

    {
      id: 1,
      name: "John Doe",
      skills: "React, TypeScript",
      jobTitle: "Software Engineer",
      company: "Company A",
      profilePicture: "https://via.placeholder.com/150",
      link: "#",
    },
    {
      id: 2,
      name: "Jane Doe",
      skills: "Vue, JavaScript",
      jobTitle: "Frontend Developer",
      company: "Company B",
      profilePicture: "https://via.placeholder.com/150",
      link: "#",
    },
    {
      id: 1,
      name: "John Doe",
      skills: "React, TypeScript",
      jobTitle: "Software Engineer",
      company: "Company A",
      profilePicture: "https://via.placeholder.com/150",
      link: "#",
    },
    {
      id: 2,
      name: "Jane Doe",
      skills: "Vue, JavaScript",
      jobTitle: "Frontend Developer",
      company: "Company B",
      profilePicture: "https://via.placeholder.com/150",
      link: "#",
    },

    // Add more potential hires here
  ];

  return (
    <>
      <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
        <Head>
          <title>Job Seeker Dashboard | EloStack</title>
        </Head>
        <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8">
          {/* Profile Summary */}

          <section>
            <div className="p-5 text-center border-b border-gray-200">
              <h2 className="text-2xl font-bold ">{`Welcome back, ${companyDetails.name}`}</h2>
              <p className="text-md text-gray-500">Software Dev</p>
            </div>
          </section>

          {/* Job Listings */}
          {/* Your Applications */}
          <section className="bg-center p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center -mt-[2rem] ">
              <h2 className="text-3xl font-bold text-blueprimary">
                Your Job Listings
              </h2>
              <div className="mt-[2rem]">
                <Link href="/business/job-listing">
                  <button className="inline-block bg-green-500 text-white px-6 py-3 mb-6 rounded hover:bg-green-600 transition duration-150 ease-in-out">
                    Post Job
                  </button>
                </Link>

                <Link href="/business/view-listings">
                  <button className="inline-block bg-blueprimary ml-10 text-white px-6 py-3 mb-6 rounded hover:bg-blue-700 transition duration-150 ease-in-out">
                    View More Applications
                  </button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-gray-50 p-6 rounded-lg flex justify-between items-center hover:shadow-xl transition-shadow duration-300 relative"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {app.role} at {app.company}
                    </h3>
                    <p className="text-sm text-gray-600">{app.status}</p>
                  </div>
                  <button className="text-blueprimary hover:underline">
                    Edit Job Listing
                  </button>
                  <button
                    className="absolute top-0 right-0 m-2 text-red-600 hover:text-red-800 transition duration-150 ease-in-out hidden group-hover:block"
                    onClick={() => closeJob(app.id)}
                  >
                    Close Job
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-cover bg-white mt-4 bg-center p-8 rounded-lg shadow-2xl space-y-6 ">
            <div className="flex justify-between items-center ">
              <h2 className="text-3xl font-bold text-blueprimary mb-6">
                Potential Hires
              </h2>
              <Link href="/business/search">
                <button className="inline-block bg-blueprimary text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-150 ease-in-out">
                  Search for Candidates
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {potentialHires.map((hire) => (
                <a
                  key={hire.id}
                  href={hire.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 flex items-center"
                >
                  <img
                    src={hire.profilePicture}
                    alt={hire.name}
                    className="w-24 h-24 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{hire.name}</h3>
                    <p className="text-sm text-gray-600">
                      {hire.jobTitle} at {hire.company}
                    </p>
                    <p className="text-sm text-gray-600">{hire.skills}</p>
                    <span className=" mt-6 inline-block bg-blueprimary text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-150 ease-in-out">
                      View Profile
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Post a Job */}
        </main>{" "}
        <div className="mt-52"></div>
      </main>
    </>
  );
};

export default BusinessDashboard;