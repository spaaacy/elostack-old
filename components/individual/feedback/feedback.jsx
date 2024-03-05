"use client";
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { UserContext } from "@/context/UserContext";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import NavBar from "@/components/common/NavBar";
import Link from "next/link";

const FeedbackPage = () => {
  const [individual, setIndividual] = useState();
  const { session } = useContext(UserContext);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetchPurchase();
    }
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

  if (!individual)
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );

  return (
    <>
      <Head>
        <title>Feedback | EloStack</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/css/all.min.css" />
      </Head>
      <div className="w-full min-h-screen bg-gray-100 pt-10 pb-20 px-4 md:px-0 bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-12 text-blueprimary">Interview Feedback</h1>
          {individual && individual.interview && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
              <div className="p-6">
                <Link href={`/individual/${id}`}>
                  <h2 className="text-3xl font-semibold mb-4 capitalize">
                    {individual.first_name} {individual.last_name} - {individual.position}
                  </h2>
                </Link>
                <p className="text-xl font-semibold text-blueprimary mb-6 capitalize">
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
                  <h2 className="text-4xl font-semibold mb-4 text-blueprimary mt-[2.5rem] text-center mr-[3.5rem]">
                    Score Card
                  </h2>
                </div>
                <div className="mb-8 mt-[2rem]">
                  <div className="bg-gray-50 hover:shadow-xl rounded-lg p-4 shadow-inner mb-4">
                    <h3 className="text-xl font-semibold">Feedback</h3>
                    <p className="italic">{individual.interview.feedback}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FeedbackPage;
