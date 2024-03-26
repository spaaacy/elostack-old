"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaQuestionCircle } from "react-icons/fa"; // Importing an icon from react-icons

const FAQContext = createContext();

const FAQProvider = ({ children }) => {
  const [faqs, setFaqs] = useState([
    {
      question: "How can EloStack help my company find the right candidates?",
      answer:
        "EloStack provides a platform where you can access a pool of pre-vetted software engineers who have completed technical mock interviews. This allows you to quickly identify skilled candidates and streamline your hiring process.",
    },
    {
      question: "What makes EloStack different from other job platforms?",
      answer:
        "EloStack focuses specifically on software engineers and provides in-depth technical mock interviews for each candidate. This ensures that you have access to detailed insights into a candidate's skills and abilities before proceeding with the hiring process.",
    },
    {
      question: "Can we customize the interview process for our company's specific needs?",
      answer:
        "Absolutely. We work closely with our partner companies to tailor the interview process to their specific requirements. This ensures that you can assess candidates based on the skills and qualifications that matter most to your organization.",
    },
    {
      question: "How much does it cost to use EloStack's services?",
      answer: "We offer flexible pricing plans based on your company's needs. Please contact our sales team for more information on pricing and packages.",
    },
    {
      question: "How can we integrate EloStack into our existing hiring workflow?",
      answer: "Our platform is designed to seamlessly integrate with your existing hiring processes. We provide API access and custom integrations to ensure a smooth transition and efficient collaboration between EloStack and your company's systems.",
    },
  ]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return <FAQContext.Provider value={{ faqs }}>{children}</FAQContext.Provider>;
};

FAQProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useFAQs = () => useContext(FAQContext);

const FAQList = () => {
  const { faqs } = useFAQs();

  return (
    <div className="space-y-4 mb-[9rem]">
      {faqs.map((faq, index) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
          <div key={index} className="bg-gray-800 p-6 rounded-md" data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              <div className="flex items-center">
                {" "}
                {/* Added a div to wrap the icon and the question */}
                <FaQuestionCircle className="mr-2" /> {/* Added an icon before the question */}
                <h3 className="text-white font-bold">{faq.question}</h3>
              </div>
              <span
                className={`transform transition-transform   ${
                  isOpen ? "rotate-180 duration-500 ease-in-out  border-white border-2" : " duration-10 ease-in-out"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-white"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              <p className="text-white p-2">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Page = () => {
  return (
    <FAQProvider>
      <main className="bg-[#0f0f1c] text-white w-full">
        <NavBar />
        <div className="w-full px-4 py-12 mt-[1rem] mx-auto max-w-7xl">
          <h2 className="mb-8 text-5xl font-extrabold text-center text-white" data-aos="zoom-in">
            Frequently Asked Questions for Businesses
          </h2>
          <FAQList />
        </div>
      </main>
    </FAQProvider>
  );
};

export default Page;