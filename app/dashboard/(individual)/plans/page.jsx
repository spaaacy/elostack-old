"use client";

import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { useState } from "react";
import { FaEnvelope, FaChartBar, FaUserTie, FaCheckCircle } from "react-icons/fa";

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
    bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
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
    bgColor: "bg-gradient-to-r from-green-500 to-green-600",
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
    bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
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
    <main className="flex flex-col min-h-screen text-white w-full ">
      <NavBar />
      <Head>
        <title>Plans</title>
      </Head>
      <main className="container mx-auto p-8 mt-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Subscription Plans</h2>
          <p className="text-xl text-gray-400">Choose a plan that suits your needs</p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ${
                selectedPlan === plan
                  ? "ring-4 ring-purple-500 bg-gray-800"
                  : "bg-gray-900"
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <div
                className={`flex items-center justify-center h-48 ${plan.bgColor} rounded-t-lg`}
              >
                <plan.icon className={`text-6xl ${plan.iconColor}`} />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="ml-1 text-xl text-gray-400">/ month</span>
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
        <section className="mt-16">
  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-10 rounded-lg shadow-lg text-center">
    <h3 className="text-4xl font-bold mb-6 text-white">One-Week Free Trial</h3>
    <p className="text-xl text-white mb-8">
      Try our service for free for one week. No credit card required.
    </p>
    <button
      className="bg-white text-purple-600 font-bold py-4 px-12 rounded-full transition-colors duration-300 hover:bg-purple-100 hover:text-purple-700 shadow-lg"
      onClick={handleSubscribe}
    >
      Start Free Trial
    </button>
  </div>
</section>
<div className="flex justify-center mt-12">
  <button
    onClick={handleSubscribe}
    className={`px-12 py-4 text-2xl font-semibold rounded-full transition-colors duration-300 shadow-lg ${
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