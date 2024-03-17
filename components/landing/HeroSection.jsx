"use client";
/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import Head from 'next/head';
import { FaRocket } from 'react-icons/fa';

const gradientTextStyle = css`
  display: inline-block;
  background: linear-gradient(to right, #4D28D9, #887BFA); // Gradient from blue to purple
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const containerStyle = css`
  background: radial-gradient(circle at center, #0F172A, #1C1D35, #000);
  color: #ddd; // Lighter than white for a darker look
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 0 20px;
  text-align: center;
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
  background-color: #6D28D9;
  color: #fff;
  padding: 20px 30px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  margin-top: 1.5rem;
  font-size: 1.2rem; // Increased font size
  cursor: pointer;
  transition: background-color 0.3s ease;
  animation: jump 1s infinite;

  @keyframes jump {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;

const githubCornerStyle = css`
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  font-size: 2.5rem;
  padding: 10px;
`;

const rowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const imageStyle = css`
  width: 300px;
  height: 300px;
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

