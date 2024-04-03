"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEnvelope, FaCog, FaChartLine } from "react-icons/fa";

const Benefits = () => {
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
      title: "Tailored Campaigns",
      description:
        "Craft personalized email campaigns that resonate with your audience and drive engagement.",
      aos: "fade-right",
      icon: <FaEnvelope className="text-4xl text-blue-500 mr-4" />,
      image: "/emailservice.png",
    },
    {
      title: "Workflow Automation",
      description:
        "Streamline your email marketing efforts with automated workflows that nurture leads and keep subscribers engaged.",
      aos: "fade-left",
      delay: 100,
      icon: <FaCog className="text-4xl text-green-500 mr-4" />,
      image: "/emailservice.png",
    },
    {
      title: "Insightful Analytics",
      description:
        "Gain valuable insights into your email campaign performance and make data-driven decisions.",
      aos: "fade-right",
      delay: 200,
      icon: <FaChartLine className="text-4xl text-yellow-500 mr-4" />,
      image: "/emailservice.png",
    },
  ];

  const getAOSDirection = (index) => {
    return index % 2 === 0 ? "fade-right" : "fade-left";
  };

  return (
    <section className="text-white body-font py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" data-aos="zoom-in">
            Unlock the Power of Email Automation
          </h2>
          <p className="text-xl text-gray-300" data-aos="zoom-in" data-aos-delay="100">
            Elevate your email marketing game and achieve remarkable results with our cutting-edge
            email automation platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105"
              data-aos={getAOSDirection(index)}
              data-aos-delay="200"
            >
              <div className="relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-700 rounded-full pl-4 py-2  mr-4">{step.icon}</div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
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

export default Benefits;