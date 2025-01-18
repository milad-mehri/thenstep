// lib/store.js
"use client"

import { create } from 'zustand'

export const useAppStore = create((set) => ({
  userLocation: null,
  setUserLocation: (loc) => set({ userLocation: loc }),

  // Array of search result objects, e.g. { title, description, latitude, longitude, ... }
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
}))
