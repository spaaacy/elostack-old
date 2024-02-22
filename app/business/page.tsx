"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { CreateJob } from "@/components/business/CreateJob";
import Sidebar from "@/components/business/Sidebar";
import ViewListings from "@/components/business/ViewListings";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export enum SidebarButtonState {
  Create,
  ViewListings,
}

const Business = () => {
  // TODO: Change this to use context
  const [isAuth, setIsAuth] = useState(true);
  const [selectedButton, setSelectedButton] = useState(SidebarButtonState.ViewListings);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
  }, []);

  return (
    <main className="flex flex-col flex-1">
      <NavBar />
      <div className="px-4 mt-6 flex justify-center max-width w-full">
        <Sidebar selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
        {selectedButton === SidebarButtonState.Create ? <CreateJob /> : <ViewListings />}
      </div>

      <Footer />
    </main>
  );
};

export default Business;
