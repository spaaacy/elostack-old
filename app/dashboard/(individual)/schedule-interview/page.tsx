"use client";

import NavBar from "@/components/NavBar";
import Scheduling from "@/components/individual/interview-scheduling/InterviewScheduling";
import Loader from "@/components/ui/Loader";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";

const Page = () => {
  const { session, verifyLogin, user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      verifyLogin("individual");
      setLoading(false);
    }
  }, [session, user]);

  if (loading) return <Loader />;

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
