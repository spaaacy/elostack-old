"use client";

import NavBar from "@/components/common/NavBar";
import Feedback from "@/components/individual/feedback/feedback";
import { UserContext } from "@/context/UserContext";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const { session, verifyLogin } = useContext(UserContext);
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      await verifyLogin("business");
    };

    if (session) {
      loadData();
    }
  }, [session]);

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
