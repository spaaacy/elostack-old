"use client";

import Loader from "@/components/common/Loader";
import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

const Page = () => {
  const { id } = useParams();
  const { session, verifyLogin } = useContext(UserContext);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [individual, setIndividual] = useState();

  useEffect(() => {
    const loadData = async () => {
      if (session) {
        let success;
        if (session?.data?.session?.user.id === id) {
          success = true;
        } else {
          success = await verifyLogin("business");
        }
        if (success) {
          await setLoading(false);
          fetchPurchase();
        }
      }
    };

    loadData();
  }, [session]);

  const fetchInterview = async () => {
    const response = await fetch(`/api/individual/${id}?interview=true`, {
      method: "GET",
    });
    if (response.status === 200) {
      const results = await response.json();
      setIndividual(results.individual);
    }
  };

  const fetchPurchase = async () => {
    const userId = session?.data?.session?.user.id;
    if (!userId) return;
    if (userId !== id) {
      const response = await fetch(`/api/purchase?business_id=${userId}&individual_id=${id}`);
      if (response.status !== 200) {
        router.push(`/individual/${id}`);
        console.error("Please purchase the interview to access this page");
        return;
      }
    }
    fetchInterview();
  };

  if (loading || !individual) {
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );
  }

  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#2b1f38]">
      <NavBar />
      <Head>
        <title>Feedback | EloStack</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/css/all.min.css" />
      </Head>

      <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8">
        <h1 className="text-4xl font-bold text-center mb-8">Interview Feedback</h1>
        {individual && individual.interview && (
          <div className="bg-[#0f0f1c] rounded-lg shadow-lg overflow-hidden mb-10">
            <div className="p-6">
              <Link href={`/individual/${id}`}>
                <h2 className="text-3xl font-semibold mb-4 capitalize text-white">
                  {individual.first_name} {individual.last_name} - {individual.position}
                </h2>
              </Link>
              <p className="text-xl font-semibold text-purple-500 mb-6 capitalize">
                Overall Grade: {individual.interview.grade}
              </p>
              <div className="flex justify-center">
                <video
                  controls
                  className="max-w-full h-auto rounded-lg shadow-md"
                  style={{ maxWidth: "1250px", width: "100%" }}
                >
                  <source src={individual.interview.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="flex justify-center">
                <h2 className="text-4xl font-semibold mb-4 text-purple-500 mt-[2.5rem] text-center mr-[3.5rem]">
                  Score Card
                </h2>
              </div>
              <div className="mb-8 mt-[2rem]">
                <div className="bg-gray-800 hover:shadow-xl rounded-lg p-4 shadow-inner mb-4">
                  <h3 className="text-xl font-semibold text-white">Feedback</h3>
                  <p className="text-gray-300 whitespace-pre-line">{individual.interview.feedback}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </main>
  );
};

export default Page;