"use client";

import NavBar from "@/components/common/NavBar";
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import Loader from "@/components/common/Loader";
import Link from "next/link";
import { formatLink } from "@/utils/formatLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { parsePhoneNumber } from "libphonenumber-js";
import { profileStore } from "@/components/individual/profileStore";
import FeaturedCard from "@/components/individual/profile/FeaturedCard";
import MediaSection from "@/components/individual/profile/MediaSection";
import ExperienceSection from "@/components/individual/ExperienceSection";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import checkFileExists from "@/utils/checkFileExists";
import EducationSection from "@/components/individual/EducationSection";
import { formatDate } from "@/utils/formatDate";

const Page = () => {
  const { id } = useParams();
  const { session } = useContext(UserContext);
  const { profileData, setProfileData } = profileStore();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [access, setAccess] = useState(false);
  const [confirmPurchase, setConfirmPurchase] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [imageExists, setImageExists] = useState(false);
  const [resumeExists, setResumeExists] = useState(false);
  const [coverLetterExists, setCoverLetterExists] = useState(false);
  const imageSrc = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_STORAGE_PATH}/profile-pictures/${id}/default`;
  const resumeSrc = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_STORAGE_PATH}/documents/${id}/resume`;
  const coverLetterSrc = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_STORAGE_PATH}/documents/${id}/cover-letter`;
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetchIndividual();
      setImageExists(checkFileExists(imageSrc));
      setResumeExists(checkFileExists(imageSrc));
      setCoverLetterExists(checkFileExists(imageSrc));
    }
  }, [session]);

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

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
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

  // Count the number of newline characters in the string
  const lineCount = (profileData?.about_me?.match(/\n/g) || []).length;

  // If the number of lines is greater than 5, show a shortened version of the text
  const shouldShortenText = lineCount > 5;
  console.log(profileData);

  // Split the text into lines
  const lines = profileData?.about_me?.split("\n");

  // If the text should be shortened, join the first 5 lines and add "..."
  const shortenedText = shouldShortenText ? `${lines.slice(0, 5).join("\n")}...` : profileData.about_me;

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
        <div className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow my-10">
          <Head>
            <title>{`${profileData.first_name}'s Profile`}</title>
          </Head>

          <div className="p-5 border-b border-gray-700">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                {imageExists ? (
                  <Image
                    className="w-[150px] h-[150px] object-cover rounded-full"
                    width={150}
                    height={150}
                    alt="profile_picture"
                    src={imageSrc}
                  />
                ) : (
                  <div className="h-[150px] w-[150px] rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-5xl font-medium uppercase">
                      {profileData.first_name[0] + profileData.last_name[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                    {`${profileData.first_name} ${profileData.last_name}`}
                  </h2>
                  <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    {profileData.city && profileData.state && (
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        {profileData.city}, {profileData.state}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {profileData.interview_id && (
                <Link
                  href={`${id}/interview`}
                  className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                >
                  View Interview
                </Link>
              )}
              {session?.data?.session?.user.id === id && (
                <div className="flex flex-1">
                  <button
                    onClick={() => router.push("/dashboard/edit-profile")}
                    className="ml-auto px-4 py-2 rounded text-white bg-purpleprimary hover:bg-purple-700 focus:outline-none"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-white">Contact Information</h3>
            <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-white">Email</dt>
                <dd className="mt-1 text-sm text-white">{profileData.user.email}</dd>
              </div>
              {profileData.phone_number && (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-white">Phone</dt>
                  <dd className="mt-1 text-sm text-white">
                    {parsePhoneNumber(profileData.phone_number, "US").formatNational()}{" "}
                    <span className="text-white">{profileData.phone_type}</span>
                  </dd>
                </div>
              )}
              {profileData.address && (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-white">Address</dt>
                  <dd className="mt-1 text-sm text-white">{profileData.address}</dd>
                </div>
              )}
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-white">Social Media</dt>
                <dd className="mt-1 text-sm text-white flex gap-2">
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
            </dl>
          </div>

          {/* About Me Section */}
          {profileData.about_me && (
            <div className="border-t border-gray-700 px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-white">About Me</h3>
              <div
                className={`mt-2 text-sm text-white whitespace-pre-wrap mr-10 overflow-hidden ${
                  showFullText ? "" : "h-20"
                }`}
              >
                {showFullText ? profileData.about_me : shortenedText}
              </div>
              {profileData.about_me.length > 100 && (
                <button onClick={toggleShowFullText} className="text-purple-500 mt-4">
                  {showFullText ? "Show Less" : "Read More"}
                </button>
              )}
            </div>
          )}
          {/* Professional Information Section */}
          {/* <MediaSection />
          <EducationSection />
          <ExperienceSection /> */}
        </div>
      </div>
    </main>
  );
};

export default Page;
