"use client";

import NavBar from "@/components/NavBar";
import Applications from "@/components/individual/applications/TrackApplications";
import Loader from "@/components/ui/Loader";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      verifyLogin("individual");
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
        <Applications />
      </div>
    </>
  );
};

export default Page;
