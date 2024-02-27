"use client";

import { useRouter } from "next/navigation"; // Correct import path for useRouter
import UserAccountNav from "./Individual/registration/UserAccountNav";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "@/context/UserContext";
import Link from "next/link";

const NavBar = () => {
  const { session } = useContext(UserContext) as UserContextType;
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navBarVisible, setNavBarVisible] = useState(true);

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
      className={`fixed top-0 left-0 w-full z-50 px-[300px] py-4 flex justify-between items-center bg-white shadow-md transition-transform duration-300 ${
        navBarVisible ? "" : "-translate-y-full"
      }`}
    >
      <Link href={"/"} className="text-3xl font-bold text-blueprimary hover:text-blue-700 transition-colors">
        EloStack
      </Link>
      {/* Conditional margin for buttons */}
      <div className={`flex-grow flex justify-center items-center ${session?.data.session ? "mr-[2.5rem]" : ""}`}>
        <div className="flex space-x-4">
          <Link
            href={"/dashboard/applications"}
            className="px-4 py-2 rounded-sm text-gray-800 hover:bg-gray-200 transition-colors"
          >
            Applications
          </Link>

          <Link
            href={"/dashboard/apply"}
            className="px-4 py-2 rounded-sm text-gray-800 hover:bg-gray-200 transition-colors"
          >
            Job Listings
          </Link>
          <Link
            href={"/dashboard/about"}
            className="px-4 py-2 rounded-sm text-gray-800 hover:bg-gray-200 transition-colors"
          >
            About
          </Link>
        </div>
      </div>

      {session?.data.session ? (
        <UserAccountNav />
      ) : (
        <Link
          href={"/signin"}
          className="rounded-lg bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 transition-colors"
        >
          Sign in
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
