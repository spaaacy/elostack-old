"use client";

import NavBar from "@/components/NavBar";
import Feedback from "@/components/individual/feedback/Feedback";
import { UserContext } from "@/context/UserContext";
import { useParams, useRouter, useState } from "next/navigation";
import { useContext, useEffect } from "react";

const Page = () => {
  const { id } = useParams();
  const { session, verifyLogin } = useContext(UserContext);
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      verifyLogin();
    }
  }, [session]);

  return (
    <>
      <NavBar />
      <div>
        <Feedback />
      </div>
    </>
  );
};

export default Page;
