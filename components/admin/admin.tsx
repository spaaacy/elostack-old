"use client";

import { useForm } from "react-hook-form";
import Head from "next/head";
import { useEffect, useState } from "react";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const AdminDashboard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [interviewRequests, setInterviewRequests] = useState();
  const [uploadInterview, setUploadInterview] = useState();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const response = await fetch("/api/interview-request/", {
      method: "GET",
    });
    if (response.status === 200) {
      const results = await response.json();
      setInterviewRequests(results.requests);
    } else {
      console.error("Error fetching interview requests!");
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    setUploadInterview(data);
    const response = await fetch("/api/interview/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  return (
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom">
      <Head>
        <title>Admin Dashboard | EloStack</title>
      </Head>

      <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8">
        <section className="p-5 text-center border-b border-gray-200">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        </section>

        <section className="bg-center p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blueprimary">Interview Requests</h2>
          <table className="w-full table-auto text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">Creation Date</th>
                <th className="px-4 py-2">Candidate Name</th>
                <th className="px-4 py-2">Position</th>
                <th className="px-4 py-2">Technical Length</th>
                <th className="px-4 py-2">Behavioral Length</th>
              </tr>
            </thead>
            <tbody>
              {interviewRequests &&
                interviewRequests.map((request) => (
                  <>
                    <tr key={request.id}>
                      <td className="border px-4 py-2">{request.created_at}</td>
                      <td className="border px-4 py-2">{request.individual_name}</td>
                      <td className="border px-4 py-2">{capitalizeFirstLetter(request.position)}</td>
                      <td className="border px-4 py-2">{request.technical_length}</td>
                      <td className="border px-4 py-2">{request.behavioral_length}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-extrabold">Description</td>
                      <td colspan="4" className="border px-4 py-2">
                        {request.description}
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </section>

        <section className="bg-center p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blueprimary">Upload New Interview</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div>
              <label className="block">Individual ID</label>
              <input
                type="text"
                {...register("individual_id", { required: true })}
                className="mt-1 p-2 border rounded"
              />
              {errors.individual_id && <p>This field is required</p>}
            </div>
            <div>
              <label className="block">Grade</label>
              <input type="text" {...register("grade", { required: true })} className="mt-1 p-2 border rounded" />
              {errors.grade && <p>This field is required</p>}
            </div>
            <div>
              <label className="block">Feedback</label>
              <textarea {...register("feedback", { required: true })} className="mt-1 p-2 border rounded" />
              {errors.feedback && <p>This field is required</p>}
            </div>
            <div>
              <label className="block">Video</label>
              <input type="file" {...register("video_url", { required: true })} className="mt-1 p-2 border rounded" />
              {errors.video_url && <p>This field is required</p>}
            </div>

            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Upload
            </button>
          </form>
        </section>
      </main>
    </main>
  );
};

export default AdminDashboard;
