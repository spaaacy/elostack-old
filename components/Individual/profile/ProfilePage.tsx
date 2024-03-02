"use client";

import Head from "next/head";
import EditProfileButton from "./EditProfileButton";
import { profileStore } from "../profileStore";
import { useContext, FC, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import UploadBox from "./UploadBox";
import Featured from "./FeaturedCard";
interface ProfilePageProps {
  id: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ id }) => {
  const { session, user } = useContext(UserContext);

  const { profileData, setProfileData } = profileStore();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (session) {
      fetchIndividual();
    }
  }, [session]);

  const fetchIndividual = async () => {
    const userId = session?.data.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/individual/${userId}`);
      const result = await response.json();
      if (response.status === 200) {
        setProfileData(result.individual);
        setLoadingData(false);
      } else {
        router.push("/signin");
        console.error("Error fetching profile:", result.error);
      }
    } else {
      console.log("Session not loaded or user ID undefined");
    }
  };

  if (loadingData) {
    return <Loader />;
  }

  return (
    <main className="flex-1 bg-gray-100">
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

                {user && user.user_id === id && <EditProfileButton />}
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
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {profileData.phone_number} ({profileData.phone_type})
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
                      href={profileData.linkedin}
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

            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Documents ( Resume, Cover Letter, etc. )
              </h3>
              <Featured />

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
      </div>
    </main>
  );
};

export default ProfilePage;
