"use client";
import Head from "next/head";
import EditProfileButton from "./EditProfileButton";
import { profileStore } from "./profileStore";
import React, { useEffect, useState } from "react";
import { UserContext, UserContextType } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";

const ProfilePage = () => {
  const { session, fetchProfileData } = React.useContext(UserContext) as UserContextType;
  const router = useRouter();

  const { profileData, setProfileData } = profileStore();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [session]);

  const fetchUser = async () => {
    const data = await fetchProfileData();
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

  return (
    <>
      <Head>
        <title>{`${profileData.firstName}'s Profile`}</title>
      </Head>
      <div className="bg-gray-100 min-h-screen w-[120rem]">
        <div className="container mx-auto p-5">
          <div className="bg-white shadow rounded-lg mb-6">
            {/* Header Section */}
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xl font-medium uppercase">
                      {profileData.firstName[0] + profileData.lastName[0]}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    {`${profileData.firstName} ${profileData.lastName}`}
                  </h2>
                  <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      {profileData.city}, {profileData.countryRegion}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">{profileData.pronouns}</div>
                  </div>
                </div>

                <EditProfileButton />
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Information</h3>
              <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profileData.email}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {profileData.number} ({profileData.phoneType})
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profileData.address}</dd>
                </div>
              </dl>
            </div>

            {/* Professional Information Section */}
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Professional Information</h3>
              <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href={profileData.linkedIn}
                      className="text-blue-600 hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View LinkedIn
                    </a>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">GitHub</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href={profileData.github}
                      className="text-blue-600 hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View GitHub
                    </a>
                  </dd>
                </div>
                <div className="sm:col-span-2">
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
              </dl>
            </div>

            {/* Documents Section */}
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Documents</h3>
              <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Resume Section */}
                <div>
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
                {/* Cover Letter Section */}
                <div>
                  <dt className="text-sm font-medium text-gray-500">Cover Letter</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href={profileData.coverLetter}
                      className="text-blue-600 hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Cover Letter
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Additional Information Section */}
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Additional Information</h3>
              <dl className="mt-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Birthday</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profileData.birthday}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
