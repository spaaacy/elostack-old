"use client";

import NavBar from "@/components/nav-bar/NavBar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import { FaEnvelope, FaChartBar, FaUserTie, FaCheckCircle, FaFire } from "react-icons/fa";
import { UserContext } from "@/context/UserContext";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PlansPage = () => {
  const { session } = useContext(UserContext);
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = session?.data?.session?.user.id;
      if (userId) {
        const response = await fetch(`/api/user/${userId}`, {
          headers: {
            "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
          },
          method: "GET",
        });
        if (response.status === 200) {
          const { user } = await response.json();
          setUser(user);
        } else {
          router.push("/signup?google_oauth=true");
        }
      }
    };

    if (session) {
      fetchUser();
    }
  }, [session]);

  const handleSubscribe = async () => {
    if (session.data.session) {
      const userId = session.data.session.user.id;
      if (!userId) router.push("/signin");
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
          },
          body: JSON.stringify({
            user_id: userId,
            weeks: 4,
          }),
        });
        const result = await response.json();
        if (response.status !== 200) {
          throw Error("Something went wrong");
        }

        const stripe = await loadStripe(
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_LIVE_KEY
            : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TEST_KEY
        );
        if (!stripe) {
          throw Error("Something went wrong");
        }
        console.log(result);
        await stripe.redirectToCheckout({ sessionId: result.session.id });
      } catch (error) {
        console.error(error);
      }
    } else {
      router.push("/signin");
    }
  };

  return (
    <main className="flex flex-col min-h-screen text-white w-full ">
      <NavBar />
      <Head>
        <title>Plans</title>
      </Head>
      <main className="container p-8 flex flex-1">
        <h1 className="font-bold text-4xl">Plans</h1>
        <section className="gap-8 m-auto">
          <div className="flex gap-4 justify-center">
            <div
              className={`rounded-lg shadow-lg transform transition-transform duration-300 bg-gradient-to-r lg:w-[350px] from-purple-600 to-indigo-600`}
            >
              <div className={`flex items-center justify-center h-32 rounded-t-lg `}>
                <FaFire className={`text-5xl text-purple-600`} />
              </div>
              <div className="p-8 flex flex-col justify-start">
                <h3 className="text-3xl font-bold mb-4">Free Tier</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-2xl font-bold">No card required</span>
                </div>
                <ul className="space-y-4">
                  {featuresFree.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className={`rounded-lg shadow-lg transform transition-transform duration-300 bg-gray-900 lg:w-[350px] `}
            >
              <div className={`flex items-center justify-center h-32 rounded-t-lg `}>
                <FaChartBar className={`text-5xl text-green-500`} />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Superuser</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-2xl font-bold">$20</span>
                  </div>
                </div>
                <ul className="space-y-4">
                  {featuresPaid.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className={`mt-4`}>
                  {user && user.credits <= 0 && (
                    <button
                      onClick={handleSubscribe}
                      className={`px-4 py-2 rounded-sm transition-colors duration-300 shadow-lg bg-purple-600 hover:bg-purple-700 text-white`}
                    >
                      Get Started
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-4"></section>
      </main>
      <Footer />
    </main>
  );
};

export default PlansPage;

const featuresPaid = [
  "168 emails sent weekly",
  "Fully-automated outgoing email",
  "Customizable templates",
  "Email attachments",
  "70 companies",
  "Specifiable locations",
  "Billed every 4 weeks",
];
const featuresFree = [
  "56 emails sent week",
  "Fully-automated outgoing email",
  "Customizable templates",
  "Email attachments",
  "70 companies",
  "Specifiable locations",
];
