"use client";

import NavBar from "@/components/common/NavBar";
import Applications from "@/components/individual/applications/TrackApplications";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const success = await verifyLogin("individual");
      if (success) {
        await setLoading(false);
      }
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
        <Applications />
      </div>
    </>
  );
};

export default Page;
