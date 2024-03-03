// pages/Pricing.tsx

import React from "react";
import Head from "next/head";

const Pricing: React.FC = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "Basic",
      price: "$10/month",
      features: ["5 Interviews", "Basic Support", "Access to Basic Features"],
    },
    {
      id: 2,
      name: "Premium",
      price: "$20/month",
      features: [
        "20 Interviews",
        "Priority Support",
        "Access to Premium Features",
      ],
    },
    {
      id: 3,
      name: "Pro",
      price: "$30/month",
      features: ["30 Interviews", "24/7 Support", "Access to All Features"],
    },
  ];

  return (
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <Head>
        <title>Pricing | EloStack</title>
      </Head>

      <main className="container mx-auto p-4 bg-gray-50 rounded-lg shadow mt-16">
        <section className="text-center p-5">
          <h2 className="text-3xl font-bold  text-blueprimary">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 mt-2">
            Choose a plan that fits your needs best
          </p>
        </section>

        <section className="flex justify-around flex-wrap">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className="m-4 w-72 flex flex-col bg-white rounded-lg shadow-2xl p-5 h-[450px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            >
              <h3 className="text-xl font-bold text-center text-blueprimary">
                {plan.name}
              </h3>
              <p className="text-2xl text-center my-4">{plan.price}</p>
              <ul className="flex-1">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="border-t border-gray-200 pt-2 text-gray-600"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="bg-blue-600 text-white mt-4 py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out">
                Select
              </button>
            </div>
          ))}
        </section>
      </main>
    </main>
  );
};

export default Pricing;
