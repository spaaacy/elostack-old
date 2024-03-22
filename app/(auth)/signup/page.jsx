"use client";

import { useContext, useEffect, useState } from "react";
import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import Link from "next/link";
import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

const Page = () => {
  const { session } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isBusiness, setIsBusiness] = useState(false);
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (session?.data?.session) {
      router.push("/dashboard");
    } else if (session) {
      setLoading(false);
    }
  }, [session]);

  if (loading)
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isBusiness) {
      businessSignUp();
    } else {
      individualSignUp();
    }
  };

  const businessSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://elostack.com/",
        },
      });

      if (error) throw error;

      const response = await fetch("api/user/create", {
        method: "POST",
        body: JSON.stringify({
          name: businessName,
          email,
          userId: data.user.id,
          business: true,
        }),
      });

      if (response.status === 500) {
        const { error } = await response.json();
        throw error;
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const individualSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://elostack.com/",
        },
      });

      if (error) throw error;

      const response = await fetch("api/user/create", {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email,
          userId: data.user.id,
          business: false,
        }),
      });

      if (response.status === 500) {
        const { error } = await response.json();
        throw error;
      }
      location.reload();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#2e2536]">
      <NavBar />
      <div>
        <main className="flex flex-col flex-1 min-h-screen">
          <Head>
            <title>{isBusiness ? "Business Signup" : "Individual Signup"} | EloStack</title>
          </Head>

          <main className="container mx-auto p-8 bg-[#1b1b29] rounded-lg shadow-md mt-20 flex justify-center items-center">
            <section className="grid md:grid-cols-2 gap-4">
              <div className="p-8 text-center md:text-left border-r border-gray-700 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4 text-purple-500">
                  {isBusiness ? "Business Signup" : "Individual Signup"}
                </h2>
                <p className="text-md text-gray-400 text-center">
                  {isBusiness
                    ? "Join EloStack and streamline your hiring process. Find top talent, conduct efficient technical interviews, and hire with confidence."
                    : "Join EloStack and find your next job. Get matched with top companies, showcase your skills, and ace your interviews."}
                </p>
              </div>

              <div className="p-8">
                <form onSubmit={handleSignup}>
                  <div className="flex justify-center mb-4">
                    <button
                      onClick={() => setIsBusiness(false)}
                      className={`font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline mx-2 ${
                        isBusiness ? "bg-gray-700 text-white" : "bg-purple-700 text-white"
                      }`}
                    >
                      Individual Signup
                    </button>
                    <button
                      onClick={() => setIsBusiness(true)}
                      className={`font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline mx-2 ${
                        isBusiness ? "bg-purple-700 text-white" : "bg-gray-700 text-white"
                      }`}
                    >
                      Business Signup
                    </button>
                  </div>

                  {isBusiness ? (
                    <div className="mb-4">
                      <label htmlFor="businessName" className="block text-white text-sm font-bold mb-2">
                        Business Name:
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="firstName" className="block text-white text-sm font-bold mb-2">
                          First Name:
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="lastName" className="block text-white text-sm font-bold mb-2">
                          Last Name:
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-6 relative">
                    <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
                      Password:
                    </label>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button onClick={togglePasswordVisibility} className="absolute right-3 top-[1.6rem] mt-2">
                      {passwordVisible ? (
                        <Image src="/hide.svg" alt="unhide password" width={25} height={25} />
                      ) : (
                        <Image src="/unhide.png" alt="hide password" width={25} height={25} />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <Link href="/signin" className="inline-block align-baseline font-bold text-sm text-white">
                        Already have an account? <span className="text-purple-500 hover:text-purple-700">Sign In</span>
                      </Link>
                      <p className="inline-block align-baseline text-sm text-gray-400">
                        By signing up, you agree to our{" "}
                        <Link
                          href="/terms-and-conditions.html"
                          className="font-bold text-purple-500 hover:text-purple-700 hover:underline"
                        >
                          Terms & Conditions.
                        </Link>
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </main>
        </main>
      </div>
    </main>
  );
};

export default Page;
