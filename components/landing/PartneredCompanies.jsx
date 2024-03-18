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
  companies = [...companies];

  return (
    <section className="text-gray-500 body-font bg-[#0f0f1c] w-full">
      <div className="container pl-10 px-5 mx-auto h-full flex items-center flex-col w-full">
        <p className="text-xl font-bold text-gray-500 mb-10 mt-20">Partnered with</p>
        <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay interval={2000} transitionTime={1000} showArrows={false} showStatus={false} centerMode centerSlidePercentage={16.666} showIndicators={false}>
          {companies.map((company, index) => (
            <div key={index} className="px-4 flex items-center space-x-4 mr-10">
              <AiFillHome size="2em" />
              <h2 className="text-sm font-semibold text-gray-500">{company.name}</h2>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default PartneredCompanies;