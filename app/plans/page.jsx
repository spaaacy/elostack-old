"use client";

import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { useContext, useRef, useState } from "react";
import { FaEnvelope, FaChartBar, FaUserTie, FaCheckCircle } from "react-icons/fa";
import { UserContext } from "@/context/UserContext";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const PlansPage = () => {
  const { session } = useContext(UserContext);
  const router = useRouter();

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
      <main className="container  p-8 ">
        <div className="bg-gradient-to-r  from-purple-600 to-indigo-600 p-6 rounded-lg shadow-lg text-center mb-10 mx-32">
          <h3 className="text-3xl font-bold mb-4 text-white">Free One Month Trial</h3>
          <p className="text-lg text-white">
            New users get 672 free credits. Equivalent to a month's worth of emails.
            <br />
            <span className="font-semibold">No payment required.</span>
          </p>
        </div>
        <section className="gap-8 ">
          <div className={`rounded-lg shadow-lg transform transition-transform duration-300 mx-32 bg-gray-900`}>
            <div
              className={`flex items-center justify-center h-32 bg-gradient-to-r from-green-500 to-green-600 rounded-t-lg `}
            >
              <FaChartBar className={`text-5xl text-green-500`} />
            </div>
            <div className="p-8 flex justify-between px-20">
              <div>
                <h3 className="text-2xl font-bold mb-4">Monthly Plan</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">$20</span>
                </div>
                <div className={`justify-center mt-4`}>
                  <button
                    onClick={handleSubscribe}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 shadow-lg bg-purple-600 hover:bg-purple-700 text-white`}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
              <div class="inline-block h-[250px] min-h-[1em] w-[1px] self-stretch bg-gray-700"></div>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
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

const features = [
  "672 total credits",
  "168 emails sent week",
  "Fully-automated outgoing email",
  "Customizable templates",
  "Email attachments",
  "70 companies",
  "Specifiable locations",
  "Billed every 4 weeks",
];
