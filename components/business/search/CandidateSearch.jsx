"use client";
import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Avatar from "react-avatar";
import { UserContext } from "@/context/UserContext";
import "aos/dist/aos.css";

const CandidateSearch = () => {
  const { session } = useContext(UserContext);
  const [candidates, setCandidates] = useState();

  useEffect(() => {
    if (session) {
      fetchIndividuals();
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
  console.log(candidates);
  if (candidates) {
    filteredCandidates = candidates.filter(
      (candidate) =>
        (candidate.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.last_name?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        candidate.position?.toLowerCase().includes(position.toLowerCase()) &&
        (grade !== "" ? candidate.interview?.grade?.toLowerCase().includes(grade.toLowerCase()) : true)
    );
  }

  return (
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <Head>
        <title>Candidate Search | EloStack</title>
      </Head>

      <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8">
        <section className="p-8">
          <h2 className="text-3xl font-bold text-blueprimary">Candidate Search</h2>
          <div className="flex flex-wrap gap-6 mt-6">
            <input
              type="text"
              className="w-full md:w-auto flex-grow p-2 border border-gray-300 rounded"
              placeholder="Search for a candidate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="w-full md:w-auto flex-grow p-2 border border-gray-300 rounded"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="">All Positions</option>
              <option value="intern">Intern</option>
              <option value="junior">Junior Developer</option>
              <option value="senior">Senior Developer</option>
            </select>
            {/* <select
              className="w-full md:w-auto flex-grow p-2 border border-gray-300 rounded"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select> */}
            <select
              className="w-full md:w-auto flex-grow p-2 border border-gray-300 rounded"
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

          <div className="mt-6 grid grid-cols-3 gap-6">
            {filteredCandidates.map((candidate, index) => (
              <div
                key={candidate.id}
                className="bg-gray-50 p-6 rounded-lg flex hover:shadow-xl transition-shadow duration-300"
              >
                <Avatar
                  name={`${candidate.first_name} ${candidate.last_name}`}
                  size="100"
                  round={true}
                  className="mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{`${candidate.first_name} ${candidate.last_name}`}</h3>
                  <p className="text-sm text-gray-600">{candidate.role}</p>
                  <p className="text-sm text-gray-600 capitalize">Level: {candidate.position}</p>
                  <p className="text-sm text-gray-600">
                    Grade: {candidate.interview?.grade ? candidate.interview?.grade : "-"}
                  </p>
                  <Link href={`/individual/${candidate.user_id}`}>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
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

export default CandidateSearch;
