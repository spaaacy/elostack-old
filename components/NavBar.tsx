"use client";

import { useRouter } from "next/navigation"; // Correct import path for useRouter
import UserAccountNav from "./Individual/registration/UserAccountNav";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "@/context/UserContext";

const NavBar = () => {
  const { session } = useContext(UserContext) as UserContextType;
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navBarVisible, setNavBarVisible] = useState(true);

  const navigate = (path) => () => {
    router.push(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setNavBarVisible(false); // Hide NavBar on scroll down
      } else {
        setNavBarVisible(true); // Show NavBar on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-10 py-4 flex justify-between items-center bg-white shadow-md transition-transform duration-300 ${
        navBarVisible ? "" : "-translate-y-full"
      }`}
    >
      <button
        onClick={navigate("/")}
        className="text-3xl font-bold text-blueprimary hover:text-blue-700 transition-colors"
      >
        EloStack
      </button>
      {/* Conditional margin for buttons */}
      <div
        className={`flex-grow flex justify-center items-center ${
          session?.data.session ? "mr-[2.5rem]" : ""
        }`}
      >
        <div className="flex space-x-4">
          <button
            onClick={navigate("/dashboard/applications")}
            className="px-4 py-2 rounded-lg text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Applications
          </button>

          <button
            onClick={navigate("/dashboard/apply")}
            className="px-4 py-2 rounded-lg text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Job Listings
          </button>

          <button
            onClick={navigate("/dashboard/schedule-interview")}
            className="px-4 py-2 rounded-lg text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Schedule Interviews
          </button>
        </div>
      </div>

      {session?.data.session ? (
        <UserAccountNav />
      ) : (
        <button
          onClick={navigate("/signin")}
          className="rounded-lg bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 transition-colors"
        >
          Sign in
        </button>
      )}
    </nav>
  );
};

export default NavBar;
