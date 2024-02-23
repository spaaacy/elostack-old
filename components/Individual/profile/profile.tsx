"use client";
import Head from "next/head";
import EditProfileButton from "./EditProfileButton";
import { useStore } from './store'; // Adjust the path based on where you placed your store.js
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from './supabaseClient'; // Adjust the path to your Supabase client

const ProfilePage = () => {
  const { data: session } = useSession();
  const { profileData, setProfileData } = useStore();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (session) {
        const { user } = session;
        // Fetch profile data from Supabase using user.id
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setProfileData(data);
        } else if (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfileData();
  }, [session, setProfileData]);

  
  return (
    <>
      <Head>
        <title>{`${profileData.firstName}'s Profile | LinkedIn`}</title>
      </Head>
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-24 w-24 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
              <h1 className="text-2xl font-bold">{`${profileData.firstName} ${profileData.lastName}`}</h1>
              <p className="text-gray-600">{profileData.pronouns}</p>
              <p className="text-gray-600">{`${profileData.city}, ${profileData.countryRegion}`}</p>
            </div>
          </div>
          <EditProfileButton />

          {/* Contact Information */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold">Phone Number</h3>
                <p>{profileData.number} ({profileData.phoneType})</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>{profileData.email}</p> {/* Assuming email is part of profileData */}
              </div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p>{profileData.address}</p>
              </div>
              <div>
                <h3 className="font-semibold">City / Postal Code</h3>
                <p>{`${profileData.city}, ${profileData.postalCode}`}</p>
              </div>
            </div>
          </section>

          {/* Professional Information */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold">LinkedIn</h3>
                <p><a href={profileData.linkedIn} target="_blank" rel="noopener noreferrer">{profileData.linkedIn}</a></p>
              </div>
              <div>
                <h3 className="font-semibold">GitHub</h3>
                <p><a href={profileData.github} target="_blank" rel="noopener noreferrer">{profileData.github}</a></p>
              </div>
              <div>
                <h3 className="font-semibold">Portfolio</h3>
                <p><a href={profileData.portfolio} target="_blank" rel="noopener noreferrer">{profileData.portfolio}</a></p>
              </div>
            </div>
          </section>

          {/* Documents */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold">Resume</h3>
                <p><a href={profileData.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
              </div>
              <div>
                <h3 className="font-semibold">Cover Letter</h3>
                <p><a href={profileData.coverLetter} target="_blank" rel="noopener noreferrer">View Cover Letter</a></p>
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            <div>
              <h3 className="font-semibold">Birthday</h3>
              <p>{profileData.birthday}</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;