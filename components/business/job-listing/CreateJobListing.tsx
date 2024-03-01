"use client";

import React, { useContext, useState } from "react";
import Head from "next/head";
import { UserContext } from "@/context/UserContext";

const CreateJobListing = () => {
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    remote: "false",
    position: "intern",
    description: "",
    startingPay: 0,
    endingPay: 0,
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    console.log(newFormData);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      const response = await fetch("/api/job-listing/create", {
        method: "POST",
        body: JSON.stringify({
          business_id: user.user_id,
          title: formData.title,
          description: formData.description,
          starting_pay: formData.startingPay,
          ending_pay: formData.endingPay,
          position: formData.position,
          remote: formData.remote,
          location: formData.location,
          deadline: formData.deadline,
        }),
      });
      if (response.status === 201) {
        window.location.reload();
        console.log("Job listed successfully");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Create Job Listing | YourCompany</title>
      </Head>
      <main className="flex flex-col flex-1 bg-white min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
        <section className="container w-3/5 mx-auto p-4 bg-white rounded-lg shadow-2xl mt-8">
          <div className="p-5 text-center border-b border-blue-200">
            <h2 className="text-2xl font-bold mb-8 text-blueprimary">Create a New Job Listing</h2>
            <form className="mt-8 gap-x-8 gap-y-3" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="title" className="block   font-semibold mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleChange}
                  className="form-input mt-1 block py-2 w-full rounded-md border border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                  placeholder="Enter job title"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block   font-semibold mb-2">
                  Job Location
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="location"
                  name="location"
                  className="py-2 form-input mt-1 block w-full rounded-md border border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                  placeholder="Enter job location"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="remote" className="block   font-semibold mb-2">
                  Remote Option
                </label>
                <select
                  defaultValue="false"
                  id="remote"
                  name="remote"
                  onChange={handleChange}
                  className="py-2 form-select mt-1 block w-full rounded-md border border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                >
                  <option value={"true"}>Yes</option>
                  <option value={"false"}>No</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="position" className="block   font-semibold mb-2">
                  Position
                </label>
                <select
                  defaultValue="intern"
                  id="position"
                  name="position"
                  onChange={handleChange}
                  className="py-2 form-select mt-1 block w-full rounded-md border border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                >
                  <option value={"intern"}>Intern</option>
                  <option value={"junior"}>Junior</option>
                </select>
              </div>

              {/* Salary Range, Benefits and Perks */}

              <div className="mb-4 flex flex-col gap-4">
                <label className="block   font-semibold mb-2">Salary Range</label>
                <div className="flex items-center gap-4">
                  <p>$ </p>
                  <input
                    type="number"
                    onChange={handleChange}
                    id="startingPay"
                    name="startingPay"
                    className="p-2 form-input mt-1 block w-full rounded-md border border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                    placeholder="Minimum Pay"
                  />
                  <p>{"-"}</p>
                  <p>{"$"}</p>
                  <input
                    onChange={handleChange}
                    type="number"
                    id="endingPay"
                    name="endingPay"
                    className=" p-2 form-input mt-1 block w-full rounded-md border border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                    placeholder="Maximum Pay"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="deadline" className="block   font-semibold mb-2">
                  Application Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  onChange={handleChange}
                  className="py-2 form-input pr-6 mt-1 block w-full rounded-md border border-gray-300 shadow-md focus:border-gray-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                />
              </div>

              {/* Job Description */}
              <div className="mb-6 col-span-2">
                <label htmlFor="description" className="block   font-semibold mb-2">
                  Job Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  onChange={handleChange}
                  className="py-2 form-textarea mt-1 block w-full rounded-md border border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                  rows="10"
                  placeholder={`Detailed description of the role:\n\t-\tQualifications\n\t-\tExperience\n\t-\tBenefits\n\t-\tPerks`}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end w-full">
                <button
                  type="submit"
                  className="inline-block bg-blueprimary text-white px-6 py-3 mb-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                >
                  Create Job Listing
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default CreateJobListing;
