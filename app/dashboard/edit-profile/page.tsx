"use client";

import EditProfile from "@/components/Individual/profile/EditProfile";
import NavBar from "@/components/NavBar";
import Loader from "@/components/ui/Loader";
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

  if (loading) return <Loader />;

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
