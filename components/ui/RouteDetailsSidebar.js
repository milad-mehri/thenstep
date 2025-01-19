// components/ui/RouteDetailsSidebar.js
"use client";

import React from "react";
import { useAppStore } from "@/lib/store";

// Example icons (using emojis or any icon library)
const icons = {
  ecoFriendly: "🌱", // Green leaf
  exercise: "🏋️", // Weight icon
  scenic: "🏔️", // Mountains
};

export default function RouteDetailsSidebar() {
  const { selectedResult, routeDetails } = useAppStore();

  if (!selectedResult) return null; // Only show the sidebar if a location is selected

  return (
    <div className="p-4 bg-white border-l border-gray-200 w-80 h-full fixed top-0 right-0 z-20 shadow-lg overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Routes to {selectedResult.title}</h2>
      <p className="text-sm text-gray-600 mb-6">{selectedResult.description}</p>

      {routeDetails.length === 0 ? (
        <p className="text-gray-500">Loading route options...</p>
      ) : (
        <div className="space-y-4">
          {routeDetails.map((route, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-2">{route.mode}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Estimated time: <strong>{route.time}</strong>
              </p>
              <div className="flex items-center gap-2">
                {route.benefits.map((benefit, j) => (
                  <span
                    key={j}
                    className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    <span>{icons[benefit.icon]}</span>
                    <span>{benefit.label}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
