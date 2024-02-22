"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { CreateJob } from "@/components/business/CreateJob";
import ViewListings from "@/components/business/ViewListings";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

enum SelectedButton {
  Create,
  View,
}

const Business = () => {
  // TODO: Change this to use context
  const [isAuth, setIsAuth] = useState(true);
  const [selectedButton, setSelectedButton] = useState(SelectedButton.View);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
  }, []);

  return (
    <main className="flex flex-col flex-1">
      <NavBar />
      <div className="px-4 flex max-width w-full flex-1">
        <div className="flex flex-col items-start gap-4">
          <button
            className={`outline-button w-[180px] ${
              selectedButton === SelectedButton.View ? "bg-blueprimary border-blueprimary text-white font-bold" : ""
            }`}
            onClick={() => setSelectedButton(SelectedButton.View)}
          >
            View listing
          </button>
          <button
            className={`outline-button w-[180px] ${
              selectedButton === SelectedButton.Create ? "bg-blueprimary border-blueprimary text-white font-bold" : ""
            }`}
            onClick={() => setSelectedButton(SelectedButton.Create)}
          >
            Create job listing
          </button>
        </div>
        <div className="mx-4 w-[1px] bg-gray-400" />
        <div className="flex flex-col items-start w-full">
          {selectedButton === SelectedButton.Create ? <CreateJob /> : <ViewListings />}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Business;
