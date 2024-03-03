"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BusinessProfileForm = () => {
  const router = useRouter();

  const initialFormData = {
    company_name: "",
    industry: "",
    logo: null,
    phone_number: "",
    company_size: "",
    year_founded: "",
    linkedin: "",
    twitter: "",
    instagram: "", // added
    website: "", // added
    country: "", // added
    city_address: "", // added
    postal_code: "", // added
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    if (e.target.name === "logo") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/business/edit-profile", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      console.log("Profile updated successfully");
      router.push(`/business`);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 h-[100rem] bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-full lg:w-1/2 xl:w-[55rem] mx-auto">
        <div className="max-w-4xl mx-auto p-5">
          <h1 className="text-3xl font-bold mb-6 text-blueprimary flex items-center justify-center">
            Edit Your Company Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-blueprimary">
                Company Information
              </h2>
              <label
                htmlFor="company_name"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                id="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Enter your company name"
                className="mt-1 block w-full rounded border  border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                Industry
              </label>
              <input
                type="text"
                name="industry"
                id="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Enter your industry"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <label
                htmlFor="logo"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                Company Logo
              </label>
              <input
                type="file"
                name="logo"
                id="logo"
                onChange={handleChange}
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <label
                htmlFor="company_size"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                Company Size
              </label>
              <input
                type="text"
                name="company_size"
                id="company_size"
                value={formData.company_size}
                onChange={handleChange}
                placeholder="Enter your company size"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <label
                htmlFor="year_founded"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                Year Founded
              </label>
              <input
                type="number"
                name="year_founded"
                id="year_founded"
                value={formData.year_founded}
                onChange={handleChange}
                placeholder="Enter the year your company was founded"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                Website
              </label>
              <input
                type="url"
                name="website"
                id="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Enter your website URL"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-blueprimary">
                Location
              </h2>

              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your country"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <label
                htmlFor="postal_code"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                Postal Code
              </label>
              <input
                type="text"
                name="postal_code"
                id="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                placeholder="Enter your postal code"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-blueprimary mt-3">
                Social Media
              </h2>
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700"
              >
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="Enter your LinkedIn URL"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <label
                htmlFor="twitter"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                Twitter
              </label>
              <input
                type="url"
                name="twitter"
                id="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="Enter your Twitter URL"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <label
                htmlFor="instagram"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                Instagram
              </label>
              <input
                type="url"
                name="instagram"
                id="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="Enter your Instagram URL"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <label
                htmlFor="facebook"
                className="block text-sm font-medium text-gray-700 mt-3"
              >
                Facebook
              </label>
              <input
                type="url"
                name="facebook"
                id="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="Enter your Facebook URL"
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

export default BusinessProfileForm;
