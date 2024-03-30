"use client";
import Head from "next/head";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import CompanyHeroSection from "@/components/landing/Business/CompanyHeroSection";
import CompanyBenefits from "@/components/landing/Business/CompanyBenefits";
import CompanyHowItWorks from "@/components/landing/Business/HowItWorks";
import CompanyFAQ from "@/components/landing/Business/FAQ";

const Company = () => {
  return (
    <>
      <NavBar />
      <Head>
        <title>EloStack - Elevate Your Hiring Process for Companies</title>
        <meta name="description" content="EloStack is a job listing and connection platform for software engineering jobs, streamlining the hiring process for companies." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center">
        <CompanyHeroSection />
        <CompanyBenefits />
        <CompanyHowItWorks />
        <CompanyFAQ />
      </main>
      <Footer />
    </>
  );
};

export default Company;