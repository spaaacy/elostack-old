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
        (filters.title
          ? job.title.toLowerCase().includes(filters.title.toLowerCase())
          : true) &&
        (filters.position ? job.position === filters.position : true) &&
        (filters.company
          ? job.business.name
              .toLowerCase()
              .includes(filters.company.toLowerCase())
          : true) &&
        (!filters.starting_pay ||
          job.starting_pay >= Number(filters.starting_pay)) &&
        (!filters.ending_pay || job.ending_pay <= Number(filters.ending_pay)) &&
        (filters.location
          ? job.location.toLowerCase().includes(filters.location.toLowerCase())
          : true)
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
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <Head>
        <title>Job Listings | Your Company</title>
      </Head>
      <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8">
        <section data-aos="fade-up">
          <div className="p-5 text-center">
            <h2 className="text-2xl font-bold text-blueprimary">
              Job Listings
            </h2>
          </div>
        </section>
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
        <div className="grid grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-50 p-6 rounded-lg flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {job.title} at {job.business.name}
                </h3>
                <p className="text-sm text-gray-600">{`${job.position} - ${job.location}`}</p>
                <p>
                  Pay Range: ${job.starting_pay} - ${job.ending_pay}
                </p>
                <p className="text-sm">{job.description}</p>
              </div>
              <Link href={`/job-listing/${job.id}`}>
                <button className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-150 ease-in-out mt-4">
                  Apply
                </button>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </main>
  );
};

export default JobListings;
