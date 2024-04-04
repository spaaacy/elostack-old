"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState();

  useEffect(() => {
    if (!session) {
      fetchSession();
    }
  }, [session]);

  const fetchSession = async () => {
    const session = await supabase.auth.getSession();
    setSession(session);
  };

  return <UserContext.Provider value={{ session }}>{children}</UserContext.Provider>;
};
