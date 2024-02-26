"use client";

import NavBar from "@/components/NavBar";
import BusinessDashboard from "@/components/business/BusinessDashboard";
import UserDashboard from "@/components/individual/dashboard/UserDashboard";
import Loader from "@/components/ui/Loader";
import { UserContext, UserContextType } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";

const Page = () => {
  const { session, user } = useContext(UserContext) as UserContextType;
  const router = useRouter();

  useEffect(() => {
    if (session) {
      if (!session?.data?.session?.user) {
        router.push("/signin");
      }
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
