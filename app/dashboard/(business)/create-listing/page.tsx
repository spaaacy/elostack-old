"use client";

import NavBar from "@/components/NavBar";
import JobListing from "@/components/business/job-listing/EditJobListing";
import Loader from "@/components/ui/Loader";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";

const Page = () => {
  const { session, verifyLogin, user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      verifyLogin("business");
      setLoading(false);
    }
  }, [session, user]);

  if (loading) return <Loader />;

  return (
    <>
      <NavBar />
      <div>
        <JobListing />
      </div>
    </>
  );
};

export default Page;
