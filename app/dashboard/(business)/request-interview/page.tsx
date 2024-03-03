"use client";

import NavBar from "@/components/common/NavBar";
import RequestInterview from "@/components/business/request-interview/RequestInterview";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
const Page = () => {
  const [loading, setLoading] = useState(true);
  const { session, verifyLogin } = useContext(UserContext);

  useEffect(() => {
    const loadData = async () => {
      await verifyLogin("business");
      await setLoading(false);
    };

    if (session) {
      loadData();
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
