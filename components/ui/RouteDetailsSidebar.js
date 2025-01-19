"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import polyline from "@mapbox/polyline";

export default function RouteDetailsSidebar() {
  const { routes, setRouteGeometry, selectedResult } = useAppStore();

  if (!selectedResult || !routes) {
    return (
      <div className="fixed top-0 right-0 w-80 h-full bg-white border-l border-gray-200 z-50 shadow-lg overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b border-gray-300">
          Route Options
        </h2>
        <p className="p-4 text-gray-500">No routes available. Select a location to view routes.</p>
      </div>
    );
  }

  // Extract routes
  const { directRoute, scenicRoute, safetyRoute } = routes;

  // Function to decode and set geometry
  const handleRouteSelection = (route) => {
    if (!route?.geometry) {
      console.warn("No geometry available for the selected route.");
      return;
    }
    setRouteGeometry(route.geometry); // Geometry is already decoded
  };
  
  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white border-l border-gray-200 z-50 shadow-lg overflow-y-auto">
      <h2 className="text-xl font-semibold p-4 border-b border-gray-300">
        Routes to {selectedResult.title}
      </h2>
      <p className="text-sm text-gray-600 px-4 mb-4">{selectedResult.description}</p>

      <div className="space-y-4 px-4">
        {/* Scenic Route */}
        <button
          className={`w-full p-3 text-center font-semibold rounded-lg shadow transition ${
            scenicRoute?.geometry
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => handleRouteSelection(scenicRoute)}
          disabled={!scenicRoute?.geometry}
        >
          Scenic Route (Estimated Time: {scenicRoute?.time || "N/A"} mins)
        </button>

        {/* Safety Route */}
        <button
          className={`w-full p-3 text-center font-semibold rounded-lg shadow transition ${
            safetyRoute?.geometry
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => handleRouteSelection(safetyRoute)}
          disabled={!safetyRoute?.geometry}
        >
          Safety Route (Estimated Time: {safetyRoute?.time || "N/A"} mins)
        </button>

        {/* Direct Route */}
        <button
          className={`w-full p-3 text-center font-semibold rounded-lg shadow transition ${
            directRoute?.geometry
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => handleRouteSelection(directRoute)}
          disabled={!directRoute?.geometry}
        >
          Direct Route (Estimated Time: {directRoute?.time || "N/A"} mins)
        </button>
      </div>
    </div>
  );
}
