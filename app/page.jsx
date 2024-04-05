"use client";

import Head from "next/head";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import HeroSection from "@/components/landing/HeroSection";
import FAQ from "@/components/landing/FAQ";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import PartneredCompanies from "@/components/landing/PartneredCompanies";
import React, { Suspense, useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "@/context/UserContext";

const Page = () => {
  return (
    <>
      <NavBar />
      <Head>
        <title>EloStack</title>
        <meta
          name="description"
          content="EloStack is a job listing and connection platform for software engineering jobs, streamlining the hiring process."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense>
        <Home />
      </Suspense>
      <Footer />
    </>
  );
};

const Home = () => {
  const { session } = useContext(UserContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadData = async () => {
      if (session.data?.session) {
        await fetchUser();
      }
    };

    if (session) {
      if (searchParams.has("code") && searchParams.has("scope")) {
        handleEmailGranted();
      }
      loadData();
    }
  }, [session]);

  const handleEmailGranted = async () => {
    if (!session) return;
    const userId = session.data.session?.user.id;
    const response = await fetch("/api/oauth/save-permission", {
      method: "POST",
      headers: {
        "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
      },
      body: JSON.stringify({
        code: searchParams.get("code"),
        user_id: userId,
      }),
    });
    if (response.status === 201) {
      toast.success("Permission granted!");
    }
  };

  const fetchUser = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      console.log(response);
      if (response.status !== 200) {
        router.push("/signup?complete-registration=true");
      }
    }
  };

  return (
    <main className="flex flex-col items-center">
      <HeroSection />

      <Benefits />
      <PartneredCompanies />
      {/* <Discount /> */}
      <HowItWorks />
      <FAQ />
      <Toaster />
    </main>
  );
};

export default Page;
