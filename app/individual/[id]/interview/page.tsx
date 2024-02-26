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

  // TODO: Fix this flow
  useEffect(() => {
    if (session) {
      if (id !== session.data.session?.user.id) {
        // Check if user logged in and interview individual are same
        if (user) {
          if (user.business) {
            // Check if business is logged in
            // TODO: Check if business is authorized
            console.log("Business view");
          } else {
            console.log("No authorization");
            // router.push("/");
          }
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
