import React from "react";
import Head from "next/head";

const CreateJobListing = () => {
  return (
    <>
      <Head>
        <title>Create Job Listing | YourCompany</title>
      </Head>
      <main className="flex flex-col flex-1 bg-gray-100 min-h-screen animate-fadeIn bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
        <section
          data-aos="fade-up"
          className="container mx-auto p-4 bg-white rounded-lg shadow mt-8 animate-slideUp"
        >
          <div className="p-5 text-center border-b border-gray-200">
            <h2 className="text-2xl font-bold mb-8">
              Create a New Job Listing
            </h2>
            <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Company Name and Job Title */}
              <div className="mb-6">
                <label
                  htmlFor="company-name"
                  className="block text-gray-600 text-sm font-semibold mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company-name"
                  className="form-input mt-1 block w-full rounded-md border border-gray-200 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                  placeholder="Enter company name"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="job-title"
                  className="block text-gray-600 text-sm font-semibold mb-2"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="job-title"
                  className="form-input mt-1 block w-full rounded-md border border-gray-200 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                  placeholder="Enter job title"
                />
              </div>

              {/* Company Overview */}
              <div className="mb-6 col-span-2">
                <label
                  htmlFor="company-overview"
                  className="block text-gray-600 text-sm font-semibold mb-2"
                >
                  Company Overview
                </label>
                <textarea
                  id="company-overview"
                  className="form-textarea mt-1 block w-full rounded-md border border-gray-200 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                  rows="3"
                  placeholder="Brief description of the company"
                ></textarea>
              </div>

              {/* Job Description */}
              <div className="mb-6 col-span-2">
                <label
                  htmlFor="job-description"
                  className="block text-gray-600 text-sm font-semibold mb-2"
                >
                  Job Description
                </label>
                <textarea
                  id="job-description"
                  className="form-textarea mt-1 block w-full rounded-md border border-gray-200 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                  rows="5"
                  placeholder="Detailed description of the role"
                ></textarea>
              </div>

              {/* Required Qualifications */}
              <div className="mb-6 col-span-2">
                <label
                  htmlFor="required-qualifications"
                  className="block text-gray-600 text-sm font-semibold mb-2"
                >
                  Required Qualifications
                </label>
                <textarea
                  id="required-qualifications"
                  className="form-textarea mt-1 block w-full rounded-md border border-gray-200 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                  rows="3"
                  placeholder="List the necessary qualifications"
                ></textarea>
              </div>

              <div className="mb-4 col-span-2">
                <label
                  htmlFor="preferred-qualifications"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Preferred Qualifications
                </label>
                <textarea
                  id="preferred-qualifications"
                  className="form-textarea mt-1 block w-full"
                  rows="3"
                  placeholder="List any beneficial skills or experiences"
                ></textarea>
              </div>

              {/* Location, Remote Option, Job Type */}
              <div className="mb-4">
                <label
                  htmlFor="job-location"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Job Location
                </label>
                <input
                  type="text"
                  id="job-location"
                  className="form-input mt-1 block w-full"
                  placeholder="Enter job location"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="remote-option"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Remote Option
                </label>
                <select
                  id="remote-option"
                  className="form-select mt-1 block w-full"
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="job-type"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Type of Employment
                </label>
                <select id="job-type" className="form-select mt-1 block w-full">
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                  <option>Temporary</option>
                  <option>Internship</option>
                </select>
              </div>

              {/* Salary Range, Benefits and Perks */}
              <div className="mb-4">
                <label
                  htmlFor="salary-range"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Salary Range
                </label>
                <input
                  type="text"
                  id="salary-range"
                  className="form-input mt-1 block w-full"
                  placeholder="Enter salary range"
                />
              </div>
              <div className="mb-4 col-span-2">
                <label
                  htmlFor="benefits-perks"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Benefits and Perks
                </label>
                <textarea
                  id="benefits-perks"
                  className="form-textarea mt-1 block w-full"
                  rows="3"
                  placeholder="Detail the benefits provided"
                ></textarea>
              </div>

              {/* Application Process, Deadline, Equal Opportunity Employer Statement */}

              <div className="mb-4">
                <label
                  htmlFor="application-deadline"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Application Deadline
                </label>
                <input
                  type="date"
                  id="application-deadline"
                  className="form-input mt-1 block w-full"
                />
              </div>
              <div className="mb-4 col-span-2">
                <label
                  htmlFor="eo-statement"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Equal Opportunity Employer Statement
                </label>
                <textarea
                  id="eo-statement"
                  className="form-textarea mt-1 block w-full"
                  rows="3"
                  placeholder="Include a statement to demonstrate commitment to diversity and inclusion"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center mt-8">
                <button
                  type="submit"
                  className="inline-block bg-blue-600 text-white px-6 py-3 mb-6 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
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
