"use client";

import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
import Head from "next/head";
import Loader from "@/components/common/Loader";
import formatDate from "@/utils/formatDate";
import Footer from "@/components/common/Footer";
import { useRouter } from "next/navigation";

const Page = () => {
  const { session } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState();
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      if (session?.data?.session) {
        await fetchApplications();
        setLoading(false);
      } else {
        router.push("/signin");
      }
    };

    if (session) {
      loadData();
    }
  }, [session]);

  const fetchApplications = async () => {
    const userId = session.data.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/application/${userId}`, {
        method: "GET",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
      });
      if (response.status === 200) {
        const results = await response.json();
        console.log(results);
        setApplications(results.data);
        setLoading(false);
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
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
      <NavBar />
      <Head>
        <title>Track Applications | EloStack</title>
      </Head>
      <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8">
        <section className="p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Your Applications</h2>
          </div>
          <div className="space-y-6 mt-4">
            {console.log(applications)}
            {applications?.length > 0 ? (
              applications.map((app, i) => (
                <div
                  key={i}
                  className="bg-[#0f0f1c] p-6 rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {app.receiver.first_name + " " + app.receiver.last_name} at {app.receiver.company}
                    </h3>
                    <p className="text-sm text-gray-400">Applied on {formatDate(app.created_at)}</p>
                  </div>
                  <div className="flex">
                    <p className="capitalize font-light">{app.receiver.city + ", " + app.receiver.state}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-bold">You have made no applications</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </main>
  );
};

export default Page;
