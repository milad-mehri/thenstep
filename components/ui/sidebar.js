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
  const { setSearchResults } = useAppStore();

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
        },
      {
        title: `Found something related to "${search}"`,
        description: "Sidebar-based result.",
        longitude: -123.12,
        latitude: 49.28,
        date: "2025-05-10",
        image:
          "https://static.scientificamerican.com/sciam/cache/file/C2015DC2-3B05-4B02-B37E1DFB642662F4_source.jpg",
      },
    ];
  }, [search]);

  useEffect(() => {
    console.log("Filtered results (Sidebar):", filteredResults);
    setSearchResults(filteredResults);
  }, [filteredResults, setSearchResults]);

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
