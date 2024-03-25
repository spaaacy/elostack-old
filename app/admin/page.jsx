"use client";

import Loader from "@/components/common/Loader";
import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import MarkdownInput from "@/components/admin/MarkdownInput";
import Footer from "@/components/common/Footer";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
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

  const onSubmit = async (data) => {
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

  const feedback = watch("feedback", "");

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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="flex items-center gap-2">
                <div>
                  <label className="block font-semibold">Payment Intent ID</label>
                  <input
                    type="text"
                    {...register("payment_intent_id", { required: true })}
                    className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white"
                  />
                  {errors.payment_intent_id && <p>This field is required</p>}
                </div>
                <div className="flex-1">
                  <label className="block font-semibold">Individual ID</label>
                  <input
                    type="text"
                    {...register("individual_id", { required: true })}
                    className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white w-full"
                  />
                  {errors.individual_id && <p>This field is required</p>}
                </div>
                <div>
                  <label className="block font-semibold">Grade</label>
                  <input
                    type="text"
                    {...register("grade", { required: true })}
                    className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white"
                  />
                  {errors.grade && <p>This field is required</p>}
                </div>
              </div>
              <div>
                <label className="block font-semibold">Feedback</label>
                <textarea
                  rows={10}
                  {...register("feedback", { required: true })}
                  className="w-full mt-1 p-2 border rounded bg-[#0f0f1c] text-white"
                />
                {errors.feedback && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block font-semibold">Preview</label>
                <MarkdownInput text={feedback} />
              </div>
              <div>
                <label className="block font-semibold">YouTube Video ID</label>
                <input
                  type="text"
                  {...register("youtube_id", { required: true })}
                  className="mt-1 p-2 border rounded bg-[#0f0f1c] text-white w-full"
                />
                {errors.youtube_id && <p className="text-red-500">This field is required</p>}
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
        </main>
        <Footer />
      </main>
    </>
  );
};

export default Page;
