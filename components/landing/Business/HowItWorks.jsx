"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLightbulb, FaSearch, FaHandshake } from "react-icons/fa"; // Icons for steps

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
      title: "Search for Candidates",
      description: "Browse through our extensive database of pre-screened software engineers who have completed technical interviews.",
      aos: "fade-up-right",
    },
    {
      title: "Review Interviews",
      description: "Access the recordings and detailed breakdowns of the candidates' mock interviews, including feedback and overall grades.",
      aos: "fade-up",
      delay: 100,
    },
    {
      title: "Connect and Hire",
      description: "Reach out to the most promising candidates, schedule further interviews, and make job offers directly through our platform.",
      aos: "fade-up-left",
      delay: 200,
    },
    // Add more steps as needed
  ];

  return (
    <section className="bg-[#0f0f1c] w-screen body-font">
      <div className="container px-4 sm:px-6 lg:px-8 mt-0 mb-[8rem] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold title-font mb-4 text-white"
            data-aos="zoom-in"
          >
            How EloStack Works for Businesses
          </h1>
          <p
            className="leading-relaxed xl:w-2/4 text-white text-base sm:text-lg md:text-xl lg:w-3/4 mx-auto"
            data-aos="zoom-in"
          >
            A step-by-step guide to our process, designed to streamline your hiring.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {steps.map((step, index) => (
            <div
              className="p-4 md:w-1/3"
              key={index}
              data-aos={step.aos}
              data-aos-delay={step.delay}
            >
              <div className="h-full card-gradient rounded-lg overflow-hidden shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-2 hover:scale-105">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 mb-2 sm:mb-4">
                    <h2 className="rounded-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-md bg-white font-[900] text-black">
                      {index + 1}
                    </h2>
                    <h2 className="text-lg sm:text-xl font-bold text-white">{step.title}</h2>
                  </div>
                  <p className="leading-relaxed mb-3 font-semibold text-sm sm:text-base text-white">
                    {step.description}
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

export default HowItWorks;