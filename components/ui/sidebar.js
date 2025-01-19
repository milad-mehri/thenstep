"use client";

<<<<<<< Updated upstream
import React, { useMemo, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import Result from "@/components/ui/result";
=======
import React, { useState, useMemo, useEffect } from "react";
// Replace with your actual imports for Input, Label, Result, and icons:
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Result from "@/components/ui/result"; // Updated to match file name

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
>>>>>>> Stashed changes

// If using Zustand or a global store:
import { useAppStore } from "@/lib/store";

// Import the ORS utility
import { fetchORSRoute } from "@/lib/ors";

// If using Zustand or a global store:
import { useAppStore } from "@/lib/store";

// Import the ORS utility
import { fetchORSRoute } from "@/lib/ors";

export default function Sidebar() {
  const { searchTerm, setSearchResults } = useAppStore();

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // Filter or fetch logic based on searchTerm
  const filteredResults = useMemo(() => {
    if (!searchTerm) return [];
    // Example mock data
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
          
=======
=======
>>>>>>> Stashed changes
  // Grab necessary state and actions from the store
  const {
    setSearchResults,
    searchResults,
    selectedResult,
    setSelectedResult,
    setRouteGeometry,
  } = useAppStore();

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
        title: "Sample Place 1",
        description: "A short description for place 1",
        longitude: -123.12,
        latitude: 49.28,
        date: "2025-05-10",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Elizabeth_Tower%2C_June_2022.jpg/800px-Elizabeth_Tower%2C_June_2022.jpg",
        type: "place",
      },
>>>>>>> Stashed changes
      {
        title: `Found something for "${searchTerm}"`,
        description: "Sidebar-based result.",
        longitude: -123.12,
        latitude: 49.28,
        date: "2025-05-10",
        image:
<<<<<<< Updated upstream
          "https://static.scientificamerican.com/sciam/cache/file/C2015DC2-3B05-4B02-B37E1DFB642662F4_source.jpg",
=======
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/UNIVERSITY_OF_BRITISH_COLUMBIA_LOGO.png/600px-UNIVERSITY_OF_BRITISH_COLUMBIA_LOGO.png",
        type: "route",
        // Initial empty geometry; will be fetched from ORS
        geometry: [
            [49.41461, 8.681495], // [latitude, longitude]
            [49.420318, 8.687872] // [latitude, longitude]
          ], // Will be filled after fetching from ORS
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      },
    ];
  }, [searchTerm]);

  // Whenever filteredResults changes, log them and store in global store
  useEffect(() => {
    console.log("Filtered results:", filteredResults);
    setSearchResults(filteredResults);
  }, [filteredResults, setSearchResults]);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return (
    <div className="p-4 no-scrollbar overflow-y-auto h-full">
      <h2 className="text-xl font-semibold mb-4">Results</h2>

      {searchTerm.length === 0 ? (
        <p className="text-sm text-gray-500">No search yet.</p>
      ) : filteredResults.length === 0 ? (
        <p className="text-sm text-gray-500">
          No results for &quot;{searchTerm}&quot;.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredResults.map((res, i) => (
=======
=======
>>>>>>> Stashed changes
  // By default, if there's at least 1 result and we have no selectedResult yet,
  // select the first result automatically.
  useEffect(() => {
    if (filteredResults.length > 0 && !selectedResult) {
      setSelectedResult(filteredResults[0]);
    }
  }, [filteredResults, selectedResult, setSelectedResult]);

  // Whenever selectedResult changes, if it's a route and geometry is empty, fetch route
  useEffect(() => {
    const getRoute = async () => {
      if (
        selectedResult &&
        selectedResult.type === "route" &&
        selectedResult.geometry.length === 0
      ) {
        try {
          const coords = [
            [selectedResult.longitude, selectedResult.latitude], // Start point
            // Add any additional waypoints here if needed
            [selectedResult.longitude, selectedResult.latitude], // End point (for demonstration, same as start)
          ];

          // **IMPORTANT:** Replace the end coordinates with actual destination
          // For example, from UBC Rec Center to UBC Hospital
          const actualCoords = [
            [-123.245905, 49.266757], // UBC Rec Center
            [-123.2451, 49.2649], // UBC Hospital
          ];

          const route = await fetchORSRoute(actualCoords);
          console.log("Fetched route:", route);
          setRouteGeometry(route);
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      }
    };

    getRoute();
  }, [selectedResult, setRouteGeometry]);

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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            <Result
              key={i}
              title={res.title}
              description={res.description}
              longitude={res.longitude}
              latitude={res.latitude}
              date={res.date}
              image={res.image}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            />
          ))}
        </div>
      )}
=======
=======
>>>>>>> Stashed changes
              onClick={() => setSelectedResult(res)}
              selected={selectedResult === res}
            />
          ))
        )}
      </div>
>>>>>>> Stashed changes
    </div>
  );
}
