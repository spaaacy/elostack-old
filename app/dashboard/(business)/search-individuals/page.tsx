"use client";

import NavBar from "@/components/NavBar";
import Search from "@/components/business/search/CandidateSearch";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
import Loader from "@/components/ui/Loader";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      verifyLogin("business");
      setLoading(false);
    }
  }, [session]);
  if (loading) return <Loader />;

  return (
    <>
      <NavBar />
      <div>
        <Search />
      </div>
    </>
  );
};

export default Page;
