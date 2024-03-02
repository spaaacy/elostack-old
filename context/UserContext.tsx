"use client";

import React, { useEffect, useState } from "react";
import { AuthError, Session, createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export type session =
  | {
      data: {
        session: Session;
      };
      error: null;
    }
  | {
      data: {
        session: null;
      };
      error: AuthError;
    }
  | {
      data: {
        session: null;
      };
      error: null;
    };

export const UserContext = React.createContext();

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState();
  const [supabase, setSupabase] = useState();
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
      setSupabase(supabase);
      fetchSession(supabase);
    } else {
      fetchUser();
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

  const verifyLogin = async (userType) => {
    if (session?.data?.session?.user) {
      if (userType === "business" && !user?.business) {
        // router.push("/dashboard");
        console.error("You must be an business to access this page!");
      } else if (userType === "individual" && user?.business) {
        // router.push("/dashboard");
        console.error("You must be an individual to access this page!");
      }
    } else if (!userType) {
      // router.push("/signin");
      console.error("Please sign in access this page!");
    }
  };

  const fetchSession = async (supabase) => {
    const session = await supabase.auth.getSession();
    setSession(session);
  };

  return <UserContext.Provider value={{ session, supabase, user, verifyLogin }}>{children}</UserContext.Provider>;
};
