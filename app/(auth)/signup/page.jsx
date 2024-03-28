"use client";

import { Suspense, useContext, useEffect, useState } from "react";
import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/common/Loader";
import Link from "next/link";
import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Footer from "@/components/common/Footer";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/utils/supabase";

const Page = () => {
  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#2e2536]">
      <NavBar />
      {/* Suspense is used since the page uses search params */}
      <Suspense>
        <SignUpPage />
      </Suspense>
    </main>
  );
};

export default Page;

const SignUpPage = () => {
  const { session } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isBusiness, setIsBusiness] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const searchParams = useSearchParams();
  const [completeRegistration, setCompleteRegistration] = useState(false);
  const [confirmToast, setConfirmToast] = useState(false);
  const [disableSignUp, setDisableSignUp] = useState(false);

  const registerBusiness = async (e) => {
    e?.preventDefault();
    try {
      if (!session) return;
      console.log(session);
      let response;

      response = await fetch("api/user/create", {
        method: "POST",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
        body: JSON.stringify({
          email: session.data.session.user.email,
          user_id: session.data.session.user.id,
          business: true,
        }),
      });
      if (response.status === 500) {
        const { error } = await response.json();
        throw error;
      }

      response = await fetch("api/business/create", {
        method: "POST",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
        body: JSON.stringify({
          name: businessName ? businessName : "",
          user_id: session.data.session.user.id,
        }),
      });

      if (response.status === 500) {
        const { error } = await response.json();
        throw error;
      }
      if (businessName) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const registerIndividual = async (e) => {
    e?.preventDefault();
    try {
      if (!session) return;
      let response;

      response = await fetch("api/user/create", {
        method: "POST",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
        body: JSON.stringify({
          email: session.data.session.user.email,
          user_id: session.data.session.user.id,
          business: false,
        }),
      });
      if (response.status === 500) {
        const { error } = await response.json();
        throw error;
      }

      response = await fetch("api/individual/create", {
        method: "POST",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
        body: JSON.stringify({
          first_name: firstName ? firstName : "",
          last_name: lastName ? lastName : "",
          user_id: session.data.session.user.id,
        }),
      });

      if (response.status === 500) {
        const { error } = await response.json();
        throw error;
      }
      if (firstName || lastName) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (confirmToast) toast.success("Please confirm your email", { icon: "🚀" });
    if (session?.data?.session) {
      if (searchParams.has("complete-registration")) {
        setCompleteRegistration(true);
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } else if (session) {
      setLoading(false);
    }
  }, [session, confirmToast]);

  if (loading)
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );

  const signUp = async (e) => {
    e.preventDefault();
    setDisableSignUp(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/signup?complete-registration=true`,
        },
      });

      if (error) throw error;

      setConfirmToast(true);
    } catch (error) {
      console.error(error);
    } finally {
      setDisableSignUp(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/signup?complete-registration=true`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#2e2536]">
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

              {completeRegistration ? (
                <div className="p-8">
                  <form onSubmit={isBusiness ? registerBusiness : registerIndividual}>
                    <div className="flex justify-center mb-4">
                      <button
                        type="button"
                        onClick={() => setIsBusiness(false)}
                        className={`font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline mx-2 ${
                          isBusiness ? "bg-gray-700 text-white" : "bg-purpleprimary text-white"
                        }`}
                      >
                        Individual Signup
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsBusiness(true)}
                        className={`font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline mx-2 ${
                          isBusiness ? "bg-purpleprimary text-white" : "bg-gray-700 text-white"
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
                    <button
                      type="submit"
                      className="bg-purpleprimary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    >
                      Complete Registration
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-8">
                  <form onSubmit={signUp}>
                    <div className="flex justify-center mb-4">
                      <button
                        type="button"
                        onClick={() => setIsBusiness(false)}
                        className={`font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline mx-2 ${
                          isBusiness ? "bg-gray-700 text-white" : "bg-purpleprimary text-white"
                        }`}
                      >
                        Individual Signup
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsBusiness(true)}
                        className={`font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline mx-2 ${
                          isBusiness ? "bg-purpleprimary text-white" : "bg-gray-700 text-white"
                        }`}
                      >
                        Business Signup
                      </button>
                    </div>
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
                          Already have an account?{" "}
                          <span className="text-purple-500 hover:text-purple-500">Sign In</span>
                        </Link>
                        <p className="inline-block align-baseline text-sm text-gray-400">
                          By signing up, you agree to our{" "}
                          <Link
                            href="/terms-and-conditions.html"
                            className="font-bold text-purple-500 hover:text-purple-500 hover:underline"
                          >
                            Terms & Conditions
                          </Link>
                          {" and "}
                          <Link
                            href="/privacy-notice.html"
                            className="font-bold text-purple-500 hover:text-purple-500 hover:underline"
                          >
                            Privacy Notice.
                          </Link>
                        </p>
                      </div>
                      <button
                        disabled={disableSignUp}
                        type="submit"
                        className={`${
                          disableSignUp
                            ? "bg-gray-800 cursor-not-allowed text-gray-400"
                            : "bg-purpleprimary hover:bg-purple-700 text-white"
                        }  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}
                      >
                        Sign Up
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={signInWithGoogle}
                      className="mt-4 gap-4 flex items-center justify-center shadow-lg bg-gray-200 mb-6 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      <Image src="/google.svg" alt="Google logo" width={23} height={23} />
                      <span>Sign Up with Google</span>
                    </button>
                    <div
                      id="g_id_onload"
                      data-client_id="<client ID>"
                      data-context="signin"
                      data-ux_mode="popup"
                      data-callback="handleSignInWithGoogle"
                      data-nonce=""
                      data-auto_select="true"
                      data-itp_support="true"
                    ></div>

                    <div
                      class="g_id_signin"
                      data-type="standard"
                      data-shape="pill"
                      data-theme="outline"
                      data-text="signin_with"
                      data-size="large"
                      data-logo_alignment="left"
                    ></div>
                  </form>
                </div>
              )}
            </section>
          </main>
        </main>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};
