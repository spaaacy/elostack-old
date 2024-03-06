"use client";

import NavBar from "@/components/common/NavBar";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import waveBg from "@/public/wave.svg";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useParams } from "next/navigation";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import EditProfileButton from "@/components/common/EditProfileButton";
import { formatLink } from "@/utils/formatLink";

const Page = () => {
  const { id } = useParams();
  const { session } = useContext(UserContext);
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(true);
  const [jobListings, setJobListings] = useState();
  const [isFullTextShown, setIsFullTextShown] = useState(false);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-1">
        <div
          className="flex flex-col flex-1 bg-gray-100 h-auto pb-20 bg-no-repeat bg-fixed bg-bottom"
          style={{ backgroundImage: `url(${waveBg})`, zIndex: 1 }}
        >
          <main className="flex-1 bg-gray-100 p-5">
            <div className="container mx-auto">
              <div className="bg-white shadow rounded-lg mb-6 p-5">
                <div className="flex items-center space-x-5">
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xl font-medium uppercase">{business?.name[0]}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                          {business?.name}
                        </h2>
                        <div className="mt-1 flex flex-col sm:mt-0">
                          {business.industry && (
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              Industry: {business.industry}
                            </div>
                          )}
                        </div>
                      </div>
                      {session?.data?.session?.user.id === id && <EditProfileButton />}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6 border-t border-gray-200 mt-6">
                  <h3 className="text-lg leading-6 font-semibold text-blueprimary">About</h3>
                  <p className="mt-2 text-sm text-gray-900">
                    {/* {isFullTextShown && business
                      ? business.description
                      : `${business.description?.substring(0, 770)}...`} */}
                    {business.description}
                    {/* <button
                      className="text-blue-600 hover:underline cursor-pointer ml-6"
                      onClick={() => setIsFullTextShown(!isFullTextShown)}
                      >
                      {isFullTextShown ? "Read less" : "Read more"}
                    </button> */}
                  </p>
                </div>
                <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
                  <h3 className="text-lg leading-6 font-semibold text-blueprimary">Company Information</h3>
                  <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">{business.user.email}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      {business.website && (
                        <>
                          <dt className="text-sm font-medium text-gray-500">Website</dt>
                          <a
                            href={formatLink(business.website)}
                            target="_blank"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            {business.website}
                          </a>
                        </>
                      )}
                    </div>

                    <div className="sm:col-span-1">
                      {business.linkedin && (
                        <a
                          target="_blank"
                          href={formatLink(business.linkedin)}
                          className="transition-transform duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        >
                          <FontAwesomeIcon icon={faLinkedin} size="2x" color="#0e76a8" />
                        </a>
                      )}
                    </div>
                  </dl>
                </div>
                <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
                  <h3 className="text-lg leading-6 font-semibold  text-blueprimary">Location</h3>
                  <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      {business?.country && (
                        <>
                          <dt className="text-sm font-medium text-gray-500">Country</dt>
                          <dd className="mt-1 text-sm text-gray-900">{business.country}</dd>
                        </>
                      )}
                    </div>

                    <div className="sm:col-span-1">
                      {business?.city && (
                        <>
                          <dt className="text-sm font-medium text-gray-500">City</dt>
                          <dd className="mt-1 text-sm text-gray-900">{business.city}</dd>
                        </>
                      )}
                    </div>
                    <div className="sm:col-span-1">
                      {business?.address && (
                        <>
                          <dt className="text-sm font-medium text-gray-500">Address</dt>
                          <dd className="mt-1 text-sm text-gray-900">{business.address}</dd>
                        </>
                      )}
                    </div>
                    <div className="sm:col-span-1">
                      {business?.postal_code && (
                        <>
                          <dt className="text-sm font-medium text-gray-500">Postal Code</dt>
                          <dd className="mt-1 text-sm text-gray-900">{business.postal_code}</dd>
                        </>
                      )}
                    </div>
                  </dl>
                </div>

                <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
                  <h3 className="text-lg leading-6 font-semibold text-blueprimary">Recent Job Listings</h3>
                  <div className="space-y-6 mt-4">
                    {jobListings &&
                      jobListings.map((post, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-6 rounded-lg flex justify-between items-center hover:shadow-xl transition-shadow duration-300"
                        >
                          <div>
                            <h4 className="font-medium text-lg">{post.title}</h4>
                            <p className="text-sm text-gray-600">{post.content}</p>
                          </div>
                          <button className="text-blue-600 hover:underline">View Details</button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;
