"use client";

import { UserContext } from "@/context/UserContext";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import Link from "next/link";
import Avatar from "react-avatar";
import formatDate from "@/utils/formatDate";
import NavBar from "@/components/common/NavBar";
const JobApplicants = () => {
  const { session } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [positionFilter, setPositionFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");

  // Mock data
  const applicants = [
    {
      id: 1,
      name: "John Doe",
      applied_at: new Date(),
      position: "intern",
      grade: "A",
      profile_picture_url: "url_to_picture",
    },
    {
      id: 2,
      name: "Jane Doe",
      applied_at: new Date(),
      position: "senior",
      grade: "B",
      profile_picture_url: "url_to_picture",
    },
    // Add more mock applicants as needed
  ];

  if (loading) {
    return <Loader />;
  }

  const [searchFilter, setSearchFilter] = useState("");

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesPosition = positionFilter === "all" || applicant.position === positionFilter;
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "last7days" && new Date() - applicant.applied_at <= 7 * 24 * 60 * 60 * 1000) ||
      (dateFilter === "last30days" && new Date() - applicant.applied_at <= 30 * 24 * 60 * 60 * 1000) ||
      (dateFilter === "last6months" && new Date() - applicant.applied_at <= 180 * 24 * 60 * 60 * 1000) ||
      (dateFilter === "lastyear" && new Date() - applicant.applied_at <= 365 * 24 * 60 * 60 * 1000);
    const matchesGrade = gradeFilter === "all" || applicant.grade === gradeFilter;
    const matchesSearch = applicant.name.toLowerCase().includes(searchFilter.toLowerCase());

    return matchesPosition && matchesDate && matchesGrade && matchesSearch;
  });

  return (
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <Head>
        <title>Job Applicants | EloStack</title>
      </Head>

      <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8">
        <NavBar />

        {/* Applicants List */}
        <section className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Filter Applicants</h3>
          <div className="grid grid-cols-4 gap-4">
            {/* Search by name */}
            <input
              type="text"
              placeholder="Search by name"
              onChange={(e) => setSearchFilter(e.target.value)}
              className="p-2 border rounded"
            />
            {/* Filter by position */}
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="all">All Positions</option>
              <option value="intern">Intern</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
            </select>
            {/* Filter by date */}
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="p-2 border rounded">
              <option value="all">All Dates</option>
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="last6months">Last 6 months</option>
              <option value="lastyear">Last year</option>
            </select>
            {/* Filter by grade */}
            <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)} className="p-2 border rounded">
              <option value="all">All Grades</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>
        </section>
        {/* Applicants */}
        <section data-aos="fade-right" className="bg-center p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center -mt-[2rem] ">
            <h2 className="text-3xl font-bold text-white">Applicants</h2>
          </div>

          <div className="grid grid-cols-3 gap-4 space-y-6">
            {filteredApplicants &&
              filteredApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="bg-gray-50 p-6 rounded-lg flex items-center hover:shadow-xl transition-shadow duration-300"
                >
                  <Avatar
                    src={applicant.profile_picture_url}
                    name={applicant.name}
                    size="100"
                    round={true}
                    className="mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{applicant.name}</h3>
                    <p className="text-sm text-gray-600">{formatDate(applicant.applied_at)}</p>
                    <p className="text-sm text-gray-600">Position: {applicant.position}</p>
                    <p className="text-sm text-gray-600">Grade: {applicant.grade}</p>
                    <Link href={`/applicant/${applicant.id}`} className="text-blue-600 hover:underline">
                      View Details
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

export default JobApplicants;
