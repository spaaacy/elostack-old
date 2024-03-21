"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Loader from "@/components/common/Loader";

const EditIndividualProfile = () => {
  const { session } = useContext(UserContext);

  const router = useRouter();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(true);

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
        await fetch("/api/individual/edit-profile", {
          method: "POST",
          body: JSON.stringify({
            ...formData,
            user_id: userId,
          }),
        });

        // Handle successful profile update, e.g., redirecting the user or showing a success message
        console.log("Profile updated successfully");
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

  // function handleFileChange(e) {
  //   const file = e.target.files[0];
  //   // Update your state with the selected file
  //   setProfilePicture(file);
  // }

  if (loading) {
    return <Loader />;
  }

  return (
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
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
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
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Please select">Please select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
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
                value={formData.birthday}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="text-xl font-semibold mb-6 text-white">About</div>
            <div className="mb-4">
              <textarea
                name="about_me"
                id="about_me"
                value={formData.about_me}
                onChange={handleChange}
                rows={10}
                placeholder="Describe yourself here..."
                className="resize-none w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <label htmlFor="phone_type" className="block text-white mt-4">
                Phone Type
              </label>
              <select
                name="phone_type"
                id="phone_type"
                value={formData.phone_type}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                Country<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Ex: United States"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
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
                value={formData.state}
                onChange={handleChange}
                placeholder="Ex: FL"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your City"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your Address"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                value={formData.postal_code}
                onChange={handleChange}
                placeholder="Enter your postal code"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="Enter your portfolio URL"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="Enter your LinkedIn URL"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                value={formData.github}
                onChange={handleChange}
                placeholder="Enter your GitHub URL"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
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