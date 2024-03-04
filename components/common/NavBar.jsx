"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect } from "react";
import UserAccountNav from "./UserAccountNav";

const NavBar = () => {
  const { session } = useContext(UserContext);
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navBarVisible, setNavBarVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setNavBarVisible(false);
      } else {
        setNavBarVisible(true);
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
      className={`fixed top-0 left-0 w-full z-50 px-4 lg:px-[300px] py-4 flex justify-between items-center bg-white shadow-md transition-transform duration-300 ${
        navBarVisible ? "" : "-translate-y-full"
      }`}
    >
      <Link href={"/"} className="text-3xl font-bold text-blueprimary hover:text-blue-700 transition-colors">
        EloStack
      </Link>
      <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {/* Hamburger icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div
        className={`${isMenuOpen ? "block" : "hidden"} lg:flex-grow lg:flex lg:justify-center lg:items-center ${
          session?.data.session ? "lg:mr-[2.5rem]" : ""
        }`}
      >
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <Link href={"/plans"} className="px-4 py-2 rounded-sm text-gray-800 hover:bg-gray-200 transition-colors">
            Plans
          </Link>
          <Link
            href={"/job-listing"}
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
