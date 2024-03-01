"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Avatar from "react-avatar";
import AOS from "aos";
import "aos/dist/aos.css";

const CandidateSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");
  const [grade, setGrade] = useState("");

  const candidates = [
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer",
      level: "Senior",
      grade: "A",
      description: "A highly skilled frontend developer...",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Backend Developer",
      level: "Junior",
      grade: "B",
      description: "A dedicated backend developer...",
    },
    {
      id: 3,
      name: "Bob Johnson",
      role: "Full Stack Developer",
      level: "Mid",
      grade: "C",
      description: "A versatile full stack developer...",
    },
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer",
      level: "Senior",
      grade: "A",
      description: "A highly skilled frontend developer...",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Backend Developer",
      level: "Junior",
      grade: "B",
      description: "A dedicated backend developer...",
    },
    {
      id: 3,
      name: "Bob Johnson",
      role: "Full Stack Developer",
      level: "Mid",
      grade: "C",
      description: "A versatile full stack developer...",
    },
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer",
      level: "Senior",
      grade: "A",
      description: "A highly skilled frontend developer...",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Backend Developer",
      level: "Junior",
      grade: "B",
      description: "A dedicated backend developer...",
    },
    {
      id: 3,
      name: "Bob Johnson",
      role: "Full Stack Developer",
      level: "Mid",
      grade: "C",
      description: "A versatile full stack developer...",
    },
  ];

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      candidate.role.toLowerCase().includes(position.toLowerCase()) &&
      candidate.level.toLowerCase().includes(level.toLowerCase()) &&
      candidate.grade.toLowerCase().includes(grade.toLowerCase())
  );

  return (
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <Head>
        <title>Candidate Search | EloStack</title>
      </Head>

      <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8">
        <section className="p-8">
          <h2 className="text-3xl font-bold text-blueprimary">
            Candidate Search
          </h2>
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
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
            </select>
            <select
              className="w-full md:w-auto flex-grow p-2 border border-gray-300 rounded"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
            <select
              className="w-full md:w-auto flex-grow p-2 border border-gray-300 rounded"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            >
              <option value="">All Grades</option>
              <option value="A">A (90-100%)</option>
              <option value="B">B (80-89%)</option>
              <option value="C">C (70-79%)</option>
              <option value="C">D (60-69%)</option>
              <option value="C">F (0-59%)</option>
            </select>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-6">
            {filteredCandidates.map((candidate, index) => (
              <div
                key={candidate.id}
                className="bg-gray-50 p-6 rounded-lg flex hover:shadow-xl transition-shadow duration-300"
              >
                <Avatar
                  name={candidate.name}
                  size="100"
                  round={true}
                  className="mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{candidate.name}</h3>
                  <p className="text-sm text-gray-600">{candidate.role}</p>
                  <p className="text-sm text-gray-600">
                    Level: {candidate.level}
                  </p>
                  <p className="text-sm text-gray-600">
                    Grade: {candidate.grade}
                  </p>
                  <Link href={`/candidates/${candidate.id}`}>
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
