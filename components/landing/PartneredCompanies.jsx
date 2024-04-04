"use client";
import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AiFillHome } from 'react-icons/ai';

const PartneredCompanies = () => {
  let companies = [
    { name: "Google" },
    { name: "Microsoft" },
    { name: "Apple" },
    { name: "Amazon" },
    { name: "Facebook" },
    { name: "Tesla" },
    { name: "Netflix" },
    { name: "Adobe" },
    { name: "Salesforce" },
    { name: "Oracle" },
    { name: "IBM" },
    { name: "Intel" },
    // Add more companies as needed
  ];

  // Duplicate the companies array multiple times to create a longer loop
  companies = [...companies, ...companies, ...companies];

  return (
    <section className="text-gray-500 body-font  w-[200rem] py-4 pb-16">
      <div className="container px-5 mx-auto h-full flex items-center flex-col w-full">
        <p className="text-xl font-bold text-gray-300 mb-10"></p>
        <Carousel
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          interval={2000}
          transitionTime={1000}
          showArrows={false}
          showStatus={false}
          centerMode
          centerSlidePercentage={20}
          showIndicators={false}
          className="w-full"
        >
          {companies.map((company, index) => (
            <div key={index} className="px-8 flex items-center space-x-4">
              <AiFillHome size="2em" className="text-purple-500" />
              <h2 className="text-lg font-semibold text-white">{company.name}</h2>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default PartneredCompanies;