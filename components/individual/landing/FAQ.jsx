"use client";
// components/FAQ.tsx
import React, { useState, useRef, useEffect } from "react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen, contentRef]);

  return (
    <div
      data-aos="fade-up"
      className="mb-2 overflow-hidden transition-shadow duration-300 bg-white shadow-md rounded-lg"
    >
      <button
        className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: `${maxHeight}` }}
        className="transition-max-height duration-500 ease-in-out"
      >
        <div className="px-5 pt-0 pb-5 text-gray-700">{answer}</div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How does EloStack simplify the hiring process?",
      answer:
        "EloStack conducts and manages technical interviews, allowing companies to browse through a pool of pre-evaluated candidates and select those who meet their specific requirements. This makes the hiring process more efficient and cost-effective.",
    },
    {
      question: "What makes EloStack different from other job platforms?",
      answer:
        "Unlike traditional job platforms, EloStack focuses specifically on software engineering jobs and addresses the inefficiencies in the hiring process by managing the technical interviews ourselves.",
    },
    {
      question: "How can candidates prepare for technical interviews on EloStack?",
      answer:
        "Candidates can prepare for technical interviews on EloStack by practicing coding problems, reviewing computer science fundamentals, and familiarizing themselves with common interview questions in software engineering.",
    },
    {
      question: "What types of companies use EloStack for hiring?",
      answer:
        "A wide range of companies, from startups to large enterprises, use EloStack to streamline their hiring process for software engineering roles. Our platform caters to industries across the technology sector.",
    },
    {
      question: "How does EloStack simplify the hiring process?",
      answer:
        "EloStack conducts and manages technical interviews, allowing companies to browse through a pool of pre-evaluated candidates and select those who meet their specific requirements. This makes the hiring process more efficient and cost-effective.",
    },
    {
      question: "What makes EloStack different from other job platforms?",
      answer:
        "Unlike traditional job platforms, EloStack focuses specifically on software engineering jobs and addresses the inefficiencies in the hiring process by managing the technical interviews ourselves.",
    },
    {
      question: "How can candidates prepare for technical interviews on EloStack?",
      answer:
        "Candidates can prepare for technical interviews on EloStack by practicing coding problems, reviewing computer science fundamentals, and familiarizing themselves with common interview questions in software engineering.",
    },
    {
      question: "What types of companies use EloStack for hiring?",
      answer:
        "A wide range of companies, from startups to large enterprises, use EloStack to streamline their hiring process for software engineering roles. Our platform caters to industries across the technology sector.",
    },
    // Add more FAQs as needed
  ];

  return (
    <div className="w-full px-4 py-12 mt-[1rem] mx-auto max-w-7xl">
      <h2 className="mb-8 text-5xl font-extrabold text-center text-blueprimary">Frequently Asked Questions</h2>
      <div className="space-y-4 mb-[9rem]">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
