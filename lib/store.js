"use client";

import { create } from "zustand";

export const useAppStore = create((set) => ({
  userLocation: null,
  setUserLocation: (loc) => set({ userLocation: loc }),

  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),

  // For routes
  routeGeometry: [],
  setRouteGeometry: (coords) => set({ routeGeometry: coords }),

  // NEW: Track which result is currently selected
  selectedResult: null,
  setSelectedResult: (result) => set({ selectedResult: result }),
}));
