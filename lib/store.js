// lib/store.js
"use client";

import { create } from "zustand";

export const useAppStore = create((set) => ({
  userLocation: null,
  setUserLocation: (loc) => set({ userLocation: loc }),

  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),

  selectedResult: null,
  setSelectedResult: (result) => set({ selectedResult: result }),

  routeGeometry: [],
  setRouteGeometry: (geometry) => set({ routeGeometry: geometry }),

  routeDetails: [],
  setRouteDetails: (details) => set({ routeDetails: details }),
}));
