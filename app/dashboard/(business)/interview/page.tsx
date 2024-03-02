"use client";

import NavBar from "@/components/NavBar";
import RequestInterview from "@/components/business/request-interview/RequestInterview";
import Loader from "@/components/ui/Loader";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
const Page = () => {
  const [loading, setLoading] = useState(true);
  const { session, verifyLogin } = useContext(UserContext);

  useEffect(() => {
    if (session) {
      verifyLogin("business");
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
        <RequestInterview />
      </div>
    </>
  );
};

export default Page;
