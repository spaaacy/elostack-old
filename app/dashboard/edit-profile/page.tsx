"use client";

import EditProfile from "@/components/Individual/profile/EditProfile";
import NavBar from "@/components/common/NavBar";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
const Accounts = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      verifyLogin();
      setLoading(false);
    }
  }, [session]);

  if (loading)
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );

  return (
    <main>
      <NavBar />
      <div className="flex h-screen">
        <EditProfile />
      </div>
    </main>
  );
};

export default Accounts;
