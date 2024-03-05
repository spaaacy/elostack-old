"use client";

import NavBar from "@/components/common/NavBar";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";

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
    <>
      <NavBar />
      <div>
        <>
          <Head>
            <title>Create Job Listing</title>
          </Head>
          <main className="flex flex-col flex-1 bg-white min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
            <section className="container w-3/5 mx-auto p-4 bg-white rounded-lg shadow-2xl mt-8">
              <div className="p-5 text-center border-b border-blue-200">
                <h2 className="text-2xl font-bold mb-8 text-blueprimary">Create New Job Listing</h2>
                <form className="mt-8 gap-x-8 gap-y-3" onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="title" className="block   font-semibold mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
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
                      value={formData.location}
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
                      value={formData.remote}
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
                      value={formData.position}
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
                        value={formData.starting_pay}
                        id="starting_pay"
                        name="starting_pay"
                        className="p-2 form-input mt-1 block w-full rounded-md border border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out pl-4"
                        placeholder="Minimum Pay"
                      />
                      <p>{"-"}</p>
                      <p>{"$"}</p>
                      <input
                        onChange={handleChange}
                        type="number"
                        value={formData.ending_pay}
                        id="ending_pay"
                        name="ending_pay"
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
                      value={formData.deadline}
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
                      value={formData.description}
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
      </div>
    </>
  );
};

export default Page;
