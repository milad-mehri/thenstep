import { create } from "zustand";

export const useAppStore = create((set) => ({
  // State for user's current location
  userLocation: null,
  
  // Function to update the user's location
  setUserLocation: (location) => set({ userLocation: location }),
}));
