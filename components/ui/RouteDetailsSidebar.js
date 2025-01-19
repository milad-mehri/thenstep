// components/ui/RouteDetailsSidebar.js
"use client";

import React from "react";
import { useAppStore } from "@/lib/store";

export default function RouteDetailsSidebar() {
  const { selectedResult, routeDetails, setRouteGeometry } = useAppStore();

  if (!selectedResult) return null; // Only show the sidebar if a location is selected

  return (
    <div className="p-4 bg-white border-l border-gray-200 w-80 h-full fixed top-0 right-0 z-20 shadow-lg overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Routes to {selectedResult.title}</h2>
      <p className="text-sm text-gray-600 mb-6">{selectedResult.description}</p>
{console.log}
      {routeDetails.length === 0 ? (
        <p className="text-gray-500">Loading route options...</p>
      ) : (
        <div className="space-y-4">
          {/* Direct Route */}
          <button
            className="w-full p-3 text-center bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
            onClick={() => setRouteGeometry(routeDetails.directRoute.geometry)}
          >
            Direct Route (Time: {routeDetails.directRoute.time} mins)
          </button>

          {/* Scenic Route */}
          <button
            className="w-full p-3 text-center bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600"
            onClick={() => setRouteGeometry(routeDetails.scenicRoute.geometry)}
          >
            Scenic Route (Time: {routeDetails.scenicRoute.time} mins)
          </button>

          {/* Safety Route */}
          <button
            className="w-full p-3 text-center bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600"
            onClick={() => setRouteGeometry(routeDetails.safetyRoute.geometry)}
          >
            Safety Route (Time: {routeDetails.safetyRoute.time} mins)
          </button>
        </div>
      )}
    </div>
  );
}
