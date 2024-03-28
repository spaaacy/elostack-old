"use client";

import NavBar from "@/components/common/NavBar";
import BusinessDashboard from "@/components/business/BusinessDashboard";
import IndividualDashboard from "@/components/individual/IndividualDashboard";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const success = await verifyLogin();
      if (success) {
        await fetchUser();
      }
    };

    if (session) {
      loadData();
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
      } else {
        router.push("/signup?complete-registration=true");
      }
    }
  };

  return (
    <main className="flex flex-1 flex-col">
      <NavBar />
      {user ? (
        <div className="flex flex-1">{user.business ? <BusinessDashboard /> : <IndividualDashboard />}</div>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Page;
