"use client";

import NavBar from "@/components/NavBar";
import Feedback from "@/components/individual/feedback/Feedback";
import { UserContext, UserContextType } from "@/context/UserContext";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const Page = () => {
  const { id } = useParams();
  const { session, user } = useContext(UserContext) as UserContextType;
  const router = useRouter();

  useEffect(() => {
    if (session && user) {
      if (id !== session.data.session?.user.id) {
        console.log(user);
        if (user.business) {
          // TODO: Check if business is authorized
          console.log("Business view");
        } else {
          router.push("/");
        }
      }
    }
  }, [session, user]);

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
