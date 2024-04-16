"use client";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const PartneredCompanies = () => {
  let companies = [
    { name: "Google", color: "#ffffff" },
    { name: "Microsoft", color: "#ffffff" },
    { name: "Tesla", color: "#ffffff" },
    { name: "Paypal", color: "#ffffff" },
    { name: "Netflix", color: "#ffffff" },
    { name: "Coinbase", color: "#ffffff" },
    { name: "LinkedIn1", color: "#ffffff" },
    { name: "Reddit", color: "#ffffff" },
    { name: "Airbnb1", color: "#ffffff" },
    // Add more companies as needed
  ];

  const whiteTextCompanies = [
    "TikTok",
    "Github",

  ];

  return (
    <section className="text-gray-500 body-font w-full py-4 pb-16">
      <div className="container px-5 mx-auto h-full flex items-center flex-col w-full">
        <p className="text-xl font-bold text-gray-300 mb-10"></p>
        <Marquee speed={20} gradientWidth={0}>
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-[7.5rem] w-[9.5rem] p-2 mx-4"
            >
              <Image
                className={`object-contain ${
                  whiteTextCompanies.includes(company.name) ? "invert" : ""
                }`}
                alt={company.name}
                width={120}
                height={80}
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_STORAGE_PATH}/company-logos/${company.name.toLowerCase()}.png`}
              />
            </div>
          ))}
        </Marquee>
        <p className="text-xs mt-4">
          * We are not directly affiliated with these companies. These only
          represent a few of the companies we have on our database
        </p>
      </div>
    </section>
  );
};

export default PartneredCompanies;