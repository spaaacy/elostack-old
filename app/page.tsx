import type { NextPage } from "next";
import Head from "next/head";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import HeroSection from "@/components/Individual/landing/HeroSection";
import HowItWorks from "@/components/Individual/landing/HowItWorks";
import BenefitsSection from "@/components/Individual/landing/BenefitsSection";

import FAQ from "@/components/Individual/landing/FAQ";
const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <Head>
        <title>EloStack - Elevate Your Hiring Process</title>
        <meta
          name="description"
          content="EloStack is a job listing and connection platform for software engineering jobs, streamlining the hiring process."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col">
        <HeroSection />

        <HowItWorks />
        <BenefitsSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default Home;
