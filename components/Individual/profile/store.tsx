import { create } from 'zustand';

export const useStore = create((set) => ({
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
  },
  updateProfile: (newData) => set(() => ({ profileData: newData })),
}));
