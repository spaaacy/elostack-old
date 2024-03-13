import { create } from "zustand";

export const profileStore = create((set) => ({
  profileData: {
    firstName: "",
    lastName: "",
    pronouns: "",
    countryRegion: "",
    postalCode: "",
    city: "",
    number: "",
    phoneType: "",
    address: "",
    birthday: "",
    url: "",
    websiteType: "",
    linkedIn: "",
    github: "",
    cover_letter: "",
  },
  setProfileData: (newData) => set(() => ({ profileData: newData })),
}));
