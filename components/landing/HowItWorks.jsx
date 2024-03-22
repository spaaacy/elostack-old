"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLightbulb, FaRocket, FaHandsHelping } from "react-icons/fa"; // Icons for steps

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
      title: "Create a Request",
      description:
        "Start by creating a request for us to conduct a technical interview and booking any of the available opening.",
      aos: "fade-up-right",
    },
    {
      title: "Conduct Mock Interview",
      description:
        "You will be connected with our talented engineers who will and carry out an unbiased mock interview as per your specifications, assessing your skill.",
      aos: "fade-up",
      delay: 100,
    },
    {
      title: "Connect With Companies",
      description:
        "You will have access to the entire recording and breakdown of the mock interview with feedback and an overall grade. Using this, you can apply to jobs and companies can view your interview.",
      aos: "fade-up-left",
      delay: 200,
    },
    // Add more steps as needed
  ];

  return (
    <section className=" bg-[#0f0f1c] w-screen body-font">
      <div className="container px-5 mt-0 mb-[8rem] mx-auto">
        <div className="text-center mb-20">
          <h1 className=" text-5xl font-extrabold title-font mb-4 text-white " data-aos="zoom-in">
            How EloStack Works
          </h1>
          <p className=" leading-relaxed xl:w-2/4 text-white text-xl lg:w-3/4 mx-auto" data-aos="zoom-in">
            A step-by-step guide to our process, designed to ensure your success.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {steps.map((step, index) => (
            <div className="p-4 md:w-1/3" key={index} data-aos={step.aos} data-aos-delay={step.delay}>
              <div className="h-full card-gradient rounded-lg overflow-hidden shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-2 hover:scale-105  ">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <h2 className="rounded-full px-3 py-1 text-md bg-white font-[900] text-black">{index + 1}</h2>
                    <h2 className="text-xl font-bold text-white">{step.title}</h2>
                  </div>
                  <p className="leading-relaxed mb-3 font-semibold text-white">{step.description}</p>
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
