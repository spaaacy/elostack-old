"use client";

import NavBar from "@/components/NavBar";
import BusinessDashboard from "@/components/business/dashboard/dashboard";
import UserDashboard from "@/components/individual/dashboard/UserDashboard";
import Loader from "@/components/ui/Loader";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";

const Page = () => {
  const { session, user, verifyLogin } = useContext(UserContext);

  useEffect(() => {
    if (session) {
      verifyLogin();
    }
  }, [session]);

  return (
    <main className="flex flex-1 flex-col">
      <NavBar />
      {user ? (
        <main className="flex flex-1">{user.business ? <BusinessDashboard /> : <UserDashboard />}</main>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Page;
