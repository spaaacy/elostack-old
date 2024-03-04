import Head from "next/head";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import HeroSection from "@/components/individual/landing/HeroSection";
import HowItWorks from "@/components/individual/landing/HowItWorks";
import BenefitsSection from "@/components/individual/landing/BenefitsSection";

import FAQ from "@/components/individual/landing/FAQ";
const Home = () => {
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
