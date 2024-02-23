"use client";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const UserAccountNav = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.reload(); // Refresh the page to update the session state
  };

  return (
    <div className="relative">
      {session ? (
        // User is signed in
        <>
          <img
            onClick={toggleDropdown}
            src={session.user.image || "/Default_pfp.png"}
            alt="Profile"
            className="cursor-pointer rounded-full w-10 h-10"
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
              <a
                href="/profile"
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
                onClick={handleSignOut}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Sign Out
              </button>
            </div>
          )}
        </>
      ) : (
        // User is not signed in
        <button
          onClick={() => signIn()}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default UserAccountNav;