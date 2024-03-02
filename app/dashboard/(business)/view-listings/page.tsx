"use client";

import NavBar from "@/components/NavBar";
import Listings from "@/components/business/view-listings/ViewListings";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
import Loader from "@/components/ui/Loader";

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
        <Listings />
      </div>
    </>
  );
};

export default Page;
