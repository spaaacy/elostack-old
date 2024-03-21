import NavBar from "@/components/common/NavBar";
import CustomCalendar from "@/components/individual/CustomCalendar";
import Head from "next/head";
import React from "react";


const Page = async () => {
  return (
    <>
      <NavBar />
      <div>
      <Head>
        <title>Technical Interview Scheduling | EloStack</title>
      </Head>

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto max-w-6xl bg-white rounded-lg shadow p-6 space-y-8">
          {/* Calendar for Scheduling Interviews */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Schedule Your Interview
            </h2>
            <CustomCalendar />
          </section>

        </div>
      </div>
      </div>
    </>
  );
};

export default Page;