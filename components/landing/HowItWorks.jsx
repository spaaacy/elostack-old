"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FaUserCircle, FaMicrophone, FaUserTie, FaBuilding, FaBriefcase } from "react-icons/fa";
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
      title: "Create Your Profile",
      description:
        "Sign up and tell us about your skills and preferences. This is your first step towards your dream job.",
      aos: "fade-up-right",
      icon: <FaUserCircle className="text-4xl text-purple-500" />,
      image: "path_to_placeholder_image", // Add your placeholder image path here
    },
    {
      title: "Interview with Us",
      description:
        "Request and complete a technical interview. Our experts will assess your skills in a fair and unbiased manner.",
      aos: "fade-up",
      delay: 100,
      icon: <FaMicrophone className="text-4xl text-blue-500" />,
      image: "path_to_placeholder_image", // Add your placeholder image path here
    },
    {
      title: "Get Matched & Apply",
      description:
        "We showcase your profile to potential employers. Apply to jobs on our platform and get recommendations based on your skills and preferences.",
      aos: "fade-up-left",
      delay: 200,
      icon: <FaBriefcase className="text-4xl text-red-500" />,
      image: "path_to_placeholder_image", // Add your placeholder image path here
    },
  ];

  return (
    <section className="text-white body-font bg-[#0f0f1c] w-screen h-screen">
      <div className="container px-5 mt-0 mb-[8rem] mx-auto h-full flex flex-col justify-center">
        <div className="text-center mb-20">
          <h1 className=" text-5xl font-extrabold title-font mb-4 text-white " data-aos="zoom-in">
            How EloStack Works
          </h1>
          <p className=" leading-relaxed xl:w-2/4  text-white text-xl lg:w-3/4 mx-auto" data-aos="zoom-in">
            A step-by-step guide to our process, designed to ensure your success.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div className="p-4" key={index} data-aos={step.aos} data-aos-delay={step.delay}>
              <div className="h-full bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:-translate-y-2 hover:scale-105  border border-gray-700">
                <img src={step.image} alt={step.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    {step.icon}
                    <h2 className="text-xl font-semibold text-white">{step.title}</h2>
                  </div>
                  <p className="leading-relaxed mb-3 text-gray-300">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;