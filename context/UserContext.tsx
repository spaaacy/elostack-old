"use client";

import React from "react";
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
}

export const UserContext = React.createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const session = await supabase.auth.getSession();

  return <UserContext.Provider value={{ session }}>{children}</UserContext.Provider>;
};
