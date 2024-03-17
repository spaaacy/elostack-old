"use client";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Head from 'next/head';
import { FaRocket } from 'react-icons/fa';

const gradientTextStyle = css`
  display: inline-block;
  background: linear-gradient(to right, #3C1BD7, #7266F2); // Darker gradient from blue to purple
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const containerStyle = css`
  position: relative;
  background: radial-gradient(ellipse 60% 60% at 50% 40%, #0F172A, #1A1B2F 60%, #0f0f1c 80%); // Darker purple in gradient
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

const titleStyle = css`
  color: #fff; // White color
  font-size: 5rem; // Significantly larger font size
  margin-bottom: 20px;
  margin-top: -50px;
`;

const subtitleStyle = css`
  color: #FFFFFF; // Changed color
  font-size: 1.5rem; // Slightly larger font size
  margin-bottom: 40px;
`;


const buttonStyle = css`
  background-color: #5B1FD5; // Darker purple
  color: #fff;
  padding: 20px 30px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  margin-top:0.5rem;
  font-size: 1.2rem; // Increased font size
  cursor: pointer;
  transition: background-color 0.3s ease;
  animation: jump 1s infinite;

  @keyframes jump {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;





export default function Home() {
  return (
    <div css={containerStyle}>
      <Head>
        <title>EloStack</title>
      </Head>

      <div>
      <h1 css={titleStyle}>
  <FaRocket className="inline-block" color="#4D28D9" /> Your Software Engineering <br />
  <span css={gradientTextStyle}>Job Connection</span>
</h1>
        <p css={subtitleStyle}>
          We simplify the hiring process by conducting and <br /> managing the technical interviews ourselves.
        </p>
        <button css={buttonStyle}>
          Get started with EloStack
        </button>
        
      </div>
    </div>
  )
}

