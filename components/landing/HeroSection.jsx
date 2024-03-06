import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 text-center min-h-screen bg-white">
      <div className="flex justify-between items-start">
        <div className="flex flex-col justify-start items-start gap-4 ml-14 text-left ">
          <h1 className="text-4xl md:text-6xl font-bold text-blueprimary">Rethink Your Hiring Process</h1>
          <h1 className="text-4xl md:text-3xl font-bold mb-0 text-black">
            The only place to find talented programmers
          </h1>
          
          <p className="text-2xl md:text-3xl  mb-4 text-black">
            Join us and make your hiring process easier
          </p>

          {/* Add your checklist here */}
          <ul className="list-none text-black ml-[5rem]">
            <li className="p-2 text-lg flex items-center font-semibold">
              <Image src="/checked.png" alt="Checked" width={24} height={24} />
              <span className="ml-4"> On-Demand Technical Interviews</span>
            </li>
            <li className="p-2 text-lg flex items-center font-semibold">
              <Image src="/checked.png" alt="Checked" width={24} height={24} />
              <span className="ml-4">Pay as You Go</span>
            </li>
            <li className="p-2 text-lg flex items-center font-semibold">
              <Image src="/checked.png" alt="Checked" width={24} height={24} />
              <span className="ml-4">24/7 Support</span>
            </li>
            <li className="p-2 text-lg flex items-center font-semibold">
              <Image src="/checked.png" alt="Checked" width={24} height={24} />
              <span className="ml-4">No Contract</span>
            </li>
          </ul>

          <div className="flex flex-wrap justify-start gap-4 mt-2">
            <Link
              href={"/signup"}
              className="px-6 py-3 font-semibold text-white bg-blueprimary rounded-md shadow-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
        {/* Inline Image Below Buttons */}
        <div className="ml-10">
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
{/* <h3 className="text-3xl md:text-5xl font-semibold  text-black p-2 ">
            On-Demand Technical
            <br />
            Interviews.
          </h3> */}
{/* <h3 className="text-3xl md:text-5xl font-semibold  text-black p-2">Pay as You Go.</h3>
<h3 className="text-3xl md:text-5xl font-semibold  text-black p-2">No Contract.</h3> */}