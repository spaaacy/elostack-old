"use client";

import NavBar from "@/components/common/NavBar";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/components/common/Footer";

const Page = () => {
  const { session } = useContext(UserContext);
  const router = useRouter();
  const [individualData, setIndividualData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (session?.data?.session) {
        await fetchUser();
      } else {
        router.push("/signin");
      }
    };

    if (session) {
      loadData();
    }
  }, [session]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setIndividualData({ ...individualData, [e.target.name]: e.target.files[0] });
    } else {
      setIndividualData({ ...individualData, [e.target.name]: e.target.value });
    }
  };

  const fetchIndividual = async () => {
    const userId = session?.data.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/individual/${userId}`);
      const result = await response.json();
      if (response.status === 200) {
        setIndividualData(result.individual);
        setLoading(false);
      } else {
        router.push("/signin");
        console.error("Error fetching profile:", result.error);
      }
    } else {
      console.log("Session not loaded or user ID undefined");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = session?.data.session?.user.id;
    console.log(individualData);

    // Check for a valid session and user ID before proceeding
    if (!userId) return;
    try {
      const formData = new FormData();

      // Add files to formData and remove from object
      if (individualData.profilePicture) {
        formData.append("profilePicture", individualData.profilePicture);
        delete individualData.profilePicture;
      }
      if (individualData.resume) {
        formData.append("resume", individualData.resume);
        delete individualData.resume;
      }
      if (individualData.coverLetter) {
        formData.append("coverLetter", individualData.coverLetter);
        delete individualData.coverLetter;
      }
      delete individualData.user; // User object is also fetched at page load and must be deleted
      formData.append("profile_data", JSON.stringify({ ...individualData, user_id: userId }));
      await fetch("/api/individual/edit-profile", {
        method: "POST",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
        body: formData,
      });

      router.push(`/individual/${userId}`);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const fetchUser = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        fetchIndividual();
      }
    } else {
      router.push("/signin");
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
    <>
      <NavBar />
      <Head>
        <title>Edit Profile | EloStack</title>
      </Head>
      <div className="flex flex-1">
        <div className="bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#1d1525] w-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-60 mt-10">
            <div className="bg-gray-900 shadow rounded-lg p-6 w-full lg:w-3/4 xl:w-3/5 mx-auto">
              <h1 className="text-4xl font-semibold mb-6 flex justify-center text-white">Edit Your Profile</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-xl font-semibold mb-6 text-white">User Information</div>
                <div className="mb-4">
                  <label htmlFor="first_name" className="block text-white">
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={individualData.first_name}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="last_name" className="block text-white">
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={individualData.last_name}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="profilePicture" className="block text-white">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="gender" className="block text-white">
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    defaultValue="male"
                    value={individualData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Please select">Please select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="position" className="block text-white">
                    Position
                  </label>
                  <select
                    name="position"
                    id="position"
                    defaultValue="intern"
                    value={individualData.position}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Please select">Please select</option>
                    <option value="intern">Intern</option>
                    <option value="junior">Junior</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="birthday" className="block text-white">
                    Birthday
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    value={individualData.birthday}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="text-xl font-semibold mb-6 text-white">About</div>
                <div className="mb-4">
                  <textarea
                    name="about_me"
                    id="about_me"
                    value={individualData.about_me}
                    onChange={handleChange}
                    rows={10}
                    placeholder="Describe yourself here..."
                    className="resize-none w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="text-xl font-semibold mb-6 text-white">Contact Information</div>
                <div className="mb-4">
                  <label htmlFor="phone_number" className="block text-white">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    value={individualData.phone_number}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <label htmlFor="phone_type" className="block text-white mt-4">
                    Phone Type
                  </label>
                  <select
                    name="phone_type"
                    id="phone_type"
                    value={individualData.phone_type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Please select</option>
                    <option value="mobile">Mobile</option>
                    <option value="work">Work</option>
                    <option value="home">Home</option>
                  </select>
                </div>
                <div className="text-xl font-semibold mb-6 text-white">Location</div>
                <div className="mb-4">
                  <label htmlFor="country" className="block text-white">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={individualData.country}
                    onChange={handleChange}
                    placeholder="Ex: United States"
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="state" className="block text-white">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={individualData.state}
                    onChange={handleChange}
                    placeholder="Ex: FL"
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block text-white">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={individualData.city}
                    onChange={handleChange}
                    placeholder="Enter your City"
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={individualData.address}
                    onChange={handleChange}
                    placeholder="Enter your Address"
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="postal_code" className="block text-white">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    id="postal_code"
                    value={individualData.postal_code}
                    onChange={handleChange}
                    placeholder="Enter your postal code"
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="text-xl font-semibold mb-6 text-white">Documents</div>
                <div className="mb-4">
                  <label htmlFor="resume" className="block text-white">
                    Upload Resume
                  </label>
                  <input
                    type="file"
                    name="resume"
                    id="resume"
                    onChange={handleChange}
                    accept=".pdf"
                    className="mt-1 block w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="coverLetter" className="block text-white">
                    Upload Cover Letter
                  </label>
                  <input
                    type="file"
                    name="coverLetter"
                    id="coverLetter"
                    onChange={handleChange}
                    accept=".pdf"
                    className="mt-1 block w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="text-xl font-semibold mb-6 text-white">Online Presence</div>
                <div className="mb-4">
                  <label htmlFor="portfolio" className="block text-white">
                    Portfolio URL
                  </label>
                  <input
                    type="text"
                    name="portfolio"
                    id="portfolio"
                    value={individualData.portfolio}
                    onChange={handleChange}
                    placeholder="Enter your portfolio URL"
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="linkedin" className="block text-white">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    name="linkedin"
                    id="linkedin"
                    value={individualData.linkedin}
                    onChange={handleChange}
                    placeholder="Enter your LinkedIn URL"
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="github" className="block text-white">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    name="github"
                    id="github"
                    value={individualData.github}
                    onChange={handleChange}
                    placeholder="Enter your GitHub URL"
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Page;
