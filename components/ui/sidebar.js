// components/ui/sidebar.js
"use client";

import React, { useMemo, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import Result from "@/components/ui/result";

export default function Sidebar() {
  const { searchTerm, setSearchResults } = useAppStore();

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
            <Result
              key={i}
              title={res.title}
              description={res.description}
              longitude={res.longitude}
              latitude={res.latitude}
              date={res.date}
              image={res.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}
