"use client";
import { useRouter } from "next/navigation";

const EditProfileButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/business/edit-profile"); // replace '/EditProfile' with the actual path to your EditProfile page
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
    >
      Edit Profile
    </button>
  );
};

export default EditProfileButton;
