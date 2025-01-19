"use client";

import { create } from "zustand";

export const useAppStore = create((set) => ({
  userLocation: null, // Initialize as null
  setUserLocation: (location) => set({ userLocation: location }),
    searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),

  selectedResult: null,
  setSelectedResult: (result) => set({ selectedResult: result }),

  routeGeometry: [],
  setRouteGeometry: (geometry) => set({ routeGeometry: geometry }),

  routes: {},
  setRoutes: (routess) => set({ routes: routess }),

  routeDetails: [],
  setRouteDetails: (details) => set({ routeDetails: details }),
}));
