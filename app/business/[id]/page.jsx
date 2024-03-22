"use client";

import NavBar from "@/components/common/NavBar";
import { useContext, useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useParams } from "next/navigation";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { formatLink } from "@/utils/formatLink";
import Link from "next/link";

const Page = () => {
  const { id } = useParams();
  const { session } = useContext(UserContext);
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(true);
  const [jobListings, setJobListings] = useState();
  const [showFullText, setShowFullText] = useState(false);
  const aboutRef = useRef();

  useEffect(() => {
    fetchBusiness();
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const response = await fetch(`/api/job-listing?business_id=${id}`, {
      method: "GET",
    });
    if (response.status === 200) {
      const results = await response.json();
      setJobListings(results.data);
    }
  };

  const fetchBusiness = async () => {
    const response = await fetch(`/api/business/${id}?user=true`, {
      method: "GET",
    });
    if (response.status === 200) {
      const results = await response.json();
      console.log(results.business);
      setBusiness(results.business);
      setLoading(false);
    } else {
      console.error("Error fetching business!");
    }
  };

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  const isOverflowing = () => {
    if (aboutRef.current) {
      return aboutRef.current.scrollHeight > aboutRef.current.clientHeight;
    }
    return false;
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );
  }

  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#2e2536]">
      <NavBar />
      <div className="flex flex-col min-h-screen">
        <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-10">
          <div className="p-5 border-b border-gray-700">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl font-medium uppercase">{business?.name[0]}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                      {business?.name}
                    </h2>
                    <div className="mt-1 flex flex-col sm:mt-0">
                      {business.industry && (
                        <div className="mt-2 flex items-center text-sm text-gray-400">
                          Industry: {business.industry}
                        </div>
                      )}
                    </div>
                  </div>
                  {session?.data?.session?.user.id === id && (
                    <div className="flex flex-1">
                      <button
                        onClick={() => router.push("/dashboard/edit-profile")}
                        className="ml-auto px-4 py-2 rounded text-white bg-purple-500 hover:bg-purple-600 focus:outline-none"
                      >
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-white">About</h3>
            <div
              ref={aboutRef}
              className={`mt-2 text-sm text-white whitespace-pre-wrap overflow-hidden ${showFullText ? "" : "h-20"}`}
            >
              {business.description}
            </div>
            {isOverflowing() && (
              <button onClick={toggleShowFullText} className="text-purple-500 mt-4">
                {showFullText ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
          <div className="px-4 py-5 sm:p-6 border-t border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-white">Company Information</h3>
            <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-white">Email</dt>
                <dd className="mt-1 text-sm text-white">{business.user.email}</dd>
              </div>
              {business.founded_date && (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-white">Date Founded</dt>
                  <dd className="mt-1 text-sm text-white">{business.founded_date}</dd>
                </div>
              )}
              <div className="sm:col-span-1">
                {business.website && (
                  <>
                    <dt className="text-sm font-medium text-white">Website</dt>
                    <a
                      href={formatLink(business.website)}
                      target="_blank"
                      className="text-purple-500 hover:text-purple-600"
                    >
                      {business.website}
                    </a>
                  </>
                )}
              </div>
              <div className="sm:col-span-1">
                {business.linkedin && (
                  <>
                    <dt className="text-sm font-medium text-white">Linkedin</dt>
                    <a
                      target="_blank"
                      href={formatLink(business.linkedin)}
                      className="transition-transform duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      <FontAwesomeIcon icon={faLinkedin} size="2x" color="#0e76a8" />
                    </a>
                  </>
                )}
              </div>
            </dl>
          </div>
          <div className="px-4 py-5 sm:p-6 border-t border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-white">Location</h3>
            <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                {business?.country && (
                  <>
                    <dt className="text-sm font-medium text-white">Country</dt>
                    <dd className="mt-1 text-sm text-white">{business.country}</dd>
                  </>
                )}
              </div>
              <div className="sm:col-span-1">
                {business?.city && (
                  <>
                    <dt className="text-sm font-medium text-white">City</dt>
                    <dd className="mt-1 text-sm text-white">{business.city}</dd>
                  </>
                )}
              </div>
              <div className="sm:col-span-1">
                {business?.address && (
                  <>
                    <dt className="text-sm font-medium text-white">Address</dt>
                    <dd className="mt-1 text-sm text-white">{business.address}</dd>
                  </>
                )}
              </div>
              <div className="sm:col-span-1">
                {business?.postal_code && (
                  <>
                    <dt className="text-sm font-medium text-white">Postal Code</dt>
                    <dd className="mt-1 text-sm text-white">{business.postal_code}</dd>
                  </>
                )}
              </div>
            </dl>
          </div>
          <div className="px-4 py-5 sm:p-6 border-t border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-white">Recent Job Listings</h3>
            <div className="space-y-6 mt-4">
              {jobListings &&
                jobListings.map((post, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 p-6 rounded-lg flex justify-between items-center hover:shadow-xl transition-shadow duration-300"
                  >
                    <div>
                      <h4 className="font-medium text-lg text-white">{post.title}</h4>
                      <p className="text-sm text-gray-400">{post.content}</p>
                    </div>
                    <Link href={`/job-listing/${post.id}`} className="text-purple-500 hover:text-purple-600">
                      View Details
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </main>
  );
};

export default Page;
