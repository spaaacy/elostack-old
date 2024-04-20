"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEnvelope, FaUsers, FaPaperPlane } from "react-icons/fa";

const Benefits = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const steps = [
    {
      title: "Top Recruiters",
      description: "Connect with our exclusive network of the most reliable and influential tech recruiters from top companies. Our extensive vetting process ensures you reach the best professionals for successful placements.",
      aos: "fade-right",
      icon: <FaUsers className="text-4xl text-blue-500 mr-4" />,
      image: "/TopRecruiters.png",
    },
    {
      title: "Targeted Emails",
      description: "Leverage our advanced email technology to deliver personalized messages directly to key decision-makers. Our targeting algorithms ensure your attachments reach the most relevant recruiters.",
      aos: "fade-up",

      icon: <FaEnvelope className="text-4xl text-green-500 mr-4" />,
      image: "Emailings.png",
    },
    {
      title: "High Volume Sending",
      description: "Send up to 672 emails per month with our unparalleled email sending capacity. Cast a wide net and maximize your chances of connecting with the right recruiters at the right time.",
      aos: "fade-left",

      icon: <FaPaperPlane className="text-4xl text-yellow-500 mr-4" />,
      image: "/applications.png",
    },
  ];

  return (
    <section className="text-white body-font py-20 ">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" data-aos="fade-down">
            Unlock the Power of Email Automation
          </h2>
          <p className="text-xl text-gray-300" data-aos="fade-down" >
            Elevate your email marketing game and achieve remarkable results with our cutting-edge email automation
            platform.
          </p>
        </div>
        <div className="grid grid-cols-1 mx-20   md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-500 ease-in-out transform hover:scale-110"
              data-aos={step.aos}
              data-aos-delay={step.delay}
            >
              <div className="relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-64 object-cover object-left rounded-t-lg transition-transform duration-500 ease-in-out transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-2">
                  <div className="bg-gray-700 rounded-full pl-4 py-2  mr-3">{step.icon}</div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
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
