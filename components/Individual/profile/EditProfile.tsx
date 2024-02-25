"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { UserContext, UserContextType } from "@/context/UserContext";
import Loader from "@/components/ui/Loader";

interface FormData {
  firstName: string;
  lastName: string;
  pronouns: string;
  customPronouns?: string;
  birthday: string;
  phoneNumber: string;
  phoneType: string;
  address: string;
  country: string;
  postalCode: string;
  city: string;
  resume: File | null;
  coverLetter: File | null;
  portfolio: string;
  linkedin: string;
  github: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  pronouns: "",
  customPronouns: "",
  birthday: "",
  phoneNumber: "",
  phoneType: "",
  address: "",
  country: "",
  postalCode: "",
  city: "",
  resume: null,
  coverLetter: null,
  portfolio: "",
  linkedin: "",
  github: "",
};

const EditProfile = () => {
  const { session, fetchProfileData } = React.useContext(UserContext) as UserContextType;

  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loadingData, setLoadingData] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Fetch profile data only if the session is not in a loading state
    if (session) {
      fetchUser();
    }
  }, [session]);

  const fetchUser = async () => {
    const userId = session?.data.session?.user.id;
    const data = await fetchProfileData(userId);
    if (data) {
      setFormData(data);
      setLoadingData(false);
    } else {
      router.push("/signin");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = session?.data.session?.user.id;

    // Check for a valid session and user ID before proceeding
    if (userId) {
      try {
        await fetch("/api/user/edit-profile", {
          method: "POST",
          body: JSON.stringify({
            ...formData,
            user_id: userId,
          }),
        });

        // Handle successful profile update, e.g., redirecting the user or showing a success message
        console.log("Profile updated successfully");
        router.push(`/profile/${userId}`);
      } catch (error) {
        console.error("Error updating profile:", error.message);
      }
    } else {
      if (session) {
        // Check first if session is undefined
        console.log("Session not loaded or user ID undefined");
        router.push("/signin");
      }
    }
  };

  if (loadingData) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6 w-full lg:w-3/4 xl:w-1/2 mx-auto">
        <div className="max-w-4xl mx-auto p-5">
          <h1 className="text-2xl font-semibold mb-6">Edit Your Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pronouns" className="block text-sm font-medium text-gray-700">
                Pronouns
              </label>
              <select
                name="pronouns"
                id="pronouns"
                value={formData.pronouns}
                onChange={handleChange}
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="Please select">Please select</option>
                <option value="he/him">he/him</option>
                <option value="she/her">she/her</option>
                <option value="custom">custom</option>
              </select>
              {formData.pronouns === "custom" && (
                <div className="mt-4">
                  <label htmlFor="customPronouns" className="block text-sm font-medium text-gray-700">
                    Enter custom pronouns
                  </label>
                  <input
                    type="text"
                    name="customPronouns"
                    id="customPronouns"
                    value={formData.customPronouns}
                    onChange={handleChange}
                    placeholder="Enter custom pronouns"
                    className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                Birthday
              </label>
              <input
                type="date"
                name="birthday"
                id="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="text-xl font-semibold mb-6">Contact Information</div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <label htmlFor="phoneType" className="block text-sm font-medium text-gray-700 mt-4">
                Phone Type
              </label>
              <select
                name="phoneType"
                id="phoneType"
                value={formData.phoneType}
                onChange={handleChange}
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Please select</option>
                <option value="mobile">Mobile</option>
                <option value="work">Work</option>
                <option value="home">Home</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your Address"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="text-xl font-semibold mb-6">Location</div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country/Region<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Ex: United States"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Enter your postal code"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your City"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="text-xl font-semibold mb-6">Professional Information</div>
            <div className="mb-4">
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                Upload Resume<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="resume"
                id="resume"
                onChange={handleChange}
                accept=".pdf"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                Upload Cover Letter<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="coverLetter"
                id="coverLetter"
                onChange={handleChange}
                accept=".pdf"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="text-xl font-semibold mb-6">Online Presence</div>
            <div className="mb-4">
              <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
                Portfolio URL
              </label>
              <input
                type="url"
                name="portfolio"
                id="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="Enter your portfolio URL"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="Enter your LinkedIn URL"
                className="mt-1 mb-4 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                GitHub URL
              </label>
              <input
                type="url"
                name="github"
                id="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="Enter your GitHub URL"
                className="mt-1 mb-4 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default EditProfile;
