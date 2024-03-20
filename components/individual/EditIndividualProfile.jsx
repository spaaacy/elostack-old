"use client";
import { useContext, useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Loader from "@/components/common/Loader";
import { createClient } from "@supabase/supabase-js";

const EditIndividualProfile = () => {
  const { session } = useContext(UserContext);

  const router = useRouter();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Fetch profile data only if the session is not in a loading state
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
        setFormData(result.individual);
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

    // Check for a valid session and user ID before proceeding
    if (userId) {
      try {
        const fetchFormData = new FormData();
        if (profilePicture) fetchFormData.append("profile_picture", profilePicture);
        fetchFormData.append("profile_data", JSON.stringify({ ...formData, user_id: userId }));
        await fetch("/api/individual/edit-profile", {
          method: "POST",
          headers: {
            "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
          },
          body: fetchFormData,
        });

        router.push(`/individual/${userId}`);
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

  function handleFileChange(e) {
    const file = e.target.files[0];
    // Update your state with the selected file
    setProfilePicture(file);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')] w-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-60 mt-10">
        <div className="bg-white shadow rounded-lg p-6 w-full lg:w-3/4 xl:w-3/5 mx-auto">
          <h1 className="text-4xl font-semibold mb-6 flex justify-center text-blueprimary">Edit Your Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-xl font-semibold mb-6">User Information</div>
            <div className="mb-4">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="mt-1 block w-full rounded border border-gray-300 bg-white p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                name="profile_picture"
                id="profile_picture"
                onChange={handleFileChange}
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                defaultValue="male"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="Please select">Please select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
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
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="text-xl font-semibold mb-6">About </div>
            <div className="mb-4">
              <textarea
                name="about_me"
                id="about_me"
                value={formData.about_me}
                onChange={handleChange}
                rows={10}
                placeholder="Describe yourself here..."
                className="resize-none mt-1 block w-full rounded border border-gray-300 bg-white p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="text-xl font-semibold mb-6">Contact Information</div>

            <div className="mb-4">
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <label htmlFor="phone_type" className="block text-sm font-medium text-gray-700 mt-4">
                Phone Type
              </label>
              <select
                name="phone_type"
                id="phone_type"
                value={formData.phone_type}
                onChange={handleChange}
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Please select</option>
                <option value="mobile">Mobile</option>
                <option value="work">Work</option>
                <option value="home">Home</option>
              </select>
            </div>
            <div className="text-xl font-semibold mb-6">Location</div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Ex: United States"
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Ex: FL"
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
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
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                name="postal_code"
                id="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                placeholder="Enter your postal code"
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {/* 
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
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700">
                Upload Cover Letter<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="cover_letter"
                id="cover_letter"
                onChange={handleChange}
                accept=".pdf"
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div> */}

            <div className="text-xl font-semibold mb-6">Online Presence</div>
            <div className="mb-4">
              <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
                Portfolio URL
              </label>
              <input
                type="text"
                name="portfolio"
                id="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="Enter your portfolio URL"
                className="mt-1 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                LinkedIn URL
              </label>
              <input
                type="text"
                name="linkedin"
                id="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="Enter your LinkedIn URL"
                className="mt-1 mb-4 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                GitHub URL
              </label>
              <input
                type="text"
                name="github"
                id="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="Enter your GitHub URL"
                className="mt-1 mb-4 block w-full rounded border border-gray-300 bg-white  p-2 shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex justify-center p-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default EditIndividualProfile;
