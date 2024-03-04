"use client";

import ProfilePage from "@/components/individual/profile/ProfilePage";
import NavBar from "@/components/common/NavBar";
import { useParams } from "next/navigation";
const Profiles = () => {
  const { id } = useParams();

  return (
    <main className="flex flex-col flex-1">
      <NavBar />
      <div className="flex flex-1">
        <ProfilePage id={id} />
      </div>
    </main>
  );
};

export default Profiles;
