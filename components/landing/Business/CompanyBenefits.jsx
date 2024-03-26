"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSearch, FaHandshake, FaStar } from "react-icons/fa";

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
      title: "Discover Top Talent",
      description: "Access a curated pool of skilled software engineers who have undergone rigorous technical interviews. Find the perfect fit for your company's needs.",
      aos: "fade-right",
      icon: <FaSearch className="text-xl sm:text-2xl md:text-4xl text-white" />,
      image: "/laptop.png",
    },
    {
      title: "Streamline Hiring Process",
      description: "Connect with candidates, schedule interviews, and make job offers directly through our platform. Simplify your recruitment process and save time.",
      aos: "fade-left",
      delay: 100,
      icon: <FaHandshake className="text-xl sm:text-2xl md:text-4xl text-white" />,
      image: "/devices.png",
    },
    {
      title: "Build Your Dream Team",
      description: "Assemble a team of exceptional software engineers who have been pre-screened for technical expertise. Grow your company with top-notch talent.",
      aos: "fade-right",
      delay: 200,
      icon: <FaStar className="text-xl sm:text-2xl md:text-4xl text-white" />,
      image: "/rocket.png",
    },
  ];

  const getAOSDirection = (index) => {
    return index % 2 === 0 ? "fade-right" : "fade-left";
  };

  return (
    <section className="text-white body-font bg-[#0f0f1c] w-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-32"></div>
        <div className="flex flex-wrap">
          {steps.map((step, index) => (
            <div
              className="w-full mb-24 md:mb-32 flex flex-col md:flex-row md:justify-center items-center md:items-stretch text-center md:text-left"
              key={index}
              data-aos={getAOSDirection(index)}
              data-aos-delay="200"
            >
              <img
                src={step.image}
                alt={step.title}
                className={`brightness-[100%] contrast-[90%] w-full md:w-1/2 object-scale-down ${
                  index % 2 === 0 ? "" : "md:order-2"
                }`}
                style={{ minHeight: "30vh" }}
              />
              <div
                className={`w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center md:items-start ${
                  index % 2 === 0 ? "md:pl-16" : "md:pr-16"
                }`}
                style={{ minHeight: "30vh" }}
              >
                <div className="flex items-center space-x-3 mb-4 md:mb-6">
                  {step.icon}
                  <h2 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-semibold text-white">
                    {step.title}
                  </h2>
                </div>
                <p className="text-sm sm:text-base md:text-xl leading-relaxed text-gray-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;