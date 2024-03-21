"use client";

import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import Loader from "@/components/common/Loader";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
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

  const handleFilterChange = (e, filterName) => {
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
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    } else {
      return description;
    }
  };
  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
      <NavBar />
      <Head>
        <title>Job Listings | Your Company</title>
      </Head>
      <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-16">
        <section className="p-5 border-b border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Job Listings</h2>
          </div>
        </section>
        <div className="flex flex-wrap gap-4 mb-6 items-center bg-[#1b1b29] text-black p-4 rounded-lg">
          {/* Role Filter Dropdown */}
              <input
                value={filters.title}
                onChange={(e) => handleFilterChange(e, "title")}
                className="ml-4 p-4 border rounded-lg bg-gray-600 text-white"
                placeholder="Job title"
                type="text"
              />

              {/* Role Filter Dropdown */}
              <input
                value={filters.company}
                onChange={(e) => handleFilterChange(e, "company")}
                className="p-4 border rounded-lg bg-gray-600 text-white"
                placeholder="Company"
                type="text"
              />

              {/* Position Filter */}
              <select
                value={filters.position}
                onChange={(e) => handleFilterChange(e, "position")}
                className="p-4 border rounded-lg bg-gray-600 text-white"
              >
                <option value="">Position Level</option>
                <option value="intern">Intern</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
              </select>

              {/* Pay Min Input */}
              <input
                type="number"
                placeholder="Min Pay"
                value={filters.starting_pay}
                onChange={(e) => handleFilterChange(e, "starting_pay")}
                className="p-4 border rounded-lg bg-gray-600 text-white"
              />

              {/* Pay Max Input */}
              <input
                type="number"
                placeholder="Max Pay"
                value={filters.ending_pay}
                onChange={(e) => handleFilterChange(e, "ending_pay")}
                className="p-4 border rounded-lg bg-gray-600 text-white"
              />

              {/* Location Filter */}
              <input
                value={filters.location}
                onChange={(e) => handleFilterChange(e, "location")}
                className=" p-4 border rounded-lg bg-gray-600 text-white"
                placeholder="Location"
                type="text"
              />
        </div>
        <section className="p-8 rounded-lg shadow-lg bg-[#1b1b29]">
  <div className="grid grid-cols-3 gap-4 mt-4">
    {filteredJobs.map((job) => (
      <Link
        href={`/job-listing/${job.id}`}
        key={job.id}
        className="bg-gray-600 p-6 rounded-lg flex flex-col justify-between items-start hover:shadow-lg transition-shadow duration-300"
      >
        <div>
          <h3 className="font-semibold text-lg text-white">
            {job.title} at {job.business.name}
          </h3>
          <p className="text-sm text-gray-400 capitalize">{`${job.position} - ${job.location}`}</p>
          <p className="my-3 text-white">
            Pay Range: ${job.starting_pay} - ${job.ending_pay}
          </p>
          <p className="text-sm text-gray-400">{truncateDescription(job.description, 220)}</p>
        </div>
        <div className="text-purple-400 font-bold hover:underline self-end">
          View Details
        </div>
      </Link>
    ))}
  </div>
</section>
      </main>
      <Footer />
    </main>
  );
};

export default Page;
