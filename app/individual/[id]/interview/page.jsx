"use client";
import Loader from "@/components/common/Loader";
import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import MarkdownInput from "@/components/admin/MarkdownInput";
import Footer from "@/components/common/Footer";

const Page = () => {
  const { id } = useParams();
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [individual, setIndividual] = useState();

  useEffect(() => {
    const loadData = async () => {
      if (session) {
        await fetchInterview();
        setLoading(false);
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
      <main className="container mx-auto px-8 py-12 bg-[#1b1b29] rounded-lg shadow mt-8">
        <h1 className="text-5xl font-bold text-center mb-12 text-purple-500">Interview Feedback</h1>
        {individual && individual.interview && (
          <div className="bg-[#0f0f1c] rounded-lg shadow-lg overflow-hidden mb-10">
            <div className="p-8">
              <Link href={`/individual/${id}`}>
                <h2 className="text-4xl font-semibold mb-6 capitalize text-white hover:text-purple-500 transition duration-300">
                  {individual.first_name} {individual.last_name} - {individual.position}
                </h2>
              </Link>
              <p className="text-2xl font-semibold text-purple-500 mb-8 capitalize">
                Overall Grade: {individual.interview.grade}
              </p>
              <div className="flex justify-center mb-12">
                <iframe
                  className="mx-auto rounded-lg shadow-lg w-full"
                  width="1280"
                  height="720"
                  src={`https://www.youtube-nocookie.com/embed/${individual.interview.youtube_id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mb-8">
                <h2 className="text-4xl font-semibold mb-6 text-purple-500 text-center">Score Card</h2>
                <div className="bg-gray-800 hover:shadow-xl rounded-lg p-6 shadow-inner">
                  <MarkdownInput text={individual.interview.feedback} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </main>
  );
};

export default Page;
