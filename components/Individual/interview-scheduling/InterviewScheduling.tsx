import Head from "next/head";
import React from "react";
import CustomCalendar from "./CustomCalendar";

const InterviewScheduling: React.FC = () => {
  // List of preparation resources
  const resources = [
    {
      title: "Data Structures & Algorithms",
      description:
        "Deep dive into essential algorithms and data structures, their complexities, and problem-solving strategies.",
    },
    {
      title: "System Design Fundamentals",
      description:
        "Understand the basics of system design, including common architectures, scalability, and reliability principles.",
    },
    {
      title: "System Design Fundamentals",
      description:
        "Understand the basics of system design, including common architectures, scalability, and reliability principles.",
    },
    {
      title: "Coding Challenges",
      description:
        "Sharpen your coding skills by solving problems on platforms like LeetCode, HackerRank, and CodeSignal.",
    },
    {
      title: "Soft Skills Development",
      description:
        "Improve communication, teamwork, and problem-solving skills critical for succeeding in interviews.",
    },
    {
      title: "Technical Blogs and Articles",
      description:
        "Stay updated with the latest trends and insights in software development by following renowned tech blogs.",
    },
    {
      title: "Video Tutorials",
      description:
        "Visual learning through tutorials on complex topics available on platforms like YouTube, Coursera, and Udemy.",
    },
    {
      title: "Open Source Contributions",
      description:
        "Gain practical experience by contributing to open source projects relevant to your field of interest.",
    },
  ];

  return (
    <>
      <Head>
        <title>Technical Interview Scheduling | EloStack</title>
      </Head>

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto max-w-6xl bg-white rounded-lg shadow p-6 space-y-8">
          {/* Calendar for Scheduling Interviews */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Schedule Your Interview
            </h2>
            <CustomCalendar />
          </section>

          {/* Preparation Resources and Guidelines */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Preparation Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <div key={index} className="p-4 bg-blue-100 rounded-lg">
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p>{resource.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default InterviewScheduling;
