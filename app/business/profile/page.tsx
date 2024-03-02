"use client";
import React from "react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Profile from "@/components/business/profile/profile";
import { BrowserRouter as Router, Link } from "react-router-dom";
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