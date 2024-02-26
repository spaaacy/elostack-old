import React, { FC } from "react";

export enum SidebarButtonState {
  SearchCandidates,
  RequestInterview,
  ViewListings,
  Create,
}

interface SidebarProps {
  selectedButton: SidebarButtonState;
  setSelectedButton: React.Dispatch<React.SetStateAction<SidebarButtonState>>;
}

const Sidebar: FC<SidebarProps> = ({ selectedButton, setSelectedButton }) => {
  return (
    <div className="fixed left-4 flex flex-col items-start gap-4">
      <SidebarButton
        sidebarState={{ selectedButton, setSelectedButton }}
        buttonTitle="View listings"
        buttonState={SidebarButtonState.ViewListings}
      />
      <SidebarButton
        sidebarState={{ selectedButton, setSelectedButton }}
        buttonTitle="Search for candidates"
        buttonState={SidebarButtonState.SearchCandidates}
      />
      <SidebarButton
        sidebarState={{ selectedButton, setSelectedButton }}
        buttonTitle="Request an interview"
        buttonState={SidebarButtonState.RequestInterview}
      />
      <SidebarButton
        sidebarState={{ selectedButton, setSelectedButton }}
        buttonTitle="Create job listing"
        buttonState={SidebarButtonState.Create}
      />
    </div>
  );
};

interface SidebarButtonProps {
  sidebarState: SidebarProps;
  buttonTitle: string;
  buttonState: SidebarButtonState;
}

const SidebarButton: FC<SidebarButtonProps> = ({ sidebarState, buttonTitle, buttonState }) => {
  return (
    <button
      className={`sidenav-button ${sidebarState.selectedButton === buttonState ? " text-blueprimary font-bold" : ""}`}
      onClick={() => sidebarState.setSelectedButton(buttonState)}
    >
      {buttonTitle}
    </button>
  );
};

export default Sidebar;
