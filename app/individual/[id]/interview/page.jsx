"use client";

import Loader from "@/components/common/Loader";
import NavBar from "@/components/common/NavBar";
import Feedback from "@/components/individual/feedback/feedback";
import { UserContext } from "@/context/UserContext";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const { session, verifyLogin } = useContext(UserContext);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const success = await verifyLogin("business");
      if (success) {
        await setLoading(false);
      }
    };

    if (session) {
      if (session?.data?.session?.user.id === id) {
        setLoading(false);
      } else {
        loadData();
      }
    }
  }, [session]);

  if (loading) {
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-1">
        <Feedback />
      </div>
    </>
  );
};

export default Page;
