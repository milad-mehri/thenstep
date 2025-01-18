"use client";

import React, { useState, useMemo, useEffect } from "react";
// Replace with your actual imports for Input, Label, Result, and icons:
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Result from "@/components/ui/result";

// Example icon imports (from Lucide). You can use any icon library or custom SVG.
import {
  Utensils,
  Hotel,
  Camera,
  Landmark,
  Train,
  Stethoscope,
  DollarSign,
} from "lucide-react";

// If using Zustand or a global store:
import { useAppStore } from "@/lib/store";

export default function Sidebar() {
  const [search, setSearch] = useState("");

  // For demonstration, we store results in the global store
  // so the map can read them and place markers.
  const { setSearchResults } = useAppStore();

  // Update local `search` state whenever the user types.
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  // Example categories array (Google Maps–style).
  // On click, we can setSearch(...) or do something else.
  const categories = [
    { label: "Restaurants", icon: <Utensils className="h-4 w-4" /> },
    { label: "Hotels", icon: <Hotel className="h-4 w-4" /> },
    { label: "Things to do", icon: <Camera className="h-4 w-4" /> },
    { label: "Museums", icon: <Landmark className="h-4 w-4" /> },
    { label: "Transit", icon: <Train className="h-4 w-4" /> },
    { label: "Pharmacies", icon: <Stethoscope className="h-4 w-4" /> },
    { label: "ATMs", icon: <DollarSign className="h-4 w-4" /> },
  ];

  // For demonstration, we do a simple "mock" filter of results
  // if `search` is not empty. In a real app, you'd fetch or filter actual data.
  const filteredResults = useMemo(() => {
    if (!search) return [];
    // Hard-coded sample data:
    return [
      {
        title: "Sample Result 1",
        description: "A short description for result 1",
        longitude: -130,
        latitude: 49,
        date: "2024-01-01",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Elizabeth_Tower%2C_June_2022.jpg/800px-Elizabeth_Tower%2C_June_2022.jpg",
      },
      {
        title: "Sample Result 2",
        description: "Another sample result 2",
        longitude: -123.12,
        latitude: 49.28,
        date: "2025-05-10",
        image:
          "https://static.scientificamerican.com/sciam/cache/file/C2015DC2-3B05-4B02-B37E1DFB642662F4_source.jpg",
      },
    ];
  }, [search]);

  // Whenever filteredResults changes, log them and store in global store
  useEffect(() => {
    console.log("Filtered results:", filteredResults);
    setSearchResults(filteredResults);
  }, [filteredResults, setSearchResults]);

  return (
    <div className="p-4">
      {/* Search Label & Input */}
      <div className="mb-4">
        <Label htmlFor="search" className="mb-2">
          Search
        </Label>
        <Input
          id="search"
          value={search}
          onChange={handleChange}
          placeholder="Search something..."
        />
      </div>

      {/* Category Buttons: shaped like pills, with icons & text */}
      <div className="no-scrollbar flex gap-2 mb-4 overflow-x-auto whitespace-nowrap">
        {categories.map((cat) => (
          <button
            key={cat.label}
            className="flex items-center space-x-1 px-3 py-1 
                       bg-white border border-gray-300 
                       rounded-full text-gray-600 shadow-sm 
                       hover:bg-gray-50"
            onClick={() => setSearch(cat.label)} // Or do any custom action
          >
            {cat.icon}
            <span className="text-sm">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Display results based on 'search' */}
      <div className="flex flex-col gap-4">
        {search.length === 0 ? (
          <p className="text-sm text-gray-500">No search yet.</p>
        ) : filteredResults.length === 0 ? (
          <p className="text-sm text-gray-500">
            No results found for &quot;{search}&quot;.
          </p>
        ) : (
          filteredResults.map((res, i) => (
            <Result
              key={i}
              title={res.title}
              description={res.description}
              longitude={res.longitude}
              latitude={res.latitude}
              date={res.date}
              image={res.image}
            />
          ))
        )}
      </div>
    </div>
  );
}
