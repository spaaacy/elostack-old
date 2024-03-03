"use client";

import NavBar from "@/components/common/NavBar";
import BusinessDashboard from "@/components/business/dashboard/dashboard";
import UserDashboard from "@/components/individual/dashboard/UserDashboard";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [user, setUser] = useState();

  useEffect(() => {
    if (session) {
      verifyLogin();
      fetchUser();
    }
  }, [session]);

  const fetchUser = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const { user } = await response.json();
        setUser(user);
      }
    }
  };

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
