"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEnvelope, FaCog, FaChartLine, FaSmile } from "react-icons/fa";

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
      description: "Easily create professional and engaging email templates using our intuitive drag-and-drop editor.",
      icon: FaEnvelope,
    },
    {
      title: "Set Up Automation Rules",
      description: "Define triggers and actions to automate your email campaigns based on subscriber behavior and preferences.",
      icon: FaCog,
    },
    {
      title: "Monitor Campaign Performance",
      description: "Track and analyze the performance of your email campaigns with detailed reports and insights.",
      icon: FaChartLine,
    },
    {
      title: "Engage Your Audience",
      description: "Build stronger relationships with your subscribers through personalized and targeted email communications.",
      icon: FaSmile,
    },
  ];

  return (
    <section className=" py-24">
      <div className="container px-4 sm:px-6 lg:px-8  mx-auto max-w-8xl max-h-8xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white" data-aos="fade-down">
            How Our Email Automation Works
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto" data-aos="fade-down" data-aos-delay="200">
            Streamline your email marketing efforts with our powerful automation tools.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="relative" data-aos="flip-left" data-aos-delay={index * 100}>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg transform -rotate-6 shadow-lg"></div>
              <div className="relative bg-gray-800 rounded-lg p-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-3 rounded-full mr-4">
                    <step.icon className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                </div>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;