"use client";

import Loader from "@/components/common/Loader";
import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Footer from "@/components/common/Footer";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const {
    register: registerInterview,
    handleSubmit: handleSubmitInterview,
    formState: { errors: errorsInterview },
    watch: watchInterview,
  } = useForm();
  const {
    register: registerListing,
    handleSubmit: handleSubmitListing,
    formState: { errors: errorsListing },
    watch: watchListing,
  } = useForm();
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState();

  const fetchPurchases = async () => {
    const response = await fetch("/api/purchase", {
      method: "GET",
      headers: {
        "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
      },
    });
    if (response.status === 200) {
      const results = await response.json();
      setPurchases(results.purchases);
      console.log(results);
    } else {
      console.error("Error fetching interview purchases!");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const success = await verifyLogin("admin");
      if (success) {
        await setLoading(false);
        fetchPurchases();
      }
    };

    if (session) {
      loadData();
    }
  }, [session]);

  const onSubmitInterview = async (data) => {
    if (!session) return;
    const response = await fetch("/api/interview/create", {
      method: "POST",
      headers: {
        "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
      },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      window.location.reload();
      console.log("Interview created successfully!");
    }
  };

  const onSubmitListing = async (data) => {
    if (!session) return;
    console.log(data);
    let response = await fetch("/api/job-listing/create-custom", {
      method: "POST",
      headers: {
        "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
      },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      window.location.reload();
    }
  };

  const feedback = watchInterview("feedback", "");

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
      <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
        <Head>
          <title>Admin Dashboard | EloStack</title>
        </Head>

        <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8">
          <section className="p-5 text-center border-b border-gray-700">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          </section>

          <section className="p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white">Pending Interview Purchases</h2>
            <table className="w-full table-auto text-sm mt-4">
              <thead>
                <tr className="bg-[#0f0f1c]">
                  <th className="px-4 py-2">Payment Intent ID</th>
                  <th className="px-4 py-2">Individual ID</th>
                  <th className="px-4 py-2">Candidate Name</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchases &&
                  purchases.map((request) => (
                    <>
                      <tr key={request.id}>
                        <td className="border px-4 py-2">{request.payment_intent_id}</td>
                        <td className="border px-4 py-2">{request.individual.user_id}</td>
                        <td className="border px-4 py-2">
                          {`${request.individual.first_name} ${request.individual.last_name}`}
                        </td>
                        <td className="border px-4 py-2 capitalize">{request.status}</td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </section>

          <section className="bg-center p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white">Upload New Interview</h2>
            <form onSubmit={handleSubmitInterview(onSubmitInterview)} className="space-y-4 mt-4">
              <div className="flex items-center gap-2">
                <div>
                  <label className="block font-semibold">Payment Intent ID</label>
                  <input
                    type="text"
                    {...registerInterview("payment_intent_id", { required: true })}
                    className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white"
                  />
                  {errorsInterview.payment_intent_id && <p className="text-red-500">This field is required</p>}
                </div>
                <div className="flex-1">
                  <label className="block font-semibold">Individual ID</label>
                  <input
                    type="text"
                    {...registerInterview("individual_id", { required: true })}
                    className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white w-full"
                  />
                  {errorsInterview.individual_id && <p className="text-red-500">This field is required</p>}
                </div>
                <div>
                  <label className="block font-semibold">Grade</label>
                  <input
                    type="text"
                    {...registerInterview("grade", { required: true })}
                    className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white"
                  />
                  {errorsInterview.grade && <p className="text-red-500">This field is required</p>}
                </div>
              </div>
              <div>
                <label className="block font-semibold">Feedback</label>
                <textarea
                  rows={20}
                  {...registerInterview("feedback", { required: true })}
                  className="w-full mt-1 p-2 border rounded bg-[#0f0f1c] text-white"
                />
                {errorsInterview.feedback && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block font-semibold">Preview</label>
                <Markdown
                  components={{
                    a(props) {
                      const { node, ...rest } = props;
                      return <a className="text-blue-600 dark:text-blue-500 hover:underline" {...rest} />;
                    },
                  }}
                  className="markdown"
                  remarkPlugins={[remarkGfm]}
                >
                  {feedback}
                </Markdown>
              </div>
              <div>
                <label className="block font-semibold">YouTube Video ID</label>
                <input
                  type="text"
                  {...registerInterview("youtube_id", { required: true })}
                  className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white w-full"
                />
                {errorsInterview.youtube_id && <p className="text-red-500">This field is required</p>}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-purpleprimary text-white rounded hover:bg-purple-700 transition duration-150 ease-in-out"
                >
                  Upload
                </button>
              </div>
            </form>
          </section>

          <section className="bg-center p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white">Create New Listing</h2>
            <form onSubmit={handleSubmitListing(onSubmitListing)} className="space-y-4 mt-4">
              <label className="block font-semibold">Business Name</label>
              <input
                type="text"
                {...registerListing("business.name", { required: true })}
                className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white w-full"
              />
              {errorsListing.business && <p className="text-red-500">This field is required</p>}
              <label className="block font-semibold">Title</label>
              <input
                type="text"
                {...registerListing("title", { required: true })}
                className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white w-full"
              />
              {errorsListing.title && <p className="text-red-500">This field is required</p>}
              <label className="block font-semibold">Description</label>
              <textarea
                type="text"
                rows={10}
                {...registerListing("description", { required: true })}
                className="resize-none mt-1 p-2 border rounded bg-[#0f0f1c] text-white w-full"
              />
              {errorsListing.description && <p className="text-red-500">This field is required</p>}

              <div className="flex gap-4 items-center justify-start w-full">
                <div>
                  <label className="block font-semibold">Position</label>
                  <select
                    {...registerListing("position", { required: true })}
                    className="px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Please select">Please select</option>
                    <option value="intern">Intern</option>
                    <option value="junior">Junior</option>
                    <option value="other">Other</option>
                  </select>
                  {errorsListing.position && <p className="text-red-500">This field is required</p>}
                </div>
                <div>
                  <label className="block font-semibold">Location</label>
                  <input
                    type="text"
                    {...registerListing("location", { required: true })}
                    className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white"
                  />
                  {errorsListing.location && <p className="text-red-500">This field is required</p>}
                </div>
                <div>
                  <label className="block font-semibold">Remote</label>
                  <select
                    {...registerListing("remote", { required: true })}
                    className="px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={"false"}>Please select</option>
                    <option value={"false"}>No</option>
                    <option value={"true"}>Yes</option>
                  </select>
                  {errorsListing.remote && <p className="text-red-500">This field is required</p>}
                </div>
                <div>
                  <label className="block font-semibold">Starting Pay</label>
                  <input
                    type="number"
                    {...registerListing("starting_pay", { required: false })}
                    className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Ending Pay</label>
                  <input
                    type="number"
                    {...registerListing("ending_pay", { required: false })}
                    className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold">Deadline</label>
                  <input
                    type="date"
                    {...registerListing("deadline", { required: false })}
                    className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-purpleprimary text-white rounded hover:bg-purple-700 transition duration-150 ease-in-out self-center ml-auto"
                >
                  Create
                </button>
              </div>
            </form>
          </section>
        </main>
        <Footer />
      </main>
    </>
  );
};

export default Page;
