import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const PopupBox = ({ setIsOpen }) => {
  const router = useRouter();

  const closePopup = () => {
    setIsOpen(false);
    router.push("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-gray-800 w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-purple-400">Email Campaign Update</h2>
        <p className="text-white mb-6">
          Thank you for setting up your email campaign! We will send you an email in a couple of hours to setup your
          Gmail account.
        </p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none"
            onClick={closePopup}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupBox;
