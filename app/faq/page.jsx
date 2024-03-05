import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import FAQ from "@/components/individual/landing/FAQ";
import React from "react";

const page = () => {
  return (
    <main>
      <NavBar />
      <div className="mt-4">
        <FAQ />
      </div>
      <Footer />
    </main>
  );
};

export default page;
