"use client";

import { UserContext } from "@/context/UserContext";
import { supabase } from "@/utils/supabase";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect, useRef } from "react";

const UserAccountNav = ({ user }) => {
  const { session } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      location.reload(); // Refresh the page to update the session state
      router.push("/"); // Refresh the page to update the session state
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="relative bg-gray-900 text-white" ref={dropdownRef}>
      <div className="flex items-center gap-4">
        <img
          onClick={toggleDropdown}
          src={session.data.image || "/default_profile.png"}
          alt="Profile"
          className="cursor-pointer rounded-full w-10 h-10 transition-transform duration-200 ease-in-out transform hover:scale-105"
        />
      </div>
      <div
        className={`absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-md shadow-xl z-20 border border-gray-700 ${
          dropdownOpen ? "animate-fadeIn" : "animate-fadeOut"
        }`}
        style={{ display: dropdownOpen ? "block" : "none" }}
      >
        {user ? (
          <Link
            href={`/individual/${session?.data.session?.user.id}`}
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Profile
          </Link>
        ) : (
          <Link
            href="/signup?complete-registration=true"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Finish signing up
          </Link>
        )}
        <hr className="my-1 border-gray-700" />
        <button
          onClick={handleSignOut}
          className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-700 w-full text-left"
        >
          Sign Out
        </button>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-fadeOut {
          animation: fadeOut 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UserAccountNav;
