"use client";

import Link from "next/link";
import UserAccountNav from "./Individual/registration/UserAccountNav";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <nav className="px-10 py-4 flex justify-between items-center">
      <Link href={"/"} className="text-3xl font-bold font-roboto text-blueprimary">
        EloStack
      </Link>
      {session?.user ? (
        <UserAccountNav />
      ) : (
        <Link href="/SignIn">
          <span className="rounded-lg bg-gray-700 hover:bg-blueprimary text-white px-4 py-2">Sign in</span>
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
