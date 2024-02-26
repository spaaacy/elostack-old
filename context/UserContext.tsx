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
  fetchProfileData: Function;
  user: any;
}

export const UserContext = React.createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState();
  const [supabase, setSupabase] = useState();
  const [user, setUser] = useState();

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
      const { data, error } = await supabase.from("user").select("*").eq("user_id", userId).single();
      setUser(data);
    }
  };

  const fetchProfileData = async (userId) => {
    if (userId) {
      try {
        const { data, error } = await supabase?.from("individual").select("*").eq("user_id", userId).single();
        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    } else {
      console.log("Session not loaded or user ID undefined");
    }
  };

  const fetchSession = async (supabase) => {
    const session = await supabase.auth.getSession();
    setSession(session);
  };

  return <UserContext.Provider value={{ session, supabase, fetchProfileData, user }}>{children}</UserContext.Provider>;
};
