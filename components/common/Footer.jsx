"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const Footer = () => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-[#0f0f1c] py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm font-medium inline-block mr-4">
              Copyright © 2024 EloStack, Inc. All Rights Reserved.
            </p>
            <Link
              href="/terms-and-conditions.html"
              className="text-gray-400 text-sm font-medium hover:text-white transition duration-300 inline-block"
            >
              Terms & Conditions
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-white text-lg font-semibold">
              Your First Interview with{" "}
              <span className="text-purple-400">100% OFF</span>
            </p>
            <div className="grid grid-flow-col gap-2 items-center bg-[#1c1c28] rounded-lg p-2 shadow-md">
              {timeRemaining && (
                <>
                  <div className="text-center">
                    <p className="text-white text-lg font-bold">{timeRemaining.days}</p>
                    <p className="text-gray-400 text-xs font-medium uppercase">Days</p>
                  </div>
                  <p className="text-white text-lg font-bold">:</p>
                  <div className="text-center">
                    <p className="text-white text-lg font-bold">{timeRemaining.hours}</p>
                    <p className="text-gray-400 text-xs font-medium uppercase">Hours</p>
                  </div>
                  <p className="text-white text-lg font-bold">:</p>
                  <div className="text-center">
                    <p className="text-white text-lg font-bold">{timeRemaining.minutes}</p>
                    <p className="text-gray-400 text-xs font-medium uppercase">Minutes</p>
                  </div>
                  <p className="text-white text-lg font-bold">:</p>
                  <div className="text-center">
                    <p className="text-white text-lg font-bold">{timeRemaining.seconds}</p>
                    <p className="text-gray-400 text-xs font-medium uppercase">Seconds</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;