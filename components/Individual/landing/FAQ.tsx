import React from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa'; // Icon for FAQs

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: 'How do I get started?',
      answer: 'Getting started is simple. Just contact us through our website, and we’ll guide you through the process.',
      icon: <FaRegQuestionCircle className="text-blue-500" size={20} />,
    },
    {
      question: 'What is the typical turnaround time?',
      answer: 'Turnaround times vary by project, but we always aim to deliver with efficiency and high quality.',
      icon: <FaRegQuestionCircle className="text-blue-500" size={20} />,
    },
    {
      question: 'Do you offer ongoing support?',
      answer: 'Absolutely! We’re here to support you long-term, ensuring your continued success.',
      icon: <FaRegQuestionCircle className="text-blue-500" size={20} />,
    },
    // Add more FAQs as needed
  ];

  return (
    <div className="mt-20">
      <h2 className="text-center text-2xl font-medium title-font mb-4 text-gray-900">Frequently Asked Questions</h2>
      <div className="flex flex-wrap">
        {faqs.map((faq, index) => (
          <div className="w-full md:w-1/2 px-4 py-2" key={index}>
            <div className="h-full bg-gray-100 bg-opacity-75 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {faq.icon}
                <h3 className="ml-2 text-lg font-semibold text-gray-900">{faq.question}</h3>
              </div>
              <p className="leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
