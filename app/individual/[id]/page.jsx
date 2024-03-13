"use client";

import NavBar from "@/components/common/NavBar";
import { useParams } from "next/navigation";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import Loader from "@/components/common/Loader";
import Link from "next/link";
import { formatLink } from "@/utils/formatLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { parsePhoneNumber } from "libphonenumber-js";
import EditProfileButton from "@/components/common/EditProfileButton";
import { profileStore } from "@/components/individual/profileStore";
import FeaturedCard from "@/components/individual/profile/FeaturedCard";

const Page = () => {
  const { id } = useParams();
  const { session } = useContext(UserContext);
  const { profileData, setProfileData } = profileStore();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [access, setAccess] = useState(false);
  const [confirmPurchase, setConfirmPurchase] = useState(false);

  useEffect(() => {
    if (session) {
      fetchIndividual();
      fetchUser();
    }
  }, [session]);

  const fetchPurchase = async (businessId) => {
    if (!businessId) return;
    const response = await fetch(`/api/purchase?business_id=${businessId}&individual_id=${id}`);
    if (response.status === 200) {
      setAccess(true);
    }
  };

  const fetchIndividual = async () => {
    const userId = id;
    if (userId) {
      const response = await fetch(`/api/individual/${userId}`);
      const result = await response.json();
      if (response.status === 200) {
        setProfileData(result.individual);
        setLoading(false);
      } else {
        console.error("Error fetching profile:", result.error);
      }
    } else {
      console.log("Session not loaded or user ID undefined");
    }
  };

  const fetchUser = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const { user } = await response.json();
        setUser(user);
        if (user.business) {
          fetchPurchase(userId);
        }
      }
    }
  };

  const submitAccessInterview = async () => {
    if (user.business) {
      const businessId = session?.data?.session?.user.id;
      if (businessId) {
        const response = await fetch("/api/purchase/create", {
          method: "POST",
          body: JSON.stringify({
            individual_id: id,
            business_id: businessId,
          }),
        });
        if (response.status === 201) {
          setAccess(true);
        } else {
          console.error("Error making purchase!");
        }
      }
    } else {
      console.error("Must be logged in as business to access interview!");
    }
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
    <main className="flex flex-col flex-1">
      <NavBar />
      <div className="flex flex-1">
        <main className="flex-1 bg-gray-100 bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
          <Head>
            <title>{`${profileData.first_name}'s Profile`}</title>
          </Head>
          <div className="">
            <div className="container mx-auto p-5">
              <div className="bg-white shadow rounded-lg mb-6">
                {/* Header Section */}
                <div className="p-5 border-b border-gray-200">
                  <div className="flex items-center space-x-5">
                    <div className="flex-shrink-0">
                      <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xl font-medium uppercase">
                          {profileData.first_name[0] + profileData.last_name[0]}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                          {`${profileData.first_name} ${profileData.last_name}`}
                        </h2>
                        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            {profileData.city}, {profileData.state}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">{profileData.pronouns}</div>
                        </div>
                      </div>
                      {user && user.business ? (
                        access ? (
                          <Link
                            href={`${id}/interview`}
                            onClick={submitAccessInterview}
                            className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                          >
                            View Interview
                          </Link>
                        ) : confirmPurchase ? (
                          <div className="flex flex-col justify-center items-center">
                            <p className="text-gray-400 font-light text-sm">Confirm Purchase</p>
                            <div className="gap-2 flex items-center mt-2">
                              <button onClick={() => setConfirmPurchase(false)} className="text-sm">
                                No
                              </button>
                              <button
                                onClick={() => {
                                  setConfirmPurchase(false);
                                  submitAccessInterview();
                                }}
                                className="text-sm px-4 py-2 rounded-full ml-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <button
                              onClick={() => setConfirmPurchase(true)}
                              className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                            >
                              Access Interview
                            </button>
                          </div>
                        )
                      ) : (
                        session?.data?.session?.user.id === id && <EditProfileButton />
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Information</h3>
                  <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">{session.data.session?.user.email}</dd>
                    </div>
                    {profileData.phone_number && (
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {parsePhoneNumber(profileData.phone_number, "US").formatNational()}{" "}
                          <span className="text-gray-500">{profileData.phone_type}</span>
                        </dd>
                      </div>
                    )}
                    {profileData.address && (
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Address</dt>
                        <dd className="mt-1 text-sm text-gray-900">{profileData.address}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* About Me Section */}
                {profileData.about_me && (
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">About Me</h3>
                    <p className="mt-2 text-sm text-gray-900">{profileData.about_me}</p>
                  </div>
                )}
                {/* Professional Information Section */}
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Professional Information</h3>
                  <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Social Media</dt>
                      <dd className="mt-1 text-sm text-gray-900 flex gap-2">
                        <a
                          target="_blank"
                          href={formatLink(profileData.linkedin)}
                          className="transition-transform duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        >
                          <FontAwesomeIcon icon={faLinkedin} size="2x" color="#0e76a8" />
                        </a>
                        <a
                          target="_blank"
                          href={formatLink(profileData.github)}
                          className="transition-transform duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        >
                          <FontAwesomeIcon icon={faGithub} size="2x" />
                        </a>
                      </dd>
                    </div>
                    {profileData.portfolio && (
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Portfolio</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <a
                            href={profileData.portfolio}
                            className="text-blue-600 hover:text-blue-700"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Portfolio
                          </a>
                        </dd>
                      </div>
                    )}
                    {profileData.resume && (
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Resume</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <a
                            href={profileData.resume}
                            className="text-blue-600 hover:text-blue-700"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Resume
                          </a>
                        </dd>
                      </div>
                    )}
                    {profileData.cover_letter && (
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Cover Letter</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <a
                            href={profileData.cover_letter}
                            className="text-blue-600 hover:text-blue-700"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Cover Letter
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
};

export default Page;
