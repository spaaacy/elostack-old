"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Head from "next/head";
import Link from "next/link";
import { FaRocket } from "react-icons/fa";

const gradientTextStyle = css`
  display: inline-block;
  background: linear-gradient(to right, #6f2da8, #7266f2);
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
  );
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 0 20px;
  text-align: center;
`;

const buttonStyle = css`
  background-color: #6f2da8;
  color: #fff;
  padding: 20px 30px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  margin-top: 0.5rem;
  font-size: 1.2rem;
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
    <>
      <Head>
        <title>EloStack</title>
      </Head>
      <main css={containerStyle}>
        <h1 className="text-white text-5xl md:text-8xl mb-5">
          <FaRocket className="inline-block" color="#6f2da8" aria-hidden="true" />
          Your Software Engineering <br />
          <span css={gradientTextStyle}>Job Connection Platform</span>
        </h1>
        <h2 className="text-white text-xl md:text-2xl mb-10">
          Don't wait for employers to interview you. <br />
          Let your mock interview do the talking.
        </h2>
        <Link href={"/dashboard"}>
          <button css={buttonStyle}>Get Started with EloStack</button>
        </Link>
      </main>
    </>
  );
}