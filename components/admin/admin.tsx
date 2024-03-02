"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";

type InterviewRequest = {
  id: string;
  candidateName: string;
  date: string;
};

type InterviewUpload = {
  video: File;
  scoreSheet: File;
  candidateId: string;
};

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [interviewRequests, setInterviewRequests] = useState<
    InterviewRequest[]
  >([
    { id: "1", candidateName: "John Doe", date: "2022-01-01" },
    { id: "2", candidateName: "Jane Doe", date: "2022-01-02" },
  ]);
  const [uploadData, setUploadData] = useState<InterviewUpload | null>(null);

  const onSubmit = (data: InterviewUpload) => {
    setUploadData(data);
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
          <h2 className="text-3xl font-bold text-blueprimary">
            Interview Requests
          </h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Candidate Name</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {interviewRequests.map((request) => (
                <tr key={request.id}>
                  <td className="border px-4 py-2">{request.id}</td>
                  <td className="border px-4 py-2">{request.candidateName}</td>
                  <td className="border px-4 py-2">{request.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="bg-center p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blueprimary">
            Upload New Interview
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block">Candidate ID</label>
              <input
                type="text"
                {...register("candidateId", { required: true })}
                className="mt-1 p-2 border rounded"
              />
              {errors.candidateId && <p>This field is required</p>}
            </div>
            <div>
              <label className="block">Video</label>
              <input
                type="file"
                {...register("video", { required: true })}
                className="mt-1 p-2 border rounded"
              />
              {errors.video && <p>This field is required</p>}
            </div>
            <div>
              <label className="block">Score Sheet</label>
              <input
                type="file"
                {...register("scoreSheet", { required: true })}
                className="mt-1 p-2 border rounded"
              />
              {errors.scoreSheet && <p>This field is required</p>}
            </div>

            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Upload
            </button>
          </form>
        </section>
      </main>
    </main>
  );
};

export default AdminDashboard;
