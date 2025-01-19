// lib/store.js
"use client";

import { create } from "zustand";

export const useAppStore = create((set) => ({
  // 1) User's current location
  userLocation: null,
  setUserLocation: (loc) => set({ userLocation: loc }),

  // 2) Array of search results for the map
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),

  // 3) Route geometry (if you use routes)
  routeGeometry: [],
  setRouteGeometry: (coords) => set({ routeGeometry: coords }),

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // 4) Currently selected result (if needed)
=======
  // Track the currently selected result
>>>>>>> Stashed changes
=======
  // Track the currently selected result
>>>>>>> Stashed changes
  selectedResult: null,
  setSelectedResult: (result) => set({ selectedResult: result }),

  // 5) The main search term typed in the top bar
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
