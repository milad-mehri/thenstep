// app/page.js
"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/ui/sidebar";
import { useAppStore } from "@/lib/store";

// Dynamically load the map so Leaflet won't break on SSR
const MapNoSSR = dynamic(() => import("@/components/ui/map"), {
  ssr: false,
});

export default function Home() {
  const [hasSearched, setHasSearched] = useState(false);
  const [search, setSearch] = useState("");
  const { setSearchResults } = useAppStore();

  // Prompts for the rotating placeholder
  const prompts = [
    "I want to visit...",
    "Show me Japanese restaurants",
    "Plan a day trip to Lonsdale Quay",
    "Find the best coffee shops nearby",
    "Best scenic hiking trails",
    "Where can I try authentic Italian food?",
    "Explore historical landmarks in the area",
    "Discover live music events this weekend",
    "Find the nearest yoga studios",
    "First date plan in downtown Vancouver",
  ];

  const [promptIndex, setPromptIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [letterIndex, setLetterIndex] = useState(0);

  useEffect(() => {
    const currentPrompt = prompts[promptIndex];

    // Show placeholder text letter by letter
    if (letterIndex < currentPrompt.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentPrompt.slice(0, letterIndex + 1));
        setLetterIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      // Pause for a second before switching to the next prompt
      const timeout = setTimeout(() => {
        setLetterIndex(0);
        setPromptIndex((prev) => (prev + 1) % prompts.length);
        setDisplayedText("");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [letterIndex, promptIndex, prompts]);

  function handleSearchSubmit() {
    if (!search.trim()) return;

    console.log("User searched:", search);

    // Example: store some mock results in your global store
    setSearchResults([
      {
        title: `Results for \"${search}\"`,
        description: "Some dummy data.",
        latitude: 49.28,
        longitude: -123.12,
        date: "2025-05-10",
        image:
          "https://static.scientificamerican.com/sciam/cache/file/C2015DC2-3B05-4B02-B37E1DFB642662F4_source.jpg",
      },
    ]);

    // Hide the center bar and show the sidebar
    setHasSearched(true);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* MAP in the background */}
      <MapNoSSR />

      {/* CENTER SEARCH BAR (only if hasn't searched yet) */}
      {!hasSearched && (
        <div className="absolute top-10 w-full flex justify-center z-10">
          <div className="flex items-center space-x-2 bg-white shadow-md border border-gray-300 rounded-full px-4 py-2 max-w-xl w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            {/* Magnifier icon (example from Heroicons or Lucide) */}
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

            {/* Input with dynamic placeholder */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 outline-none"
              placeholder={displayedText}
            />

            {/* Search button */}
            <button
              onClick={handleSearchSubmit}
              className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* SIDEBAR (only appears after searching) */}
      {hasSearched && (
        <aside className="absolute top-0 left-0 h-full w-80 bg-white border-r border-gray-200 z-10 overflow-y-auto">
          <Sidebar />
        </aside>
      )}
    </main>
  );
}
