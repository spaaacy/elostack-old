// pages/dashboard.tsx

import Head from "next/head";
import React from "react";

const Dashboard: React.FC = () => {
  // Dummy data for demonstration
  const interviewScore = 85;
  const applications = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "Tech Inc.",
      status: "Interview Scheduled",
    },
    {
      id: 2,
      role: "Backend Developer",
      company: "Innovate LLC",
      status: "Application Under Review",
    },
    {
      id: 3,
      role: "Full Stack Developer",
      company: "Startup XYZ",
      status: "Offer Extended",
    },
  ];
  const recommendedJobs = [
    { id: 1, role: "React Developer", company: "Creative Solutions" },
    { id: 2, role: "Node.js Developer", company: "NextGen Tech" },
    { id: 3, role: "UI/UX Designer", company: "Design Studio" },
    { id: 4, role: "DevOps Engineer", company: "Cloud Services Inc." },
  ];

  return (
    <>
      <Head>
        <title>Job Seeker Dashboard | EloStack</title>
      </Head>

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto max-w-6xl bg-white rounded-lg shadow p-6 space-y-8">
          {/* Profile Summary Card */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Welcome Back, Jane Doe!
              </h2>
              <p className="text-gray-600">
                Your Interview Score:{" "}
                <span className="font-semibold">{interviewScore}%</span>
              </p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>

          {/* Job Application Status */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Applications
            </h2>
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">
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

          {/* Recommended Jobs */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Recommended for You
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold">{job.role}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <button className="mt-2 text-blue-600 hover:underline">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
