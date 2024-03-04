"use client";

import NavBar from "@/components/common/NavBar";
import Scheduling from "@/components/individual/interview-scheduling/InterviewScheduling";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await verifyLogin("individual");
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
        <Scheduling />
      </div>
    </>
  );
};

export default Page;
