"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Loader from "@/components/common/Loader";

const EditBusinessProfile = () => {
  const { session } = useContext(UserContext);
  const [formData, setFormData] = useState();
  const [loadingData, setLoadingData] = useState(true);
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

  const fetchBusinessDetails = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/business/${userId}`);
      const result = await response.json();
      console.log({ result, response });
      if (response.status === 200) {
        setFormData(result.business);
        setLoadingData(false);
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
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error updating profile:", error.message);
      }
    }
  };

  if (loadingData) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-100 h-[100rem] bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-full lg:w-1/2 xl:w-[55rem] mx-auto">
        <div className="max-w-4xl mx-auto p-5">
          <h1 className="text-3xl font-bold mb-6 text-blueprimary flex items-center justify-center">
            Edit Your Company Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-blueprimary">Company Information</h2>

              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mt-3">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData?.name}
                onChange={handleChange}
                placeholder="Enter your company name"
                className="mt-1 block w-full rounded border  border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mt-3">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                id="industry"
                value={formData?.industry}
                onChange={handleChange}
                placeholder="Enter your industry"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mt-3">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData?.description}
                onChange={handleChange}
                rows={5}
                placeholder="Enter your description"
                className="resize-none mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-blueprimary">Location</h2>

              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mt-3">
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData?.country}
                onChange={handleChange}
                placeholder="Enter your country"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mt-3">
                State
              </label>
              <input
                type="text"
                name="state"
                id="state"
                value={formData?.state}
                onChange={handleChange}
                placeholder="Enter your state"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mt-3">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData?.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mt-3">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData?.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mt-3">
                Postal Code
              </label>
              <input
                type="text"
                name="postal_code"
                id="postal_code"
                value={formData?.postal_code}
                onChange={handleChange}
                placeholder="Enter your postal code"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-blueprimary mt-3">Social Media</h2>

              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mt-3">
                Website
              </label>
              <input
                type="url"
                name="website"
                id="website"
                value={formData?.website}
                onChange={handleChange}
                placeholder="Enter your website URL"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mt-3">
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                value={formData?.linkedin}
                onChange={handleChange}
                placeholder="Enter your LinkedIn URL"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blueprimary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessProfile;
