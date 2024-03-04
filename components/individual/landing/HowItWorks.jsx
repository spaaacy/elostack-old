"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLightbulb, FaRocket, FaHandsHelping } from "react-icons/fa"; // Icons for steps

const HowItWorksPage = () => {
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
      icon: <FaLightbulb className="text-yellow-500" size={30} />,
      title: "Discover & Plan",
      description: "Embark on a journey of discovery to tailor a strategy that aligns with your vision and objectives.",
      highlights: ["- Comprehensive Needs Analysis", "- Custom Strategy Development", "- Setting Measurable Goals"],
      aos: "fade-up-right",
    },
    {
      icon: <FaRocket className="text-red-500" size={30} />,
      title: "Launch & Execute",
      description:
        "With precision and agility, we deploy your bespoke strategy, harnessing cutting-edge tools for peak performance.",
      highlights: ["- Precision Execution", "- State-of-the-Art Tools", "- Continuous Monitoring & Updates"],
      aos: "fade-up",
      delay: 100,
    },
    {
      icon: <FaHandsHelping className="text-green-500" size={30} />,
      title: "Support & Grow",
      description:
        "Our commitment to your growth is unwavering, with adaptive support and optimization to propel you forward.",
      highlights: ["- Dedicated Ongoing Support", "- Performance Optimization", "- Growth and Scaling Strategies"],
      aos: "fade-up-left",
      delay: 200,
    },
    // Add more steps as needed
  ];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1
            className=" text-5xl font-bold title-font mb-4 text-blueprimary"
            data-aos="zoom-in"
            style={{ textShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            How EloStack Works
          </h1>
          <p className=" leading-relaxed xl:w-2/4  text-black text-xl lg:w-3/4 mx-auto">
            A step-by-step guide to our process, designed to ensure your success.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {steps.map((step, index) => (
            <div className="p-4 md:w-1/3" key={index} data-aos={step.aos} data-aos-delay={step.delay}>
              <div className="h-full bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-105">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    {step.icon}
                    <h2 className="text-xl font-semibold text-gray-900">{step.title}</h2>
                  </div>
                  <p className="leading-relaxed mb-3">{step.description}</p>
                  {step.highlights.map((highlight, i) => (
                    <p key={i} className="text-gray-700 mb-2">
                      {highlight}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksPage;
