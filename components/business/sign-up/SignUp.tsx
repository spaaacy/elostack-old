"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const Signup: React.FC = () => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBusiness, setIsBusiness] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isBusiness ? "Business signed up:" : "Individual signed up:", {
      businessName,
      email,
      password,
    });
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <Head>
        <title>
          {isBusiness ? "Business Signup" : "Individual Signup"} | EloStack
        </title>
      </Head>

      <main className="container mx-auto p-8 bg-white rounded-lg shadow-md mt-20 flex justify-center items-center">
        <section className="grid md:grid-cols-2 gap-4">
          <div className="p-8 text-center md:text-left border-r border-gray-200 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-blueprimary">
              {isBusiness ? "Business Signup" : "Individual Signup"}
            </h2>
            <p className="text-md text-gray-500 text-center">
              {isBusiness
                ? "Join EloStack and streamline your hiring process. Find top talent, conduct efficient technical interviews, and hire with confidence."
                : "Join EloStack and find your next job. Get matched with top companies, showcase your skills, and ace your interviews."}
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSignup}>
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setIsBusiness(false)}
                  className={`font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline mx-2 ${
                    isBusiness
                      ? "bg-gray-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  Individual Signup
                </button>
                <button
                  onClick={() => setIsBusiness(true)}
                  className={`font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline mx-2 ${
                    isBusiness
                      ? "bg-blue-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  Business Signup
                </button>
              </div>

              {isBusiness ? (
                <div className="mb-4">
                  <label
                    htmlFor="businessName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Business Name:
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      First Name:
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastName"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </>
              )}

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href="/business/sign-in"
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                  Already have an account? Sign In
                </Link>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </main>
  );
};

export default Signup;
