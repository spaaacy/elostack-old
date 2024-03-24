"use client";

import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
import Loader from "@/components/common/Loader";
import Head from "next/head";
import Link from "next/link";
import Avatar from "react-avatar";
import "aos/dist/aos.css";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState();

  useEffect(() => {
    const loadData = async () => {
      const success = await verifyLogin("business");
      if (success) {
        await setLoading(false);
        fetchIndividuals();
      }
    };

    if (session) {
      loadData();
    }
  }, [session]);

  const fetchIndividuals = async () => {
    const response = await fetch("/api/individual", { method: "GET" });
    const results = await response.json();
    if (response.status === 200) {
      setCandidates(results.data);
    } else {
      console.error(results.error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");
  const [grade, setGrade] = useState("");

  let filteredCandidates = [];
  if (candidates) {
    filteredCandidates = candidates.filter((candidate) => true);
  }

  if (loading)
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );

  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
      <Head>
        <title>Candidate Search | EloStack</title>
      </Head>
      <NavBar />
      <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8">
        <section className="p-8">
          <h2 className="text-3xl font-bold text-white">Candidate Search</h2>
          <div className="flex flex-wrap gap-6 mt-6">
            <input
              type="text"
              className="w-full md:w-auto flex-grow p-2 border border-gray-700 rounded bg-[#0f0f1c] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search for a candidate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="w-full md:w-auto flex-grow p-2 border border-gray-700 rounded bg-[#0f0f1c] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="">All Positions</option>
              <option value="intern">Intern</option>
              <option value="junior">Junior Developer</option>
              <option value="senior">Senior Developer</option>
            </select>
            <select
              className="w-full md:w-auto flex-grow p-2 border border-gray-700 rounded bg-[#0f0f1c] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            >
              <option value="">All Grades</option>
              <option value="A">A (90-100%)</option>
              <option value="B">B (80-89%)</option>
              <option value="C">C (70-79%)</option>
              <option value="D">D (60-69%)</option>
              <option value="F">F (0-59%)</option>
            </select>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicants.map((candidate, index) => (
              <div
                key={candidate.id}
                className="bg-[#0f0f1c] p-6 rounded-lg flex hover:shadow-lg transition-shadow duration-300"
              >
                <Avatar
                  name={`${candidate.first_name} ${candidate.last_name}`}
                  size="100"
                  round={true}
                  className="mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{`${candidate.first_name} ${candidate.last_name}`}</h3>
                  <p className="text-sm text-gray-400">{candidate.role}</p>
                  <p className="text-sm text-gray-400 capitalize">Level: {candidate.position}</p>
                  <p className="text-sm text-gray-400">
                    Grade: {candidate.interview?.grade ? candidate.interview?.grade : "-"}
                  </p>
                  <Link href={`/individual/${candidate.user_id}`}>
                    <button className="mt-4 bg-purpleprimary text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-300">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </main>
  );
};

export default Page;
