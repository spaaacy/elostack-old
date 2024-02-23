"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const UserAccountNav = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="relative">
      {session && (
        <>
          <img
            onClick={toggleDropdown}
            src={session.user.image || "/Default_pfp.png"} // Placeholder for default profile picture
            alt="Profile"
            className="cursor-pointer rounded-full w-10 h-10"
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
              <a
                href="/account"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Account
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <button
                onClick={() =>
                  signOut({ redirect: true, callbackUrl: "/SignIn" })
                }
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Sign Out
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserAccountNav;
