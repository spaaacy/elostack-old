"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Loader from "@/components/common/Loader";
import Head from "next/head";

const EditBusinessProfile = () => {
  const { session } = useContext(UserContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(true);
  const [pfpPreview, setPfpPreview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetchBusinessDetails();
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePfpChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, pfp: file });
    setPfpPreview(URL.createObjectURL(file));
  };

  const fetchBusinessDetails = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/business/${userId}`);
      const result = await response.json();
      console.log({ result, response });
      if (response.status === 200) {
        setFormData(result.business);
        setPfpPreview(result.business.pfp);
        setLoading(false);
      } else {
        console.error("Fetching business details failed!");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (session.data.session) {
      try {
        const response = await fetch("/api/business/edit-profile", {
          method: "POST",
          body: JSON.stringify({ ...formData, user_id: session?.data?.session?.user.id }),
        });

        if (response.status === 201) {
          console.log("Profile updated successfully");
          router.push(`/business/${session?.data?.session?.user.id}`);
        }
      } catch (error) {
        console.error("Error updating profile:", error.message);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
      <Head>
        <title>Edit Business Profile | EloStack</title>
      </Head>

      <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8 w-2/5">
        <div className="max-w-4xl mx-auto p-5 ">
          <h1 className="text-3xl font-bold mb-6 text-white flex items-center justify-center">
            Edit Your Company Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-white">Company Information</h2>

              <div className="flex items-center mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  {pfpPreview ? (
                    <img src={pfpPreview} alt="Profile Picture Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-4xl font-bold">
                      {formData?.name ? formData.name.charAt(0).toUpperCase() : ""}
                    </div>
                  )}
                </div>
                <label htmlFor="pfp" className="ml-4 cursor-pointer text-purple-500 hover:text-purple-500">
                  Change Profile Picture
                </label>
                <input type="file" name="pfp" id="pfp" accept="image/*" onChange={handlePfpChange} className="hidden" />
              </div>

              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mt-3">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData?.name}
                onChange={handleChange}
                placeholder="Enter your company name"
                className="mt-1 block w-full rounded border border-gray-600 bg-[#0f0f1c] text-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              <label htmlFor="industry" className="block text-sm font-medium text-gray-400 mt-3">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                id="industry"
                value={formData?.industry}
                onChange={handleChange}
                placeholder="Enter your industry"
                className="mt-1 block w-full rounded border border-gray-600 bg-[#0f0f1c] text-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              <label htmlFor="founded_date" className="block text-sm font-medium text-gray-400 mt-3">
                Date Founded
              </label>
              <input
                type="date"
                name="founded_date"
                id="founded_date"
                value={formData?.founded_date}
                onChange={handleChange}
                className="mt-1 block w-full rounded border border-gray-600 bg-[#0f0f1c] text-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mt-3">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData?.description}
                onChange={handleChange}
                rows={5}
                placeholder="Enter your description"
                className="resize-none mt-1 block w-full rounded border border-gray-600 bg-[#0f0f1c] text-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-white">Location</h2>

              <label htmlFor="country" className="block text-sm font-medium text-gray-400 mt-3">
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData?.country}
                onChange={handleChange}
                placeholder="Enter your country"
                className="mt-1 block w-full rounded border border-gray-600 bg-[#0f0f1c] text-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              <label htmlFor="state" className="block text-sm font-medium text-gray-400 mt-3">
                State
              </label>
              <input
                type="text"
                name="state"
                id="state"
                value={formData?.state}
                onChange={handleChange}
                placeholder="Enter your state"
                className="mt-1 block w-full rounded border border-gray-600 bg-[#0f0f1c] text-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              <label htmlFor="city" className="block text-sm font-medium text-gray-400 mt-3">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData?.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="mt-1 block w-full rounded border border-gray-600 bg-[#0f0f1c] text-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              <label htmlFor="address" className="block text-sm font-medium text-gray-400 mt-3">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData?.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="mt-1 block w-full rounded border border-gray-600 bg-[#0f0f1c] text-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              <label htmlFor="postal_code" className="block text-sm font-medium text-gray-400 mt-3">
                Postal Code
              </label>
              <input
                type="text"
                name="postal_code"
                id="postal_code"
                value={formData?.postal_code}
                onChange={handleChange}
                placeholder="Enter your postal code"
                className="mt-1 block w-full rounded border border-gray-600 bg-[#0f0f1c] text-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-white mt-3">Social Media</h2>

              <label htmlFor="website" className="block text-sm font-medium text-gray-400 mt-3">
                Website
              </label>
              <input
                type="text"
                name="website"
                id="website"
                value={formData?.website}
                onChange={handleChange}
                placeholder="Enter your website URL"
                className="mt-1 block w-full rounded border border-gray-600 bg-[#0f0f1c] text-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-400 mt-3">
                LinkedIn
              </label>
              <input
                type="text"
                name="linkedin"
                id="linkedin"
                value={formData?.linkedin}
                onChange={handleChange}
                placeholder="Enter your LinkedIn URL"
                className="mt-1 block w-full rounded border border-gray-600 bg-[#0f0f1c] text-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purpleprimary hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </main>
  );
};

export default EditBusinessProfile;
