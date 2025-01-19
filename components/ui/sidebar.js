// components/ui/sidebar.js
"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import Result from "@/components/ui/result";
import { fetchORSRoute } from "@/lib/ors";

export default function Sidebar({closeSidebar}) {

  const {
    searchTerm,
    setSearchResults,
    setRouteGeometry,
    userLocation,
    setSelectedResult,
  } = useAppStore();

  // Example mock data for results
  const filteredResults = useMemo(() => {
    if (!searchTerm) return [];
    return [
      {
        title: "Sample Result 1",
        description: "A short description for result 1",
        longitude: -123.12,
        latitude: 60.28,

        date: "2024-01-01",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Elizabeth_Tower%2C_June_2022.jpg/800px-Elizabeth_Tower%2C_June_2022.jpg",
      },
      {
        title: `Found something for "${searchTerm}"`,
        description: "Sidebar-based result.",
        longitude: -123.12,
        latitude: 49.28,
        date: "2025-05-10",
        image:
          "https://static.scientificamerican.com/sciam/cache/file/C2015DC2-3B05-4B02-B37E1DFB642662F4_source.jpg",
      },
    ];
  }, [searchTerm]);

  useEffect(() => {
    console.log("Filtered results (Sidebar):", filteredResults);
    setSearchResults(filteredResults);
  }, [filteredResults, setSearchResults]);

  // Handle result selection and fetch route
  const handleResultClick = async (result) => {
    setSelectedResult(result);
  
    if (userLocation) {
      try {
        // Example route details
        const details = [
          {
            mode: "Walking",
            time: "15 mins",
            benefits: [
              { label: "Eco-Friendly", icon: "ecoFriendly" },
              { label: "Exercise", icon: "exercise" },
            ],
          },
          {
            mode: "Jogging",
            time: "10 mins",
            benefits: [
              { label: "Exercise", icon: "exercise" },
            ],
          },
          {
            mode: "Biking",
            time: "8 mins",
            benefits: [
              { label: "Eco-Friendly", icon: "ecoFriendly" },
              { label: "Exercise", icon: "exercise" },
            ],
          },
          {
            mode: "Scenic Path",
            time: "20 mins",
            benefits: [
              { label: "Scenic Beauty", icon: "scenic" },
            ],
          },
        ];
  
        setRouteDetails(details);
  
        // Fetch and display the route geometry
        const route = await fetchORSRoute([
          [userLocation.lat, userLocation.lng], // Start
          [result.latitude, result.longitude], // Destination
        ]);
        setRouteGeometry(route);
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    } else {
      console.error("User location not available.");
    }
  };

  return (
    <div className="p-4 no-scrollbar overflow-y-auto h-full">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Results</h2>
        <button
          onClick={closeSidebar}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close sidebar"
        >
          <span className="text-lg font-bold">&times;</span>
        </button>
      </div>
      {searchTerm.length === 0 ? (
        <p className="text-sm text-gray-500">No search yet.</p>
      ) : filteredResults.length === 0 ? (
        <p className="text-sm text-gray-500">
          No results for &quot;{searchTerm}&quot;.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredResults.map((res, i) => (
            <div
              key={i}
              className="cursor-pointer"
              onClick={() => handleResultClick(res)}
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
          ))}
        </div>
      )}
    </div>
  );
}
