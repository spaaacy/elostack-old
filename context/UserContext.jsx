"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      fetchSession();
    }
  }, [session]);

  const fetchSession = async () => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const session = await supabase.auth.getSession();
    setSession(session);
  };

  const fetchUser = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const { user } = await response.json();
        return user;
      }
    }
  };

  const verifyLogin = async (userType) => {
    if (session) {
      const user = await fetchUser();
      if (session?.data?.session) {
        if (userType === "business" && !user?.business) {
          router.push("/dashboard");
          console.error("You must be an business to access this page!");
        } else if (userType === "individual" && user?.business) {
          router.push("/dashboard");
          console.error("You must be an individual to access this page!");
        } else if (userType === "admin" && !user?.admin) {
          router.push("/dashboard");
          console.error("You must be an admin to access this page!");
        } else {
          return true;
        }
      } else {
        router.push("/signin");
        console.error("Please sign in access this page!");
      }
    }
  };

  return <UserContext.Provider value={{ session, verifyLogin }}>{children}</UserContext.Provider>;
};
