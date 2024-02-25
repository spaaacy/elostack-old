"use client";

import ProfilePage from "@/components/Individual/profile/ProfilePage";
import NavBar from "@/components/NavBar";
import { useParams } from "next/navigation";
const Profiles = () => {
  const { id } = useParams();

  return (
    <main>
      <NavBar />
      <div className="flex h-screen">
        <ProfilePage id={id} />
      </div>
    </main>
  );
};

export default Profiles;
