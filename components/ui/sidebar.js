// components/ui/sidebar.js
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Result from "@/components/ui/result";
import { useAppStore } from "@/lib/store";
import {
  Utensils,
  Hotel,
  Camera,
  Landmark,
  Train,
  Stethoscope,
  DollarSign,
} from "lucide-react";

export default function Sidebar() {
  const [search, setSearch] = useState("");

  // NEW: Grab selectedResult & setter from the store so we can highlight the chosen item
  const {
    setSearchResults,
    selectedResult,
    setSelectedResult,
    searchResults,
  } = useAppStore();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const categories = [
    { label: "Restaurants", icon: <Utensils className="h-4 w-4" /> },
    { label: "Hotels", icon: <Hotel className="h-4 w-4" /> },
    { label: "Things to do", icon: <Camera className="h-4 w-4" /> },
    { label: "Museums", icon: <Landmark className="h-4 w-4" /> },
    { label: "Transit", icon: <Train className="h-4 w-4" /> },
    { label: "Pharmacies", icon: <Stethoscope className="h-4 w-4" /> },
    { label: "ATMs", icon: <DollarSign className="h-4 w-4" /> },
  ];

  // Example: some mock filter logic
  const filteredResults = useMemo(() => {
    if (!search) return [];
    return [
        {
        title: "Sample Result 1",
        description: "A short description for result 1",
        longitude: -130,
        latitude: 49,
        date: "2024-01-01",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Elizabeth_Tower%2C_June_2022.jpg/800px-Elizabeth_Tower%2C_June_2022.jpg",
        type: "place",
      },
      {
        title: "UBC Rec Center → UBC Hospital (Walking)",
        description: "A route from UBC Rec to UBC Hospital via walkway",
        longitude: -123.245905, // Approx location of Rec Center
        latitude: 49.266757,
        date: "2026-01-01",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/UNIVERSITY_OF_BRITISH_COLUMBIA_LOGO.png/600px-UNIVERSITY_OF_BRITISH_COLUMBIA_LOGO.png",
        type: "route",
        // Approx path: from rec center to hospital on foot
        geometry: [
            [49.26665, -123.24554], // UBC Rec Center (start)
            [49.26662, -123.24535],
            [49.26641, -123.24527],
            [49.26604, -123.24526],
            [49.26574, -123.24527],
            [49.26561, -123.24517],
            [49.26531, -123.24514],
            [49.26494, -123.24505],
            [49.26479, -123.24502],
        ],
      },
    ];
  }, [search]);

  useEffect(() => {
    console.log("Filtered results (Sidebar):", filteredResults);
    setSearchResults(filteredResults);
  }, [filteredResults, setSearchResults]);

  // NEW: By default, if there's at least 1 result and we have no selectedResult yet,
  // select the first result automatically.
  useEffect(() => {
    if (filteredResults.length > 0 && !selectedResult) {
      setSelectedResult(filteredResults[0]);
    }
  }, [filteredResults, selectedResult, setSelectedResult]);

  return (
    <div className="p-4">
      {/* The sidebar's own search bar */}
      <div className="mb-4">
        <Label htmlFor="search" className="mb-2">
          Refine Search
        </Label>
        <Input
          id="search"
          value={search}
          onChange={handleChange}
          placeholder="Type to refine..."
        />
      </div>

      {/* Category Buttons */}
      <div className="no-scrollbar flex gap-2 mb-4 overflow-x-auto whitespace-nowrap">
        {categories.map((cat) => (
          <button
            key={cat.label}
            className="flex items-center space-x-1 px-3 py-1 
                       bg-white border border-gray-300 
                       rounded-full text-gray-600 shadow-sm 
                       hover:bg-gray-50"
            onClick={() => setSearch(cat.label)}
          >
            {cat.icon}
            <span className="text-sm">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex flex-col gap-4">
        {search.length === 0 ? (
          <p className="text-sm text-gray-500">No sidebar search yet.</p>
        ) : filteredResults.length === 0 ? (
          <p className="text-sm text-gray-500">
            No results for &quot;{search}&quot;.
          </p>
        ) : (
          filteredResults.map((res, i) => (
            <div
              key={i}
              // NEW: if this result is selected, add a gray background
              className={`${
                selectedResult === res ? "bg-gray-200" : ""
              } rounded-md p-2 cursor-pointer`}
              // NEW: onClick sets the selectedResult to this item
              onClick={() => setSelectedResult(res)}
            >
              <Result
                title={res.title}
                description={res.description}
                longitude={res.longitude}
                latitude={res.latitude}
                date={res.date}
                image={res.image}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
