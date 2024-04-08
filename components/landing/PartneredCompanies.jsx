"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AiFillHome } from "react-icons/ai";
import Image from "next/image";

const PartneredCompanies = () => {
  let companies = [
    { name: "Google" },
    { name: "Microsoft" },
    { name: "Amazon" },
    { name: "Meta" },
    { name: "Netflix" },
    { name: "Coinbase" },
    { name: "Uber" },
    { name: "Nvidia" },
    { name: "LinkedIn" },
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
            <div key={index} className="px-8 flex items-center space-x-4 h-[75px] w-[150px]">
              <Image
                className="object-contain"
                alt={company.name}
                width={150}
                height={75}
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/${
                  process.env.NEXT_PUBLIC_STORAGE_PATH
                }/company-logos/${company.name.toLowerCase()}.png`}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default PartneredCompanies;
