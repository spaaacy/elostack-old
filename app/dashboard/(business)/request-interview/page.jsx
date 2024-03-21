"use client";

import NavBar from "@/components/common/NavBar";
import Loader from "@/components/common/Loader";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [formData, setFormData] = useState({});

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = {
      ...formData,
      business_id: session.data.session.user.id,
    };
    const response = await fetch("/api/interview-request/create", {
      method: "POST",
      body: JSON.stringify(request),
    });
    if (response.status === 201) {
      router.push("/dashboard");
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
      <NavBar />
      <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8 w-3/5">
        <section className="p-5 border-b border-gray-700">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Request Interview</h2>
          </div>
        </section>
        <section className="p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              name="individual_name"
              placeholder="Candidate Name"
              value={formData.individual_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 rounded bg-[#0f0f1c] focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-150 ease-in-out text-white"
            />
            <input
              type="text"
              name="individual_email"
              placeholder="Candidate Email"
              value={formData.individual_email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 rounded bg-[#0f0f1c] focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-150 ease-in-out text-white"
            />
            <select
              defaultValue="intern"
              value={formData.position}
              name="position"
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 rounded bg-[#0f0f1c] focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-150 ease-in-out text-white"
            >
              <option value="">Select Position</option>
              <option value="intern">Intern</option>
              <option value="junior">Junior</option>
            </select>

            <select
              value={formData.type}
              name="type"
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 rounded bg-[#0f0f1c] focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-150 ease-in-out text-white"
            >
              <option value="">Select Interview Type</option>
              <option value="technical">Technical</option>
              <option value="behavioral">Behavioral</option>
            </select>

            <label className="font-semibold text-sm text-gray-400 -my-2">* Interview will be 1 hour long</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full p-2 border border-gray-700 rounded resize-none bg-[#0f0f1c] focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-150 ease-in-out text-white"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-block bg-purple-700 text-white px-6 py-3 mb-6 rounded hover:bg-purple-900 transition duration-150 ease-in-out"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
    </main>
  );
};

export default Page;