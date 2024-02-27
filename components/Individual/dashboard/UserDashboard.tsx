// pages/dashboard.tsx

"use client";

import { UserContext, UserContextType } from "@/context/UserContext";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { profileStore } from "../profileStore";
import Loader from "@/components/ui/Loader";
import AOS from "aos";
import "aos/dist/aos.css";
import Images from "next/image";
import Link from "next/link";

const UserDashboard: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const interviewScore = 85;

  const applications = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "Tech Inc.",
      status: "Interview Scheduled",
    },
    {
      id: 2,
      role: "Backend Developer",
      company: "Innovate LLC",
      status: "Application Under Review",
    },
    {
      id: 3,
      role: "Full Stack",
      company: "Innovate LLC",
      status: "Application Under Review",
    },
  ];

  const skillResources = [
    {
      id: 1,
      title: "Modern React with Redux",
      description: "Master React and Redux with this tutorial.",
      link: "https://www.udemy.com/course/react-redux/",
    },
    {
      id: 2,
      title: "Advanced CSS and Sass",
      description: "Take your CSS to the next level with Sass.",
      link: "https://www.udemy.com/course/advanced-css-and-sass/",
    },
    {
      id: 3,
      title: "The Complete JavaScript Course 2024",
      description: "Understand JavaScript deeply for a better development career.",
      link: "https://www.udemy.com/course/the-complete-javascript-course/",
    },
  ];

  const { session, fetchProfileData } = useContext(UserContext) as UserContextType;
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profileData, setProfileData } = profileStore();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [session]);

  const fetchUser = async () => {
    const userId = session?.data.session?.user.id;
    const data = await fetchProfileData(userId);
    if (data) {
      setProfileData(data);
      setLoadingData(false);
    } else {
      router.push("/signin");
    }
  };

  if (loadingData) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen animate-fadeIn bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <Head>
        <title>Job Seeker Dashboard | EloStack</title>
      </Head>

      <main className="container mx-auto p-4 bg-white rounded-lg shadow mt-8 animate-slideUp">
        {/* Profile Summary with AOS animation */}
        <section data-aos="fade-up">
          <div className="p-5 text-center border-b border-gray-200">
            <h2 className="text-2xl font-bold ">{`Welcome back, ${profileData.firstName}`}</h2>
            <p className="text-md text-gray-500">Software Dev</p>
            <div className="mt-0">
              <span className="text-lg font-semibold">Interview Score: </span>
              <span className="text-lg text-blue-600">88%</span>
            </div>
          </div>
        </section>

        {/* Job Application Status with AOS animation */}
        <section data-aos="fade-right" className="bg-center p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center -mt-[2rem] ">
            <h2 className="text-3xl font-bold text-blueprimary">Your Applications</h2>
            <div className="mt-[2rem]">
              <Link href="/dashboard/applications">
                <button className="inline-block bg-blue-600 text-white px-6 py-3 mb-6 rounded hover:bg-blue-700 transition duration-150 ease-in-out">
                  View More Applications
                </button>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-gray-50 p-6 rounded-lg flex justify-between items-center hover:shadow-xl transition-shadow duration-300"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {app.role} at {app.company}
                  </h3>
                  <p className="text-sm text-gray-600">{app.status}</p>
                </div>
                <button className="text-blue-600 hover:underline">View Details</button>
              </div>
            ))}
          </div>
        </section>

        {/* Skill Improvement with AOS animation */}
        <section
          data-aos="fade-left"
          className=" bg-cover bg-white mt-[1rem] bg-center p-8 rounded-lg shadow-2xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-blueprimary mb-6">Skill Improvement</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {skillResources.map((resource) => (
              <a
                key={resource.id}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="font-semibold text-lg">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.description}</p>
                <span className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-150 ease-in-out">
                  Learn More
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </main>
  );
};

export default UserDashboard;
//animate-fadeIn bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]
