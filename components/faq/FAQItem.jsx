"use client";

import { useState, useRef, useEffect } from "react";

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
        <div className="px-5 pt-2 pb-5 text-gray-700">{answer}</div>
      </div>
    </div>
  );
};

export default FAQItem;
