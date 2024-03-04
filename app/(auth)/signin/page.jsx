"use client";

import { useContext, useEffect, useState } from "react";
import SignIn from "../../../components/common/SignIn";
import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
const SignInPage = () => {
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
      <div className="flex h-[90vh]">
        <SignIn />
      </div>
    </>
  );
};

export default SignInPage;
