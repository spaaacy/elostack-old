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
      <div className={`${isMenuOpen ? "block" : "hidden"} lg:hidden absolute top-full right-0 mt-4 bg-[#0f0f1c] text-white py-2 px-4 space-y-2 rounded-md shadow-lg`}>
        {user?.business || pathname === "/business/landing" ? (
          <>
            <Link
              href="/dashboard/create-listing"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded-sm text-sm font-medium"
            >
              Create Listing
            </Link>
            <Link
              href="/dashboard/search-individuals"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded-sm text-sm font-medium"
            >
              Find Candidates
            </Link>
            <Link
              href="/dashboard/request-interview"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded-sm text-sm font-medium"
            >
              Request Interview
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/emailing"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded-sm text-sm font-medium"
            >
              emailing
            </Link>
            <Link
              href="/dashboard/applications"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded-sm text-sm font-medium"
            >
              Applications
            </Link>
            <Link
              href="/dashboard"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded-sm text-sm font-medium"
            >
              Schedule Interview
            </Link>
          </>
        )}
      </div>
      <div className={`hidden lg:flex lg:items-center lg:justify-center lg:flex-grow ${session?.data.session ? "mr-20" : "lg:ml-32"}`}>
  <div className="nav-center space-x-8">
    {user?.business || pathname === "/business/landing" ? (
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
          href="/emailing"
          className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-sm text-base font-medium"
        >
          Emailing
        </Link>
        <Link
          href="/dashboard/plans"
          className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-sm text-base font-medium"
        >
          Plans
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
</div>
      <div className="flex items-center justify-end lg:justify-start">
        <button
          className={`lg:hidden text-white text-2xl focus:outline-none mr-4`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <>&#10005;</> : <>&#9776;</>}
        </button>
        {session?.data.session ? (
          <UserAccountNav />
        ) : (
          <>
            <Link
              href={pathname === "/business/landing" ? "/" : "/business/landing"}
              className="text-gray-300 bg-purpleprimary hover:bg-purple-700 hover:text-white px-2 py-1 lg:px-4 lg:py-2 rounded-sm text-sm lg:text-base font-medium mr-2 lg:mr-4"
            >
              {pathname === "/business/landing" ? "For Individuals" : "For Companies"}
            </Link>
            <Link
              href="/signin"
              className="text-gray-300 bg-purpleprimary hover:bg-purple-700 hover:text-white px-2 py-1 lg:px-4 lg:py-2 rounded-sm text-sm lg:text-base font-medium"
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