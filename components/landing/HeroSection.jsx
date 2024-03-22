"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Head from "next/head";
import Link from "next/link";
import { FaRocket } from "react-icons/fa";

const gradientTextStyle = css`
  display: inline-block;
  background: linear-gradient(to right, #3c1bd7, #7266f2); // Darker gradient from blue to purple
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const containerStyle = css`
  position: relative;
  background: radial-gradient(
    ellipse 60% 60% at 52% 49%,
    #0f172a,
    #1a1b2f 60%,
    #0f0f1c 80%
  ); // Darker purple in gradient
  color: #fff; // Lighter than white for a darker look
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120vh;
  width: 100vw;
  padding: 0 20px;
  text-align: center;

  &::after {
    content: "";
    display: block;
    height: 10vh;
  }
`;

const buttonStyle = css`
  background-color: #5b1fd5; // Darker purple
  color: #fff;
  padding: 20px 30px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  margin-top: 0.5rem;
  font-size: 1.2rem; // Increased font size
  cursor: pointer;
  transition: background-color 0.3s ease;
  animation: jump 5s infinite;

  @keyframes jump {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;

export default function Home() {
  return (
    <div css={containerStyle}>
      <Head>
        <title>EloStack</title>
      </Head>

      <div>
        <h1 className="text-white text-5xl md:text-8xl mb-5 -mt-[50px]">
          <FaRocket className="inline-block" color="#4D28D9" /> Your Software Engineering
          <br />
          <span css={gradientTextStyle}>Job Connection Platform</span>
        </h1>
        <h2 className="text-white text-xl md:text-2xl mb-[40px]">
          Don't wait for employers to interview you.
          <br />
          Let your mock interview do the talking.
        </h2>
        <Link href={"/dashboard"}>
          <button css={buttonStyle}> Get Started with EloStack</button>
        </Link>
      </div>
    </div>
  );
}
