"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import Sidebar from "@/components/ui/sidebar";
import { useNextStep } from "nextstepjs";
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
  const {
    startNextStep,
    currentStep,
    isNextStepVisible,
    setCurrentStep,
    onStepChange,
  } = useNextStep();

  // Global store searchTerm
  const { searchTerm, setSearchTerm } = useAppStore();

  // Prompts for placeholder text
  const prompts = [
    "I want to visit...",
    "Show me Japanese restaurants",
    "Plan a day trip to Lonsdale Quay",
    "Find the best coffee shops nearby",
    "Best scenic hiking trails",
  ];

  // Which prompt we're on
  const [promptIndex, setPromptIndex] = useState(0);
  // Which character we are on in the current prompt
  const [charIndex, setCharIndex] = useState(0);

  // Grab the current prompt
  const currentPrompt = prompts[promptIndex];
  // The "typed" portion of the current prompt
  const typedText = currentPrompt.slice(0, charIndex);

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

  function handleCategoryClick(catLabel) {
    setSearchTerm(catLabel);
    setHasSearched(true);
  }

  function handleSearchSubmit() {
    if (!searchTerm.trim()) return;
    setHasSearched(true);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  }

  //this will start the tour
  useEffect(() => {
    // Start the tour when the page loads
    startNextStep("mainTour");
  }, [startNextStep]);

  useEffect(() => {
    // If we've typed the entire current prompt, wait a bit, then go to the next prompt
    if (charIndex === currentPrompt.length) {
      const waitingTime = 1500; // 1.5s pause before moving to the next
      const timeoutId = setTimeout(() => {
        // Move to the next prompt
        setPromptIndex((prev) => (prev + 1) % prompts.length);
        setCharIndex(0); // reset char index for the new prompt
      }, waitingTime);
      return () => clearTimeout(timeoutId);
    }

    // Otherwise, keep typing
    const typingSpeed = 100; // ms per character
    const timeoutId = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, [charIndex, currentPrompt, prompts.length]);

  return (
    <main className="relative w-screen h-screen overflow-hidden" id="map">
      {/* Map in the background */}
      <div className="absolute inset-0 z-0">
        <MapNoSSR />
      </div>

      {/* Floating sidebar (only after searching) */}
      {hasSearched && (
        <aside
          id="sidebar"
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
          <Sidebar closeSidebar={() => setHasSearched(false)} />
        </aside>
      )}

      {/* The main search bar at top center, always visible */}
      <div className="absolute top-10 w-full flex flex-col items-center z-10">
        {/* Big search box */}
        <div
          className="flex items-center space-x-2 bg-white shadow-md border border-gray-300 rounded-full px-4 py-2 max-w-xl w-full sm:w-2/3 md:w-1/2 lg:w-1/3"
          id="search-box"
        >
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
            placeholder={typedText}
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
              onClick={() => setHasSearched(true)}
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
