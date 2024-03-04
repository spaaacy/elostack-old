"use client";

import { useContext, useEffect, useState } from "react";
import SignUp from "@/components/common/SignUp";
import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";

const Page = () => {
  const { session } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session?.data?.session) {
      router.push("/dashboard");
    } else if (session) {
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
        <SignUp />
      </div>
    </>
  );
};

export default Page;
