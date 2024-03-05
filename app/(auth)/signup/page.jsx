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

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <NavBar />
      <div>
        <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
          <Head>
            <title>{isBusiness ? "Business Signup" : "Individual Signup"} | EloStack</title>
          </Head>

          <main className="container mx-auto p-8 bg-white rounded-lg shadow-md mt-20 flex justify-center items-center">
            <section className="grid md:grid-cols-2 gap-4">
              <div className="p-8 text-center md:text-left border-r border-gray-200 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4 text-blueprimary">
                  {isBusiness ? "Business Signup" : "Individual Signup"}
                </h2>
                <p className="text-md text-gray-500 text-center">
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
                        isBusiness ? "bg-gray-500 text-white" : "bg-blue-500 text-white"
                      }`}
                    >
                      Individual Signup
                    </button>
                    <button
                      onClick={() => setIsBusiness(true)}
                      className={`font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline mx-2 ${
                        isBusiness ? "bg-blue-500 text-white" : "bg-gray-500 text-white"
                      }`}
                    >
                      Business Signup
                    </button>
                  </div>

                  {isBusiness ? (
                    <div className="mb-4">
                      <label htmlFor="businessName" className="block text-gray-700 text-sm font-bold mb-2">
                        Business Name:
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                          First Name:
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                          Last Name:
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-6 relative">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
<button onClick={togglePasswordVisibility} className="absolute right-3 top-[1.6rem] mt-2">
  {passwordVisible ? (
    <Image src="/Hide.svg" alt="unhide password" width={25} height={25} />
  ) : (
    <Image src="/Unhide.png" alt="hide password" width={25} height={25} />
  )}
</button>
        </div>
                  <div className="flex items-center justify-between">
                    <Link
                      href="/signin"
                      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                      Already have an account? Sign In
                    </Link>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
    </>
  );
};

export default Page;
