import Head from "next/head";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import HeroSection from "@/components/landing/HeroSection";
import FAQ from "@/components/landing/FAQ";
import Benefits from "@/components/landing/Benefits";
import PartneredCompanies from "@/components/landing/PartneredCompanies";
import HowItWorks from "@/components/landing/HowItWorks";
import Discount from "@/components/landing/Discount";

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
        {/* <PartneredCompanies /> */}
        <Benefits />
        <Discount />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default Home;
