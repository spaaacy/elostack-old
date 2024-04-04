import Head from "next/head";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import HeroSection from "@/components/landing/Individual/HeroSection";
import FAQ from "@/components/landing/Individual/FAQ";
import Benefits from "@/components/landing/Individual/Benefits";
import HowItWorks from "@/components/landing/Individual/HowItWorks";
import Discount from "@/components/landing/Individual/Discount";
import PartneredCompanies from "@/components/landing/PartneredCompanies";
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

      <main className="flex flex-col items-center">
        <HeroSection />
        
        <Benefits />
        <PartneredCompanies />
        {/* <Discount /> */}
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default Home;
