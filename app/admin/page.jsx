"use client";

import Loader from "@/components/common/Loader";
import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import formatDate from "@/utils/formatDate";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [requests, setRequests] = useState();

  useEffect(() => {
    const loadData = async () => {
      const success = await verifyLogin("admin");
      if (success) {
        await setLoading(false);
        fetchRequests();
      }
    };

    if (session) {
      loadData();
    }
  }, [session]);

  const fetchRequests = async () => {
    const response = await fetch("/api/purchase", {
      method: "GET",
    });
    if (response.status === 200) {
      const results = await response.json();
      setRequests(results.requests);
      console.log(results);
    } else {
      console.error("Error fetching interview requests!");
    }
  };

  const onSubmit = async (data) => {
    const response = await fetch("/api/interview/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      window.location.reload();
      console.log("Interview created successfully!");
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
        <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom">
          <Head>
            <title>Admin Dashboard | EloStack</title>
          </Head>

          <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8">
            <section className="p-5 text-center border-b border-gray-200">
              <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            </section>

            <section className="bg-center p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-blueprimary">Pending Interview Requests</h2>
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Purchase ID</th>
                    <th className="px-4 py-2">Creation Date</th>
                    <th className="px-4 py-2">Individual ID</th>
                    <th className="px-4 py-2">Candidate Name</th>
                  </tr>
                </thead>
                <tbody>
                  {requests &&
                    requests.map((request) => (
                      <>
                        <tr key={request.id}>
                          <td className="border px-4 py-2">{request.id}</td>
                          <td className="border px-4 py-2">{formatDate(request.created_at)}</td>
                          <td className="border px-4 py-2">{request.individual.user_id}</td>
                          <td className="border px-4 py-2">
                            {`${request.individual.first_name} ${request.individual.last_name}`}
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </section>

            <section className="bg-center p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-blueprimary">Upload New Interview</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="flex items-center gap-2">
                  <div>
                    <label className="block font-semibold">Purchase ID</label>
                    <input
                      type="number"
                      {...register("purchase_id", { required: true })}
                      className="mt-1 p-2 border rounded"
                    />
                    {errors.purchase_id && <p>This field is required</p>}
                  </div>
                  <div className="flex-1">
                    <label className="block font-semibold">Individual ID</label>
                    <input
                      type="text"
                      {...register("individual_id", { required: true })}
                      className="mt-1 p-2 border rounded w-full"
                    />
                    {errors.individual_id && <p>This field is required</p>}
                  </div>
                  <div>
                    <label className="block font-semibold">Grade</label>
                    <input type="text" {...register("grade", { required: true })} className="mt-1 p-2 border rounded" />
                    {errors.grade && <p>This field is required</p>}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold">Feedback</label>
                  <textarea
                    rows={10}
                    {...register("feedback", { required: true })}
                    className="w-full mt-1 p-2 border rounded"
                  />
                  {errors.feedback && <p>This field is required</p>}
                </div>
                <div>
                  <label className="block font-semibold">Video URL</label>
                  <input
                    type="text"
                    {...register("video_url", { required: true })}
                    className="w-full mt-1 p-2 border rounded"
                  />
                  {errors.video_url && <p>This field is required</p>}
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Upload
                  </button>
                </div>
              </form>
            </section>
          </main>
        </main>
      </div>
    </>
  );
};

export default Page;
