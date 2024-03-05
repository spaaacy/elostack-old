"use client";

import NavBar from "@/components/common/NavBar";
import Listings from "@/components/business/view-listings/ViewListings";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
import Loader from "@/components/common/Loader";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const success = await verifyLogin("business");
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
        <Listings />
      </div>
    </>
  );
};

export default Page;
