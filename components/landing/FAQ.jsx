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
      question: "What is email automation?",
      answer:
        "Email automation is the process of sending targeted, personalized emails to your subscribers based on their behavior, preferences, and interactions with your website or brand.",
    },
    {
      question: "How can email automation benefit my business?",
      answer:
        "Email automation can help you nurture leads, increase customer engagement, drive sales, and save time by automating repetitive email tasks. It allows you to send the right message to the right person at the right time.",
    },
    {
      question: "Do I need technical skills to use your email automation platform?",
      answer:
        "No, our email automation platform is designed to be user-friendly and intuitive. You can easily create and manage email campaigns without any coding or technical expertise.",
    },
    {
      question: "Will I get marked as spam?",
      answer:
        "No. We take precautions to ensure your emails are not spammed to the receiver. Emails are sent every 30 minutes from 8 AM EDT to 8 PM EDT one at a time, with a maximum of 24 emails sent a day.",
    },
    {
      question: "How do you ensure the deliverability of automated emails?",
      answer:
        "We follow best practices for email deliverability, including maintaining a good sender reputation, using proper authentication protocols, and providing guidance on creating engaging and spam-free content.",
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
            Frequently Asked Questions
          </h2>
          <FAQList />
        </div>
      </main>
    </FAQProvider>
  );
};

export default Page;
