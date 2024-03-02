"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BusinessProfileForm = () => {
  const router = useRouter();

  const initialFormData = {
    business_name: "",
    business_type: "",
    industry: "",
    phone_number: "",
    address: "",
    country: "",
    postal_code: "",
    city: "",
    website: "",
    linkedin: "",
    description: "",
    company_size: "",
    year_founded: "",
    logo: null,
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6 w-full lg:w-3/4 xl:w-1/2 mx-auto">
        <div className="max-w-4xl mx-auto p-5">
          <h1 className="text-2xl font-semibold mb-6">
            Edit Your Company Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="company_name"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company_name"
                id="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Enter your company name"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-gray-700"
              >
                Industry<span className="text-red-500">*</span>
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
            </div>
            <div className="mb-4">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700"
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
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="postal_code"
                className="block text-sm font-medium text-gray-700"
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
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
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
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Company Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a brief description of your company"
                className="mt-1 block w-full rounded border border-gray-300 bg-white px-5 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="company_size"
                className="block text-sm font-medium text-gray-700"
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
            </div>
            <div className="mb-4">
              <label
                htmlFor="year_founded"
                className="block text-sm font-medium text-gray-700"
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
            </div>
            <div className="mb-4">
              <label
                htmlFor="logo"
                className="block text-sm font-medium text-gray-700"
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

export default BusinessProfileForm;
