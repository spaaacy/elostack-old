"use client";

import NavBar from "@/components/common/NavBar";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    remote: "false",
    position: "intern",
    description: "",
    starting_pay: 0,
    ending_pay: 0,
    deadline: "",
  });

  useEffect(() => {
    const loadData = async () => {
      const success = await verifyLogin("business");
      if (success) {
        await setLoading(false);
      }
    };

    if (session) {
      loadData();
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const newListing = {
        business_id: userId,
        title: formData.title,
        description: formData.description,
        starting_pay: formData.starting_pay,
        ending_pay: formData.ending_pay,
        position: formData.position,
        remote: formData.remote,
        location: formData.location,
        deadline: formData.deadline,
      };
      const response = await fetch("/api/job-listing/edit", {
        method: "POST",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
        body: JSON.stringify(newListing),
      });
      if (response.status === 201) {
        router.push("/dashboard");
        console.log("Job listed successfully");
      }
    }
  };

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
        <title>Create Job Listing | EloStack</title>
      </Head>

      <NavBar />

      <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8 w-3/5">
        <section className="p-5 border-b border-gray-700">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Create New Job Listing</h2>
          </div>
        </section>

        <section className="p-8 rounded-lg shadow-lg">
          <form className="mt-8 gap-x-8 gap-y-3" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block font-semibold mb-2 text-gray-400">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                id="title"
                onChange={handleChange}
                className="form-input mt-1 block py-2 w-full rounded-md border border-gray-700 bg-[#0f0f1c] shadow-md focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4 text-white"
                placeholder="Enter job title"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block font-semibold mb-2 text-gray-400">
                Job Location
              </label>
              <input
                onChange={handleChange}
                value={formData.location}
                type="text"
                id="location"
                name="location"
                className="py-2 form-input mt-1 block w-full rounded-md border border-gray-700 bg-[#0f0f1c] shadow-md focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4 text-white"
                placeholder="Enter job location"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="remote" className="block font-semibold mb-2 text-gray-400">
                Remote Option
              </label>
              <select
                defaultValue="false"
                value={formData.remote}
                id="remote"
                name="remote"
                onChange={handleChange}
                className="py-2 form-select mt-1 block w-full rounded-md border border-gray-700 bg-[#0f0f1c] shadow-md focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4 text-white"
              >
                <option value={"true"}>Yes</option>
                <option value={"false"}>No</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="position" className="block font-semibold mb-2 text-gray-400">
                Position
              </label>
              <select
                value={formData.position}
                defaultValue="intern"
                id="position"
                name="position"
                onChange={handleChange}
                className="py-2 form-select mt-1 block w-full rounded-md border border-gray-700 bg-[#0f0f1c] shadow-md focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4 text-white"
              >
                <option value={"intern"}>Intern</option>
                <option value={"junior"}>Junior</option>
              </select>
            </div>

            {/* Salary Range, Benefits and Perks */}

            <div className="mb-4 flex flex-col gap-4">
              <label className="block font-semibold mb-2 text-gray-400">Salary Range</label>
              <div className="flex items-center gap-4">
                <p className="text-gray-400">$</p>
                <input
                  type="number"
                  onChange={handleChange}
                  value={formData.starting_pay}
                  id="starting_pay"
                  name="starting_pay"
                  className="p-2 form-input mt-1 block w-full rounded-md border border-gray-700 bg-[#0f0f1c] shadow-md focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4 text-white"
                  placeholder="Minimum Pay"
                />
                <p className="text-gray-400">{"-"}</p>
                <p className="text-gray-400">{"$"}</p>
                <input
                  onChange={handleChange}
                  type="number"
                  value={formData.ending_pay}
                  id="ending_pay"
                  name="ending_pay"
                  className="p-2 form-input mt-1 block w-full rounded-md border border-gray-700 bg-[#0f0f1c] shadow-md focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4 text-white"
                  placeholder="Maximum Pay"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="deadline" className="block font-semibold mb-2 text-gray-400">
                Application Deadline
              </label>
              <input
                value={formData.deadline}
                type="date"
                id="deadline"
                name="deadline"
                onChange={handleChange}
                className="py-2 form-input pr-6 mt-1 block w-full rounded-md border border-gray-700 bg-[#0f0f1c] shadow-md focus:border-gray-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4 text-white"
                style={{ colorScheme: "dark" }}
              />
            </div>

            {/* Job Description */}
            <div className="mb-6 col-span-2">
              <label htmlFor="description" className="block font-semibold mb-2 text-gray-400">
                Job Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                name="description"
                onChange={handleChange}
                className="py-2 form-textarea mt-1 block w-full rounded-md border border-gray-700 bg-[#0f0f1c] shadow-md focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4 text-white"
                rows="10"
                placeholder={`Detailed description of the role:\n\t-\tQualifications\n\t-\tExperience\n\t-\tBenefits\n\t-\tPerks`}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end w-full">
              <button
                type="submit"
                className="inline-block bg-purpleprimary text-white px-6 py-3 mb-4 rounded hover:bg-purple-700 transition duration-150 ease-in-out"
              >
                Create Job Listing
              </button>
            </div>
          </form>
        </section>
      </main>
    </main>
  );
};

export default Page;
