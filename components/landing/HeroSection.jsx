import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 text-center min-h-screen ">
      <div className="flex justify-between items-start">
        <div className="flex flex-col justify-start items-start gap-4 ml-14 text-left ">
          <h1 className="text-4xl md:text-6xl font-bold">Rethink Your Hiring Process.</h1>
          <h1 className="text-4xl md:text-3xl font-semibold mb-4 text-gray-600">
            The only place to find talented programmers.
          </h1>
          <h3 className="text-3xl md:text-5xl font-semibold bg-black text-white p-2 ">
            On-Demand Technical
            <br />
            Interviews.
          </h3>
          <h3 className="text-3xl md:text-5xl font-semibold bg-black text-white p-2">Pay as You Go.</h3>
          <h3 className="text-3xl md:text-5xl font-semibold bg-black text-white p-2">No Contract.</h3>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href={"/signup"}
              className="px-6 py-3 font-semibold text-white bg-black rounded-md shadow hover:bg-gray-900"
            >
              Get Started
            </Link>
          </div>
        </div>
        {/* Inline Image Below Buttons */}
        <div className="">
          <Image
            src="/hero.png"
            alt="EloStack Platform"
            width={882} // Adjusted for better fit
            height={336} // Maintained aspect ratio
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
