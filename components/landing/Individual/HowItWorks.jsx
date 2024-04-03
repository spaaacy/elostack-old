"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEnvelope, FaCog, FaChartLine, FaSmile } from "react-icons/fa"; // Icons for steps

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const steps = [
    {
      title: "Create Email Templates",
      description:
        "Easily create professional and engaging email templates using our intuitive drag-and-drop editor.",
      aos: "fade-up-right",
      icon: FaEnvelope,
    },
    {
      title: "Set Up Automation Rules",
      description:
        "Define triggers and actions to automate your email campaigns based on subscriber behavior and preferences.",
      aos: "fade-up",
      delay: 100,
      icon: FaCog,
    },
    {
      title: "Monitor Campaign Performance",
      description:
        "Track and analyze the performance of your email campaigns with detailed reports and insights.",
      aos: "fade-up-left",
      delay: 200,
      icon: FaChartLine,
    },
    {
      title: "Engage Your Audience",
      description:
        "Build stronger relationships with your subscribers through personalized and targeted email communications.",
      aos: "fade-up-right",
      delay: 300,
      icon: FaSmile,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-20">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white"
            data-aos="zoom-in"
          >
            How Our Email Automation Works
          </h1>
          <p
            className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto"
            data-aos="zoom-in"
          >
            Streamline your email marketing efforts with our powerful automation tools.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              data-aos={step.aos}
              data-aos-delay={step.delay}
              className="bg-white rounded-lg shadow-xl p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-6">
                <step.icon className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;