import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 text-center bg-white text-blueprimary">
      <div className="space-y-6">
        <h1 className="text-5xl  w-[70rem] font-bold md:text-6xl mt-[3rem]">
          Revolutionize Your Hiring Process with EloStack
        </h1>
        <p className="text-lg font-bold text-black mx-auto">
          Discover a new era of technical hiring - streamlined, efficient, and transparent.
        </p>
        {/* <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="#discover"
            className="px-6 py-3 text-sm font-semibold text-blue-600 bg-white border border-blue-600 rounded-md shadow hover:bg-gray-50"
          >
            Discover How
          </a>
          <a
            href="#contact"
            className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700"
          >
            Get In Touch
          </a>
        </div> */}
        {/* Inline Image Below Buttons */}
        <div className="ml-[4rem]">
          <Image
            src="/hero.png"
            alt="EloStack Platform"
            width={1050} // Adjusted for better fit
            height={400} // Maintained aspect ratio
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
