"use client";

import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { useState } from "react";
import {
  FaEnvelope,
  FaChartBar,
  FaUserTie,
  FaHeadset,
  FaShieldAlt,
  FaMedal,
  FaRocket,
} from "react-icons/fa";

const plans = [
  {
    name: "Basic",
    price: 4.99,
    features: [
      "100 emails per month",
      "Basic templates",
      "Limited support",
      "Email tracking",
      "Customizable branding",
    ],
    icon: FaEnvelope,
    iconColor: "text-blue-500",
  },
  {
    name: "Pro",
    price: 9.99,
    features: [
      "500 emails per month",
      "Advanced templates",
      "Priority support",
      "AI Cover Letter Generator",
      "A/B testing",
      
      
    ],
    icon: FaChartBar,
    iconColor: "text-green-500",
  },
  {
    name: "Premium",
    price: 19.99,
    features: [
      "750 emails per month",
      "Custom templates",
      "Dedicated account manager",
      "AI Cover Letter Generator",
      "Advanced security",
      "Detailed analytics",

    ],
    icon: FaUserTie,
    iconColor: "text-purple-500",
  },
];

const PlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = () => {
    if (selectedPlan) {
      // Handle the subscription process
      console.log(`Subscribing to ${selectedPlan.name} plan`);
      // Redirect to payment or registration page
    }
  };

  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
      <NavBar />
      <Head>
        <title>Plans</title>
      </Head>
      <main className="container mx-auto p-8 bg-[#1b1b29] rounded-lg shadow mt-16">
        <section className="p-5 border-b border-gray-700">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Subscription Plans</h2>
            <p className="text-xl text-gray-400">Choose a plan that suits your needs</p>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-800 p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ${
                selectedPlan === plan ? "ring-4 ring-purple-500" : ""
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <h3 className="text-3xl font-bold mb-6">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-bold">${plan.price}</span>
                <span className="ml-1 text-xl text-gray-400">/ month</span>
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section className="mt-16">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold mb-6">One-Week Free Trial</h3>
            <p className="text-xl text-gray-400 mb-8">
              Try our service for free for one week. No credit card required.
            </p>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300"
              onClick={handleSubscribe}
            >
              Start Free Trial
            </button>
          </div>
        </section>
        <div className="flex justify-end mt-12">
          <button
            onClick={handleSubscribe}
            className={`px-8 py-4 text-xl font-semibold rounded-lg transition-colors duration-300 ${
              selectedPlan
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedPlan}
          >
            Subscribe
          </button>
        </div>
      </main>
      <Footer />
    </main>
  );
};

export default PlansPage;