"use client";

import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { useRef, useState } from "react";
import { FaEnvelope, FaChartBar, FaUserTie, FaCheckCircle } from "react-icons/fa";

const plans = [
  {
    name: "2 Weeks",
    price: "5.50",
    features: [
      "336 total credits",
      "168 emails sent week",
      "Fully-automated outgoing email",
      "Customizable templates",
      "Email attachments",
      "100 companies",
      "Specifiable locations",
    ],
    icon: FaEnvelope,
    iconColor: "text-blue-500",
    bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  {
    name: "4 Weeks",
    price: "5.00",
    features: [
      "672 total credits",
      "168 emails sent week",
      "Fully-automated outgoing email",
      "Customizable templates",
      "Email attachments",
      "100 companies",
      "Specifiable locations",
    ],
    icon: FaChartBar,
    iconColor: "text-green-500",
    bgColor: "bg-gradient-to-r from-green-500 to-green-600",
  },
  {
    name: "8 Weeks",
    price: "4.50",
    features: [
      "1,344 total credits",
      "168 emails sent week",
      "Fully-automated outgoing email",
      "Customizable templates",
      "Email attachments",
      "100 companies",
      "Specifiable locations",
    ],
    icon: FaUserTie,
    iconColor: "text-purple-500",
    bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
  },
];

const PlansPage = () => {
  const purchaseRef = useRef();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (plan) => {
    purchaseRef.current.scrollIntoView();
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
    <main className="flex flex-col min-h-screen text-white w-full ">
      <NavBar />
      <Head>
        <title>Plans</title>
      </Head>
      <main className="container mx-auto p-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-lg shadow-lg text-center my-8">
          <h3 className="text-2xl font-bold mb-4 text-white">Free Credits for Your First Week</h3>
          <p className="text-xl text-white">New users get 168 free credits. Equivalent to a week's worth of emails.</p>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={` hover:cursor-pointer rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ${
                selectedPlan === plan ? "ring-4 ring-purple-500 bg-gray-800" : "bg-gray-900"
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <div className={`flex items-center justify-center h-32 ${plan.bgColor} rounded-t-lg`}>
                <plan.icon className={`text-6xl ${plan.iconColor}`} />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="ml-1 text-xl text-gray-400">/ week</span>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
        <section className="mt-16"></section>
        <div ref={purchaseRef} className="flex justify-center mt-12">
          <button
            onClick={handleSubscribe}
            className={`px-12 py-4 text-2xl font-semibold rounded-full transition-colors duration-300 shadow-lg ${
              selectedPlan
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedPlan}
          >
            Purchase
          </button>
        </div>
      </main>
      <Footer />
    </main>
  );
};

export default PlansPage;
