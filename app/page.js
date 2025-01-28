"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import Sidebar from "@/components/ui/sidebar";
import RouteDetailsSidebar from "@/components/ui/RouteDetailsSidebar";
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
  const { userLocation, setSearchResults, routes, setRouteLoading } = useAppStore();
  const [hasSearched, setHasSearched] = useState(false);

  // NextStepJS hooks

  // Destructure the startNextStep function from the useNextStep hook
  const { startNextStep } = useNextStep();

  // Prompts for placeholder text
  const prompts = [
    "I want to visit...",
    "Show me Japanese restaurants",
    "Plan a day trip to Lonsdale Quay",
    "Find the best coffee shops nearby",
    "Best scenic hiking trails",
  ];

  // used to type out placeholder text
  const [promptIndex, setPromptIndex] = useState(0); // Current prompt index
  const [charIndex, setCharIndex] = useState(0); // Current character index
  const currentPrompt = prompts[promptIndex]; // Current prompt text
  const typedText = currentPrompt.slice(0, charIndex); // Dynamically typed text

  const [search_obj, setSearch_obj] = useState({});
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleSearchSubmit() {
    setIsLoading(true);
    setRouteLoading(true);
    setHasSearched(true);
    // const res = await fetch(`http://localhost:3001/search?q=${searchTerm}&lat=${userLocation.lat}&lng=${userLocation.lng}`);
    // const obj = await res.json();

    const obj = {
      eng: {
        places: [
       
          {
            name: "Science World",
            desc: "A science center featuring exhibits, displays, and an OMNIMAX theater.",
            address: "1455 Quebec St, Vancouver, BC V6A 3Z7",
          },
          {
            name: "H.R. MacMillan Space Centre",
            desc: "A space and science museum offering interactive exhibits.",
            address: "1100 Chestnut St, Vancouver, BC V6J 3J9",
          },
        // ],
        // events: [
          {
            name: "Science Lecture Series",
            desc: "Weekly talks on current scientific research.",
            address: "Science World, 1455 Quebec St, Vancouver, BC V6A 3Z7",
            time: "Every Thursday at 7:00 PM",
          },
          {
            name: "Astronomy Night",
            desc: "Explore the stars with telescopes and expert guidance.",
            address:
              "H.R. MacMillan Space Centre, 1100 Chestnut St, Vancouver, BC V6J 3J9",
            time: "Saturday, 9:00 PM",
          },
        ],
      },
      coords: {
        places: [
          { lat: 49.2765, lng: -123.145 }, // Coordinates for H.R. MacMillan Space Centre
          { lat: 49.2734, lng: -123.1034 }, // Coordinates for Science World
        // ],
        // events: [
          { lat: 49.2734, lng: -123.1034 }, // Coordinates for Science World event
          { lat: 49.2765, lng: -123.145 }, // Coordinates for H.R. MacMillan event
        ],
      },
    };
    setTimeout(function () {
      setSearch_obj(obj);
      setSearchResults(obj);
      setIsLoading(false);
      
      console.log(obj);
    }, 1000)


  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  }

  // Start the NextStepJS tour on load
  useEffect(() => {
    startNextStep("mainTour");
  }, [startNextStep]);

  // Typing effect for placeholder prompts
  useEffect(() => {
    if (charIndex === currentPrompt.length) {
      const timeout = setTimeout(() => {
        setPromptIndex((prev) => (prev + 1) % prompts.length);
        setCharIndex(0);
      }, 1500); // Wait 1.5s before switching to the next prompt
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, 100); // Type one character every 100ms

    return () => clearTimeout(timeout);
  }, [charIndex, currentPrompt]);

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Map in the background */}
      <div className="absolute inset-0 z-0" id="map">
        <MapNoSSR />
      </div>
      {/* Left Sidebar (appears after searching) */}
      {hasSearched && (
        <aside
          id="sidebar"
          className="absolute top-5 left-5 h-[calc(100%-2.5rem)] w-72 bg-white border border-gray-200 z-10 rounded-lg shadow-md no-scrollbar overflow-hidden"
        >
          <Sidebar
            closeSidebar={() => setHasSearched(false)}
            search_obj={search_obj.eng}
            coords={search_obj.coords}
            isLoading={isLoading}
          />
        </aside>
      )}
      {/* Right Sidebar (appears when a location is selected) */}
      {selectedResult && (
        <aside
          id="route-details-sidebar"
          className="absolute top-5 right-5 h-[calc(100%-2.5rem)] w-80 bg-white border border-gray-200 z-10 rounded-lg shadow-md overflow-hidden"
        >
          <RouteDetailsSidebar />
        </aside>
      )}
      {/* Search Bar at the top center */}
      <div className="absolute top-10 w-full flex flex-col items-center z-10">
        <div
          className="flex items-center space-x-2 bg-white shadow-md border border-gray-300 rounded-full px-4 py-2 w-[45%] focus-within:w-[50%] transition-all duration-300 ease-in-out"
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

          {/* Search input */}
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

        {/* Category buttons */}
        <div className="mt-4 flex gap-2 flex-wrap justify-center max-w-xl">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-gray-600 shadow-sm hover:bg-gray-50"
              onClick={() => handleCategoryClick(cat.label)}
            >
              {cat.icon}
              <span className="text-sm">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
      <RouteDetailsSidebar />{" "}
    </main>
  );
}
