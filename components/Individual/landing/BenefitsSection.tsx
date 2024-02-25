"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaUsers,
  FaDollarSign,
  FaChartLine,
  FaComments,
  FaTools,
} from "react-icons/fa"; // Example icons

const KeyBenefitsSection: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-quart",
      once: true,
      offset: 100, // Triggers the animation 100 pixels before the element comes into view
    });
  }, []);

  const benefits = [
    {
      title: "Efficient Hiring",
      description:
        "Our platform streamlines the hiring process, significantly reducing the time and effort required to connect with qualified candidates.",
      icon: <FaUsers className="text-blue-500" size={30} />, // Blue for trust and reliability
      aos: "fade-right",
      delay: 200,
    },
    {
      title: "Cost-Effective Solutions",
      description:
        "Save on hiring expenses with our targeted approach, allowing you to invest more in your team's growth.",
      icon: <FaDollarSign className="text-green-500" size={30} />, // Green for financial savings
      aos: "fade-up",
      delay: 300,
    },
    {
      title: "Access to Top Talent",
      description:
        "Our rigorous evaluation process ensures you have access to a pool of top-tier candidates, ready to drive your company forward.",
      icon: <FaChartLine className="text-red-500" size={30} />, // Red for competitive advantage
      aos: "fade-left",
      delay: 400,
    },
    {
      title: "Streamlined Communication",
      description:
        "Facilitate direct and efficient communication between employers and potential candidates through our platform.",
      icon: <FaComments className="text-yellow-500" size={30} />, // Yellow for communication and optimism
      aos: "fade-right",
      delay: 500,
    },
    {
      title: "Advanced Analytics",
      description:
        "Leverage our advanced analytics tools to make data-driven decisions and optimize your hiring strategies.",
      icon: <FaTools className="text-purple-500" size={30} />, // Purple for innovation and wisdom
      aos: "fade-up",
      delay: 600,
    },
    {
      title: "Personalized Support",
      description:
        "Experience our personalized support designed to help you every step of the way, ensuring a smooth hiring process.",
      icon: <FaUsers className="text-pink-500" size={30} />, // Pink for care and support
      aos: "fade-left",
      delay: 700,
    },
    // Add more benefits as needed
  ];

  return (
    <section
      id="key-benefits"
      className="pt-20 pb-32 overflow-hidden text-black bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2
            className="text-5xl font-bold text-blueprimary"
            data-aos="zoom-in-down"
          >
            Transform Your Hiring Process
          </h2>
          <p
            className="mt-4 text-xl max-w-xl mx-auto"
            data-aos="zoom-in-down"
            data-aos-delay="100"
          >
            EloStack offers a seamless bridge between top talent and leading
            companies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-4"
              data-aos={benefit.aos}
              data-aos-delay={benefit.delay}
            >
              <div className="h-full bg-white bg-opacity-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105">
                <div className="p-6">
                  <div className="flex items-center justify-center text-center mb-4">
                    {benefit.icon}
                    <h3 className="ml-3 text-2xl font-semibold text-gray-900">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="leading-relaxed text-base">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefitsSection;
