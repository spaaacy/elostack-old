"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaQuestionCircle } from 'react-icons/fa'; // Importing an icon from react-icons

const FAQContext = createContext();

const FAQProvider = ({ children }) => {
  const [faqs, setFaqs] = useState([
    {
      question: "How can EloStack help me as a candidate?",
      answer:
        "EloStack provides a platform for you to showcase your skills to potential employers. We conduct technical interviews which are then accessible to companies looking for engineers, increasing your visibility and chances of getting hired.",
    },
    {
      question: "What is EloStack exactly?",
      answer:
        "EloStack is a job listing website dedicated to software engineers. All candidates on our site are pre-vetted using technical interviews, which are accessible to companies looking for engineers.",
    },
    {
      question: "What if I am unsatisfied with the interview?",
      answer: "We strive to provide a fair assessment of your skills. If you're unsatisfied with the interview, please contact our support team and we'll do our best to address your concerns.",
    },
    {
      question: "How much do you charge?",
      answer:
        "EloStack is free for candidates. We believe in providing equal opportunities for all engineers, and we don't want cost to be a barrier.",
    },
    {
      question: "Can I choose the topics for my interviews?",
      answer: "Yes. When scheduling an interview, you can specify the topics you'd like to be interviewed on.",
    },
    {
      question: "What if I am unsatisfied with the interview?",
      answer: "We strive to provide a fair assessment of your skills. If you're unsatisfied with the interview, please contact our support team and we'll do our best to address your concerns.",
    },

  ]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <FAQContext.Provider value={{ faqs }}>
      {children}
    </FAQContext.Provider>
  );
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
              <div className="flex items-center"> {/* Added a div to wrap the icon and the question */}
                <FaQuestionCircle className="mr-2" /> {/* Added an icon before the question */}
                <h3 className="text-white font-bold">{faq.question}</h3>
              </div>
              <span className={`transform transition-transform   ${isOpen ? 'rotate-180 duration-500 ease-in-out  border-white border-2' : ' duration-10 ease-in-out'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
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
          <h2 className="mb-8 text-5xl font-extrabold text-center text-white" data-aos="zoom-in">Frequently Asked Questions</h2>
          <FAQList />
        </div>
      </main>
    </FAQProvider>
  );
};

export default Page;