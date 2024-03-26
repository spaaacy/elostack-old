"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import internal from "stream";

const Discount = () => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const endDate = new Date("2024-04-08");

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

  if (!timeRemaining) return;
  return (
    <footer className=" py-2 w-full mb-12">
      <div className="container px-4">
        <div className="flex flex-1 justify-center items-center space-x-4">
          <p className="text-white text-md font-semibold mr-4">
            👉 Get your first interview with us{" "}
            <span
              className="ml-2 text-white p-2 rounded-lg"
              style={{ background: "linear-gradient(135deg, #FF57B9 0%,#A704FD 100%)" }}
            >
              100% OFF
            </span>
          </p>
          <div className="grid grid-flow-col gap-2 items-center bg-[#1c1c28] rounded-lg py-1 px-2 shadow-md">
            {timeRemaining && (
              <>
                <div className="text-center">
                  <p className="text-white text-md font-bold">{timeRemaining.days}</p>
                  <p className="text-gray-400 text-xs font-medium uppercase">Days</p>
                </div>
                <p className="text-white text-md font-bold">:</p>
                <div className="text-center">
                  <p className="text-white text-md font-bold">{timeRemaining.hours}</p>
                  <p className="text-gray-400 text-xs font-medium uppercase">Hours</p>
                </div>
                <p className="text-white text-md font-bold">:</p>
                <div className="text-center">
                  <p className="text-white text-md font-bold">{timeRemaining.minutes}</p>
                  <p className="text-gray-400 text-xs font-medium uppercase">Minutes</p>
                </div>
                <p className="text-white text-md font-bold">:</p>
                <div className="text-center">
                  <p className="text-white text-md font-bold">{timeRemaining.seconds}</p>
                  <p className="text-gray-400 text-xs font-medium uppercase">Seconds</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Discount;
