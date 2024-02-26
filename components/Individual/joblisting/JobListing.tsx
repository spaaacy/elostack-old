"use client";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  pay: {
    min: number;
    max: number;
  };
  position: string;
  description: string;
}

const initialJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Remote",
    pay: { min: 80000, max: 100000 },
    position: "Intern",
    description: "We are looking for a skilled Frontend Developer...",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Tech Solutions",
    location: "San Francisco, CA",
    pay: { min: 10000, max: 600000 },
    position: "Junior",
    description: "We are looking for a skilled Frontend Developer...",
  },
  {
    id: 3,
    title: "Frontedn Developer",
    company: "Tech Solutions",
    location: "New York, NY",
    pay: { min: 40000, max: 80000 },
    position: "Mid Level",
    description: "We are looking for a skilled Frontend Developer...",
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "Tech Solutions",
    location: "Remote",
    pay: { min: 80000, max: 100000 },
    position: "Senior",
    description: "We are looking for a skilled Frontend Developer...",
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Remote",
    pay: { min: 80000, max: 100000 },
    position: "Mid Level",
    description: "We are looking for a skilled Frontend Developer...",
  },
  {
    id: 6,
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Remote",
    pay: { min: 80000, max: 100000 },
    position: "Mid Level",
    description: "We are looking for a skilled Frontend Developer...",
  },
  // Add more detailed job listings
];

const JobListings: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [filters, setFilters] = useState({
    title: "",
    position: "",
    payMin: "",
    payMax: "",
    location: "",
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    filterName: keyof typeof filters
  ) => {
    setFilters({ ...filters, [filterName]: e.target.value });
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (filters.title ? job.title.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
      (filters.position ? job.position === filters.position : true) &&
      (!filters.payMin || job.pay.min >= Number(filters.payMin)) &&
      (!filters.payMax || job.pay.max <= Number(filters.payMax)) &&
      (filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true)
  );

  return (
    <>
      <Head>
        <title>Job Listings | Your Company</title>
      </Head>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6" style={{ color: "#2B6CB0" }}>
          Job Listings
        </h1>
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          {/* Role Filter Dropdown */}
          <select
            value={filters.title}
            onChange={(e) => handleFilterChange(e, "title")}
            className="p-4 border rounded-lg"
          >
            <option value="">Filter by Role...</option>
            {/* Update with more specific roles */}
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Data Scientist">Data Scientist</option>
            {/* More roles */}
          </select>

          {/* Position Filter */}
          <select
            value={filters.position}
            onChange={(e) => handleFilterChange(e, "position")}
            className="p-4 border rounded-lg"
          >
            <option value="">Position Level</option>
            <option value="Intern">Intern</option>
            <option value="Junior">Junior</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior">Senior</option>
          </select>

          {/* Pay Min Input */}
          <input
            type="number"
            placeholder="Min Pay"
            value={filters.payMin}
            onChange={(e) => handleFilterChange(e, "payMin")}
            className="p-4 border rounded-lg"
          />

          {/* Pay Max Input */}
          <input
            type="number"
            placeholder="Max Pay"
            value={filters.payMax}
            onChange={(e) => handleFilterChange(e, "payMax")}
            className="p-4 border rounded-lg"
          />

          {/* Location Filter */}
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange(e, "location")}
            className="p-4 border rounded-lg"
          >
            <option value="">Location</option>
            <option value="Remote">Remote</option>
            <option value="New York, NY">New York, NY</option>
            <option value="San Francisco, CA">San Francisco, CA</option>
            {/* Additional locations */}
          </select>
        </div>
        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg border border-gray-300 shadow p-4 hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <h2 className="text-xl font-semibold mb-2" style={{ color: "#2B6CB0" }}>
                {job.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{`${job.company} - ${job.position} - ${job.location}`}</p>
              <p className="mb-4">
                Pay Range: ${job.pay.min.toLocaleString()} - ${job.pay.max.toLocaleString()}
              </p>
              <p className="text-sm mb-4">{job.description}</p>
              <div className="flex justify-end space-x-2">
                <button className="text-blueprimary hover:underline mr-4">Bookmark</button>
                {/* TODO: Add actual id later */}
                <Link href={`listings/${1}`} className="bg-blueprimary text-white px-4 py-2 rounded hover:bg-blue-600">
                  Apply
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobListings;
