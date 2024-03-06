"use client";

import { UserContext } from "@/context/UserContext";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect, useRef } from "react";

const UserAccountNav = () => {
  const { session } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState();
  const dropdownRef = useRef(null);
  const router = useRouter();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSignOut = async () => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
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
    if (session) {
      fetchUser();
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const fetchUser = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const { user } = await response.json();
        setUser(user);
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-4">
        <img
          onClick={toggleDropdown}
          src={session.data.image || "/default_profile.png"}
          alt="Profile"
          className="cursor-pointer rounded-full w-10 h-10 transition-transform duration-200 ease-in-out transform hover:scale-105"
        />
      </div>
      <div
        className={`absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 border border-gray-100 ${
          dropdownOpen ? "animate-fadeIn" : "animate-fadeOut"
        }`}
        style={{ display: dropdownOpen ? "block" : "none" }}
      >
        <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Dashboard
        </Link>
        {user && (
          <Link
            href={
              user?.business
                ? `/business/${session?.data.session?.user.id}`
                : `/individual/${session?.data.session?.user.id}`
            }
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile
          </Link>
        )}
        {user && !user?.business && (
          <Link
            href={`/individual/${session?.data.session?.user.id}/interview`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            My Interview
          </Link>
        )}
        {/* {user && user?.business && (
          <Link href={"/plans"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Plans
          </Link>
        )} */}
        <hr className="my-1 border-gray-200" />
        <button
          onClick={handleSignOut}
          className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left"
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
