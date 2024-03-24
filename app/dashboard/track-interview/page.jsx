"use client";

import { UserContext } from "@/context/UserContext";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import Link from "next/link";
import formatDate from "@/utils/formatDate";
import NavBar from "@/components/common/NavBar";

const CandidateTracker = () => {
  const { session } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState();
  const [error, setError] = useState();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetchCandidates();
    }
  }, [session]);

  const fetchCandidates = () => {
    // Replace this with your actual data
    const staticData = [
      {
        id: 1,
        name: "John Doe",
        job_listing: { title: "Software Engineer" },
        application: {
          created_at: new Date(),
          interview_stage: "Phone Screen",
          interview_start: new Date(),
          interview_end: new Date(),
        },
      },
      // Add more candidates as needed
    ];
    setCandidates(staticData);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
      <Head>
        <title>Candidate Tracker | YourApp</title>
      </Head>

      <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8">
        <NavBar />

        {/* Interview Status */}
        <section className="p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Candidate Interviews</h2>
          </div>
          <div className="space-y-6 mt-4">
            {candidates &&
              candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="bg-[#0f0f1c] p-6 rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {candidate.name} for {candidate.job_listing.title}
                    </h3>
                    <p className="text-sm text-gray-400">Applied on: {formatDate(candidate.application.created_at)}</p>
                    <p className="text-sm text-gray-400">Interview Stage: {candidate.application.interview_stage}</p>
                    <p className="text-sm text-gray-400">
                      Interview Start: {formatDate(candidate.application.interview_start)}
                    </p>
                    <p className="text-sm text-gray-400">
                      Interview End: {formatDate(candidate.application.interview_end)}
                    </p>
                  </div>
                  <Link href={`/candidate/${candidate.id}`} className="text-purple-500 font-bold hover:underline">
                    View Details
                  </Link>
                </div>
              ))}
          </div>
        </section>
      </main>
    </main>
  );
};

export default CandidateTracker;
