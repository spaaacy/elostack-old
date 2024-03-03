"use client";
import React from "react";
import NavBar from "@/components/common/NavBar";
import Profile from "@/components/business/profile/profile";
import { BrowserRouter as Router } from "react-router-dom";

const Page = () => {
  return (
    <>
      <Router>
        <NavBar />
        <div>
          <Profile />
        </div>
      </Router>
    </>
  );
};

export default Page;
