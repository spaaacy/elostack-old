"use client";

import { ListJob } from "@/components/business/ListJob";
import SearchCandidates from "@/components/business/SearchCandidates";
import Sidebar, { SidebarButtonState } from "@/components/business/Sidebar";
import ViewListings from "@/components/business/ViewListings";
import React, { useState } from "react";
import RequestInterview from "./RequestInterview";

const BusinessDashboard = () => {
  const [selectedButton, setSelectedButton] = useState(SidebarButtonState.ViewListings);

  const fetchIndividuals = async () => {
    const response = await fetch("/api/individual", { method: "GET" });
  };

  return (
    <div className="px-4 mt-6 flex justify-center max-width w-full">
      <Sidebar selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
      {selectedButton === SidebarButtonState.ViewListings ? (
        <ViewListings />
      ) : selectedButton === SidebarButtonState.SearchCandidates ? (
        <SearchCandidates />
      ) : selectedButton === SidebarButtonState.RequestInterview ? (
        <RequestInterview />
      ) : (
        <ListJob />
      )}
    </div>
  );
};

export default BusinessDashboard;
