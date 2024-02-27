"use client";

import React, { useState } from "react";
import BusinessSignUpForm from "./BusinessSignUpForm"; // Ensure the path is correct
import IndividualSignUpForm from "./IndividualSignUpForm"; // Ensure the path is correct

const SignUp = () => {
  const [isBusiness, setIsBusiness] = useState(false);

  const formContainerStyle = {
    width: "115rem",
    marginLeft: "61.3rem", // Moves the form to the right
    marginTop: "-35rem", // The form will be positioned at the top of its container
  };

  return (
    <div>
      <div className="h-full -ml-[14.5rem] w-1/2 flex flex-col justify-center items-center mb-13">
        <div className="text-7xl  text-blueprimary font-semibold">EloStack</div>
        <div className="text-black text-2xl mt-4 mb-14">
          A platform for developers to showcase their skills as an individual
        </div>
      </div>
      <div className="mb-5 flex justify-center items-center">
        <div className="-mt-[92rem]">
          <button
            onClick={() => setIsBusiness(true)}
            className={`px-4 py-2 mx-2 rounded ml-[4rem] ${
              isBusiness
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Business
          </button>
          <button
            onClick={() => setIsBusiness(false)}
            className={`px-4 py-2 mx-2 rounded ${
              !isBusiness
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Individual
          </button>
        </div>
      </div>
      <div style={formContainerStyle}>
        {isBusiness ? <BusinessSignUpForm /> : <IndividualSignUpForm />}
      </div>
    </div>
  );
};

export default SignUp;
