"use client";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect } from "react";

const HowItWorksSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Run animations only once
    });
  }, []);

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-4xl font-bold text-center text-black mb-12"
          data-aos="fade-up"
        >
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* For Companies */}
          <div className="space-y-6" data-aos="fade-right">
            <h3 className="text-2xl font-semibold text-center text-white mb-6">
              For Companies
            </h3>
            <div className="space-y-4">
              {[
                "Post Job Openings",
                "Browse Candidates",
                "Connect Directly",
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm hover:scale-105 transform transition-transform duration-300 ease-in-out"
                >
                  <h4 className="font-semibold text-lg mb-2">
                    {index + 1}. {step}
                  </h4>
                  <p>
                    {step === "Post Job Openings" &&
                      "Post your job openings on EloStack and specify your requirements."}
                    {step === "Browse Candidates" &&
                      "Browse through our pool of pre-evaluated candidates."}
                    {step === "Connect Directly" &&
                      "Select the candidates who meet your criteria and connect with them directly."}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* For Candidates */}
          <div className="space-y-6" data-aos="fade-left">
            <h3 className="text-2xl font-semibold text-center text-white mb-6">
              For Candidates
            </h3>
            <div className="space-y-4">
              {["Sign Up", "Receive Scores", "Get Discovered"].map(
                (step, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm hover:scale-105 transform transition-transform duration-300 ease-in-out"
                  >
                    <h4 className="font-semibold text-lg mb-2">
                      {index + 1}. {step}
                    </h4>
                    <p>
                      {step === "Sign Up" &&
                        "Sign up and complete your technical interviews with EloStack."}
                      {step === "Receive Scores" &&
                        "Receive your scores and become part of our candidate pool."}
                      {step === "Get Discovered" &&
                        "Get discovered by top companies looking for your skills."}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
