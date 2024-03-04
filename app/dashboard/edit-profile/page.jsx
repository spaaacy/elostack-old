"use client";

import EditIndividualProfile from "@/components/individual/profile/EditIndividualProfile";
import NavBar from "@/components/common/NavBar";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import EditBusinessProfile from "@/components/business/profile/EditBusinessProfile";
const Accounts = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const loadData = async () => {
      await verifyLogin();
      await fetchUser();
      setLoading(false);
    };

    if (session) {
      loadData();
    }
  }, [session]);

  const fetchUser = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const { user } = await response.json();
        setUser(user);
      }
    }
  };

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
      <div className="flex flex-1">
        {user ? user.business ? <EditBusinessProfile /> : <EditIndividualProfile /> : <Loader />}
      </div>
    </>
  );
};

export default Accounts;
