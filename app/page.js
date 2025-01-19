// app/page.js
"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import Sidebar from "@/components/ui/sidebar";

// Lucide icons
import {
  Utensils,
  Hotel,
  Camera,
  Landmark,
  Train,
  Stethoscope,
  DollarSign,
} from "lucide-react";

// Dynamically load the map
const MapNoSSR = dynamic(() => import("@/components/ui/map"), {
  ssr: false,
});

export default function Home() {
  const [hasSearched, setHasSearched] = useState(false);

  // Global store searchTerm
  const { searchTerm, setSearchTerm } = useAppStore();

  // Rotating placeholder prompts
  const prompts = [
    "I want to visit...",
    "Show me Japanese restaurants",
    "Plan a day trip to Lonsdale Quay",
    "Find the best coffee shops nearby",
    "Best scenic hiking trails",
  ];
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % prompts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [prompts.length]);

  // Category icons
  const categories = [
    { label: "Restaurants", icon: <Utensils className="h-4 w-4" /> },
    { label: "Hotels", icon: <Hotel className="h-4 w-4" /> },
    { label: "Things to do", icon: <Camera className="h-4 w-4" /> },
    { label: "Museums", icon: <Landmark className="h-4 w-4" /> },
    { label: "Transit", icon: <Train className="h-4 w-4" /> },
    { label: "Pharmacies", icon: <Stethoscope className="h-4 w-4" /> },
    { label: "ATMs", icon: <DollarSign className="h-4 w-4" /> },
  ];

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  // If user picks a category => set searchTerm and do an immediate "search"
  function handleCategoryClick(catLabel) {
    setSearchTerm(catLabel);
    setHasSearched(true); // instantly show sidebar
  }

  // Pressing the "Search" button => show sidebar if user typed something
  function handleSearchSubmit() {
    if (!searchTerm.trim()) return;
    setHasSearched(true);
  }

  // Pressing Enter
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Map in the background */}
      <MapNoSSR />

      {/* Floating sidebar (only after searching) */}
      {hasSearched && (
        <aside
          className="
            absolute 
            top-5 left-5 
            h-[calc(100%-2.5rem)] 
            w-72 
            bg-white 
            border border-gray-200 
            z-10 
            rounded-lg
            shadow-md
            no-scrollbar overflow-hidden
          "
        >
          <Sidebar />
        </aside>
      )}

      {/* The main search bar at top center, always visible */}
      <div className="absolute top-10 w-full flex flex-col items-center z-10">
        {/* Big search box */}
        <div className="flex items-center space-x-2 bg-white shadow-md border border-gray-300 rounded-full px-4 py-2 max-w-xl w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          {/* Magnifier icon */}
          <svg
            className="h-5 w-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M3.5 10.5a7 7 0 1114 0 7 7 0 01-14 0z"
            />
          </svg>

          {/* The input */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="flex-1 outline-none"
            placeholder={prompts[promptIndex]}
          />

          {/* Search button */}
          <button
            onClick={handleSearchSubmit}
            className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Category icons => instantly show sidebar + set search */}
        <div className="mt-4 flex gap-2 flex-wrap justify-center max-w-xl">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className="flex items-center space-x-1 px-3 py-1 
                         bg-white border border-gray-300 
                         rounded-full text-gray-600 shadow-sm 
                         hover:bg-gray-50"
              onClick={() => handleCategoryClick(cat.label)}
            >
              {cat.icon}
              <span className="text-sm">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
