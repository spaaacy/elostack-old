"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChartLine, FaPaperPlane, FaUserPlus, FaShieldAlt,FaTags } from "react-icons/fa";

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
      title: "Grant Permissions",
      description: "Provide necessary permissions to allow our platform to access your email account and send campaigns on your behalf.",
      icon: FaShieldAlt,
    },
    {
      title: "Select a Plan",
      description: "Choose from our flexible pricing plans based on your specific needs and the volume of emails you want to send to tech recruiters.",
      icon: FaTags,
    },
    {
      title: "Customize and Send Emails",
      description: "Tailor your email templates, select the desired tech recruiters, and launch your personalized email campaigns with ease.",
      icon: FaPaperPlane,
    },
    {
      title: "Track Results",
      description: "Monitor the performance of your email campaigns, gain valuable insights, and optimize your outreach to tech recruiters.",
      icon: FaChartLine,
    },
  ];

  return (
    <section className=" py-24">
      <div className="container px-4 sm:px-6 lg:px-8  mx-auto max-w-8xl max-h-8xl">
        <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white" data-aos="fade-down">
          How to Get Started with EloStack
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto" data-aos="fade-down" data-aos-delay="200">
          Follow these simple steps to start utilizing our email automation tools and get hired.
        </p>
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10  mx-10">
          {steps.map((step, index) => (
            <div key={index} className="relative" data-aos="flip-left" data-aos-delay={index * 100}>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg transform -rotate-6 shadow-lg"></div>
              <div className="relative bg-gray-800 rounded-lg p-6 overflow-hidden ">
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