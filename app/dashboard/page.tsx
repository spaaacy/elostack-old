"use client";

import NavBar from "@/components/NavBar";
import BusinessDashboard from "@/components/business/BusinessDashboard";
import UserDashboard from "@/components/individual/dashboard/UserDashboard";
import { useState } from "react";
const Page = async () => {
  const [isBusiness, setIsBusiness] = useState(true);

  return (
    <main className="flex flex-1 flex-col">
      <NavBar />
      <main className="flex flex-1">{isBusiness ? <BusinessDashboard /> : <UserDashboard />}</main>
    </main>
  );
};

export default Page;
