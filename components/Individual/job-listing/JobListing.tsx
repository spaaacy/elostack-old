"use client";
import Loader from "@/components/common/Loader";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const JobListings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [jobListings, setJobListings] = useState();
  const [filters, setFilters] = useState({
    title: "",
    company: "",
    position: "",
    starting_pay: "",
    ending_pay: "",
    location: "",
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const response = await fetch("/api/job-listing", {
      method: "GET",
    });
    const results = await response.json();
    setJobListings(results.data);
    setLoading(false);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    filterName: keyof typeof filters
  ) => {
    setFilters({ ...filters, [filterName]: e.target.value });
  };

  let filteredJobs = [];
  if (jobListings) {
    console.log(jobListings);
    filteredJobs = jobListings.filter(
      (job) =>
        (filters.title ? job.title.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
        (filters.position ? job.position === filters.position : true) &&
        (filters.company ? job.business.name.toLowerCase().includes(filters.company.toLowerCase()) : true) &&
        (!filters.starting_pay || job.starting_pay >= Number(filters.starting_pay)) &&
        (!filters.ending_pay || job.ending_pay <= Number(filters.ending_pay)) &&
        (filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true)
    );
  }

  if (loading) {
    return (
      <div className="flex m-auto">
        <Loader />
      </div>
    );
  }

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
          <input
            value={filters.title}
            onChange={(e) => handleFilterChange(e, "title")}
            className="p-4 border rounded-lg"
            placeholder="Job title"
            type="text"
          />

          {/* Role Filter Dropdown */}
          <input
            value={filters.company}
            onChange={(e) => handleFilterChange(e, "company")}
            className="p-4 border rounded-lg"
            placeholder="Company"
            type="text"
          />

          {/* Position Filter */}
          <select
            value={filters.position}
            onChange={(e) => handleFilterChange(e, "position")}
            className="p-4 border rounded-lg"
          >
            <option value="">Position Level</option>
            <option value="Intern">Intern</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>

          {/* Pay Min Input */}
          <input
            type="number"
            placeholder="Min Pay"
            value={filters.starting_pay}
            onChange={(e) => handleFilterChange(e, "starting_pay")}
            className="p-4 border rounded-lg"
          />

          {/* Pay Max Input */}
          <input
            type="number"
            placeholder="Max Pay"
            value={filters.ending_pay}
            onChange={(e) => handleFilterChange(e, "ending_pay")}
            className="p-4 border rounded-lg"
          />

          {/* Location Filter */}
          <input
            value={filters.location}
            onChange={(e) => handleFilterChange(e, "location")}
            className="p-4 border rounded-lg"
            placeholder="Location"
            type="text"
          />
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
              <p className="text-sm text-gray-500 mb-4">{`${job.business.name} - ${job.position} - ${job.location}`}</p>
              <p className="mb-4">
                Pay Range: ${job.starting_pay} - ${job.ending_pay}
              </p>
              <p className="text-sm mb-4">{job.description}</p>
              <div className="flex justify-end space-x-2">
                {/* <button className="text-blueprimary hover:underline mr-4">Bookmark</button> */}
                {/* TODO: Add actual id later */}
                <Link
                  href={`/job-listing/${job.id}`}
                  className="bg-blueprimary text-white px-4 py-2 rounded hover:bg-blue-600"
                >
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
