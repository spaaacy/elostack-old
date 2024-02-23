// store.js
import create from 'zustand';

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
    // Add any additional fields here
  },
  updateProfile: (newData) => set(() => ({ profileData: newData })),
}));
