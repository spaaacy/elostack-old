import type { NextPage } from "next";
import Head from "next/head";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/Individual/landing/HeroSection";
import HowItWorks from "@/components/Individual/landing/HowItWorks";
import BenefitsSection from "@/components/Individual/landing/BenefitsSection";
import TestimonialsSection from "@/components/Individual/landing/TestimonialsSection";
import CallToActionSection from "@/components/Individual/landing/CallToActionSection";

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
        <TestimonialsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
