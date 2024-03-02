"use client";

import Admin from "@/components/admin/admin";
import Loader from "@/components/common/Loader";
import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      verifyLogin("admin");
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
    <>
      <NavBar />
      <div>
        <Admin />
      </div>
    </>
  );
};

export default Page;
