"use client";

import NavBar from "@/components/common/NavBar";
import JobListing from "@/components/business/job-listing/EditJobListing";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

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
        <JobListing />
      </div>
    </>
  );
};

export default Page;
