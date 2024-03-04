"use client";
import React from "react";
import NavBar from "@/components/common/NavBar";
import Profile from "@/components/business/profile/profile";

const Page = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-1">
        <Profile />
      </div>
    </>
  );
};

export default Page;
