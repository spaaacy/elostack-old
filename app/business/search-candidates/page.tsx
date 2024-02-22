"use client";

import NavBar from "@/components/NavBar";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("id");

  useEffect(() => {
    // Fetch listing data and candidates
  });

  return (
    <main>
      <NavBar />
      Search candidates
    </main>
  );
};

export default page;
