"use client";

import Link from "next/link";
import UserAccountNav from "./Individual/registration/UserAccountNav";
import React from "react";
import { UserContext, UserContextType } from "@/context/UserContext";

const NavBar = () => {
  const { session } = React.useContext(UserContext) as UserContextType;

  return (
    <nav className="px-10 py-4 flex justify-between items-center">
      <Link href={"/"} className="text-3xl font-bold font-roboto text-blueprimary">
        EloStack
      </Link>
      {session?.data.session ? (
        <UserAccountNav />
      ) : (
        <Link href="/signin">
          <span className="rounded-lg bg-gray-700 hover:bg-blueprimary text-white px-4 py-2">Sign in</span>
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
