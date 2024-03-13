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
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <Head>
        <title>Candidate Tracker | YourApp</title>
      </Head>

      <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8">
        <NavBar />
        {/* Interview Status */}
        <section data-aos="fade-right" className="bg-center p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center -mt-[2rem] ">
            <h2 className="text-3xl font-bold text-blueprimary">Candidate Interviews</h2>
          </div>

          <div className="space-y-6">
            {candidates &&
              candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="bg-gray-50 p-6 rounded-lg flex justify-between items-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {candidate.name} for {candidate.job_listing.title}
                    </h3>
                    <p className="text-sm text-gray-600">Applied on: {formatDate(candidate.application.created_at)}</p>
                    <p className="text-sm text-gray-600">Interview Stage: {candidate.application.interview_stage}</p>
                    <p className="text-sm text-gray-600">Interview Start: {formatDate(candidate.application.interview_start)}</p>
                    <p className="text-sm text-gray-600">Interview End: {formatDate(candidate.application.interview_end)}</p>
                  </div>
                  <Link href={`/candidate/${candidate.id}`} className="text-blue-600 hover:underline">
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