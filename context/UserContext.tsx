"use client";

import React, { useEffect, useState } from "react";
import { AuthError, Session, createClient } from "@supabase/supabase-js";

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

export interface UserContextType {
  session: session;
  supabase: any;
}

export const UserContext = React.createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState();
  const [supabase, setSupabase] = useState();

  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    setSupabase(supabase);
    fetchSession(supabase);
  }, []);

  const fetchSession = async (supabase) => {
    const session = await supabase.auth.getSession();
    setSession(session);
  };

  return <UserContext.Provider value={{ session, supabase }}>{children}</UserContext.Provider>;
};
