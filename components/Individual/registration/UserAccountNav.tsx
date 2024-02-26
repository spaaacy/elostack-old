"use client";

import { UserContext, UserContextType } from "@/context/UserContext";
import { FC, useContext, useState } from "react";

const UserAccountNav = () => {
  const { session, supabase } = useContext(UserContext) as UserContextType;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      window.location.reload(); // Refresh the page to update the session state
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <p className="font-light text-gray-500">{session.data.session.user.email}</p>
        {/* TODO: Fetch profile first for image */}
        <img
          onClick={toggleDropdown}
          src={session.data.image || "/Default_pfp.png"}
          alt="Profile"
          className="cursor-pointer rounded-full w-10 h-10"
        />
      </div>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
          <a
            href={`/individual/${session?.data.session?.user.id}`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile
          </a>
          <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Dashboard
          </a>
          <button
            onClick={handleSignOut}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAccountNav;
