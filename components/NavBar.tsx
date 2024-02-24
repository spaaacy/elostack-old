"use client";

import Link from "next/link";
import UserAccountNav from "./Individual/registration/UserAccountNav";
import { useEffect, useState } from "react";
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

const NavBar = () => {
  // TODO: Change later
  const [session, setSession] = useState<session>();
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    const session = await supabase.auth.getSession();
    setSession(session);
  };

  return (
    <nav className="px-10 py-4 flex justify-between items-center">
      <Link href={"/"} className="text-3xl font-bold font-roboto text-blueprimary">
        EloStack
      </Link>
      {session?.data.session ? (
        <UserAccountNav session={session} />
      ) : (
        <Link href="/signin">
          <span className="rounded-lg bg-gray-700 hover:bg-blueprimary text-white px-4 py-2">Sign in</span>
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
