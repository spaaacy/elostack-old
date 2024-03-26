"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import UserAccountNav from "./UserAccountNav";
import Image from "next/image";
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const { session } = useContext(UserContext);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navBarVisible, setNavBarVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState();
  const pathname = usePathname();

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

  useEffect(() => {
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

    if (session) {
      fetchUser();
    }
  }, [session]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-2 lg:px-[9rem] py-4 flex justify-between items-center bg-[#0f0f1c] text-white transition-transform duration-300 ${
        navBarVisible ? "" : "-translate-y-full"
      }`}
    >
      <Link href="/" className="text-[1.5rem] font-bold text-white transition-colors hover:text-gray-300">
        <div className="flex items-center">
          <Image src="/logo1.png" alt="logo" width={50} height={50} />
          <div className="ml-2">EloStack</div>
        </div>
      </Link>
      <div className={`hidden lg:flex justify-center space-x-8 ${session?.data.session ? "mr-10" : ""}`}>
        {user?.business ? (
          <>
            <Link
              href="/dashboard/create-listing"
              className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-sm text-base font-medium"
            >
              Create Listing
            </Link>
            <Link
              href="/dashboard/search-individuals"
              className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-sm text-base font-medium"
            >
              Find Candidates
            </Link>
            <Link
              href="/dashboard/request-interview"
              className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-sm text-base font-medium"
            >
              Request Interview
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/job-listing"
              className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-sm text-base font-medium"
            >
              Job Listings
            </Link>
            <Link
              href="/dashboard/applications"
              className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-sm text-base font-medium"
            >
              Applications
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-sm text-base font-medium"
            >
              Schedule Interview
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center">
        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {/* Hamburger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {session?.data.session ? (
          <UserAccountNav />
        ) : (
          <>
            <Link
              href={pathname === "/business/landing" ? "/" : "/business/landing"}
              className="text-gray-300 bg-purpleprimary hover:bg-purple-700 hover:text-white px-4 py-2 rounded-sm text-base font-medium mr-4"
            >
              {pathname === "/business/landing" ? "For Individuals" : "For Companies"}
            </Link>
            <Link
              href="/signin"
              className="text-gray-300 bg-purpleprimary hover:bg-purple-700 hover:text-white px-4 py-2 rounded-sm text-base font-medium"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;