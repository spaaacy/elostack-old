"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import UserAccountNav from "./UserAccountNav";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { session } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = session?.data?.session?.user.id;
      if (userId) {
        const response = await fetch(`/api/user/${userId}`, {
          headers: {
            "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
          },
          method: "GET",
        });
        if (response.status === 200) {
          const { user } = await response.json();
          setUser(user);
        } else {
          router.push("/signup?google_oauth=true");
        }
      }
    };

    if (session) {
      fetchUser();
    }
  }, [session]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-2 lg:px-[9rem] py-4 flex justify-between items-center bg-[#0f0f1c] text-white transition-transform duration-300 ${
        isVisible ? "" : "-translate-y-full"
      }`}
    >
      <Link href="/" className="text-[1.5rem] font-bold text-white transition-colors hover:text-gray-300">
        <div className="flex items-center">
          <Image src="/logo1.png" alt="logo" width={50} height={50} />
          <div className="ml-2">EloStack</div>
        </div>
      </Link>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:hidden absolute top-full right-0 mt-4 bg-[#0f0f1c] text-white py-2 px-4 space-y-2 rounded-md shadow-lg`}
      >
        <Link
          href="/emailing"
          className="block text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded-sm text-sm font-medium"
        >
          Emailing
        </Link>
        <Link
          href="/applications"
          className="block text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded-sm text-sm font-medium"
        >
          Applications
        </Link>
        <Link
          href="/applications"
          className="block text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded-sm text-sm font-medium"
        >
          Applications
        </Link>
      </div>
      <div className={`hidden lg:flex lg:items-center lg:justify-center lg:flex-grow gap-8`}>
        <Link
          href="/emailing"
          className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-sm text-base font-medium"
        >
          Emailing
        </Link>
        <Link
          href="/plans"
          className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-sm text-base font-medium"
        >
          Plans
        </Link>
        <Link
          href="/applications"
          className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-sm text-base font-medium"
        >
          Applications
        </Link>
      </div>
      <div className="flex items-center justify-end lg:justify-start">
        <button
          className={`lg:hidden text-white text-2xl focus:outline-none mr-4`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <>&#10005;</> : <>&#9776;</>}
        </button>
        {session?.data.session ? (
          <div className="flex justify-center items-center">
            {user && (
              <p className="mr-4 text-sm font-semibold">
                {user.credits > 0 ? `Credits: ${user.credits}` : "Free Tier"}
              </p>
            )}
            <UserAccountNav user={user} />
          </div>
        ) : (
          <Link
            href="/signin"
            className="text-gray-300 bg-purpleprimary hover:bg-purple-700 hover:text-white px-2 py-1 lg:px-4 lg:py-2 rounded-sm text-sm lg:text-base font-medium"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
