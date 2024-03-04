"use client";

import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { UserContext } from "@/context/UserContext";

const pricingPlans = [
  {
    id: 1,
    name: "Tier I",
    price: "$250",
    features: ["5 interviews"],
    recommended: false,
    amount: 5,
  },
  {
    id: 2,
    name: "Tier II",
    price: "$500",
    features: ["10 Interviews"],
    recommended: true,
    amount: 10,
  },
  {
    id: 3,
    name: "Tier III",
    price: "$1500",
    features: ["25 Interviews"],
    recommended: false,
    amount: 25,
  },
];

const Pricing: React.FC = () => {
  const { session } = useContext(UserContext);
  const [user, setUser] = useState();

  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [session]);

  const purchasePackage = async (amount) => {
    if (user && user.business && amount > 0) {
      const response = await fetch("/api/user/purchase-credits", {
        method: "POST",
        body: JSON.stringify({
          user_id: user.user_id,
          amount,
        }),
      });
      if (response.status === 200) {
      }
    }
  };

  const fetchUser = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const { user } = await response.json();
        setUser(user);
      }
    }
  };

  return (
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <Head>
        <title>Pricing | EloStack</title>
      </Head>
      <div className="container mx-auto p-4 mt-16">
        <div className="container mx-auto p-4 bg-white rounded-lg shadow mt-0 h-[43rem]">
          <section className="text-center p-5">
            <h2 className="text-4xl font-bold text-blueprimary">Choose Your Plan</h2>
            <p className="text-gray-600 mt-2">Choose a plan that fits your needs best</p>
          </section>
          <section className="flex justify-center items-stretch flex-wrap gap-8 mt-8 h-[28rem]">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`m-4 w-80 flex flex-col ${
                  plan.recommended ? "border-2 border-green-500 -mt-4 h-[30rem]" : "border-2 border-gray-100"
                } bg-white rounded-lg shadow-xl p-5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 h-full`}
              >
                {plan.recommended && (
                  <span className="px-3 py-1 text-sm text-white bg-green-500 rounded-full self-end transform -translate-y-8 translate-x-8">
                    RECOMMENDED
                  </span>
                )}
                <h3 className="text-xl font-bold text-center text-gray-900 my-2">{plan.name}</h3>
                <p className="text-2xl text-center font-semibold my-2">{plan.price}</p>
                <ul className="flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="border-t border-gray-200 pt-2 text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => purchasePackage(plan.amount)}
                  className="bg-blueprimary text-white border border-blueprimary mt-4 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out"
                >
                  Purchase
                </button>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Pricing;
