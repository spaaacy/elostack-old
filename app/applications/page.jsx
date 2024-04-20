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
    <main className="flex flex-col min-h-screen text-white mx-28 ">
      <NavBar />
      <Head>
        <title>Track Applications | EloStack</title>
      </Head>
      <main className="container  px-4 sm:px-8 py-8 ">
        <section className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-400">Your Applications</h2>
          </div>
          <div className="space-y-6">
            {console.log(applications)}
            {applications?.length > 0 ? (
              applications.map((app, i) => (
                <div
                  key={i}
                  className="bg-gray-700 p-6 rounded-lg flex justify-between items-center hover:bg-gray-600 transition-colors duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      {app.receiver.first_name + " " + app.receiver.last_name} at {app.receiver.company}
                    </h3>
                    <p className="text-sm text-gray-400">Applied on {formatDate(app.created_at)}</p>
                  </div>
                  <div className="flex">
                    <p className="capitalize font-light text-white">
                      {app.receiver.city + ", " + app.receiver.state}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-bold text-white">You have made no applications</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </main>
  );
};

export default Page;