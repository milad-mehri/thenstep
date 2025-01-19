"use client";

import React from "react";
import { useAppStore } from "@/lib/store";

export default function RouteDetailsSidebar() {
  const { routes, setRouteGeometry, selectedResult } = useAppStore(); // Access routes, selected result, and geometry setter

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

  // Handle missing route types gracefully
  const scenicRoute = routes.scenicRoute || { time: "N/A", geometry: null };
  const safetyRoute = routes.safetyRoute || { time: "N/A", geometry: null };
  const directRoute = routes.directRoute || { time: "N/A", geometry: null };

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white border-l border-gray-200 z-50 shadow-lg overflow-y-auto">
      {JSON.stringify(routes)}
      <h2 className="text-xl font-semibold p-4 border-b border-gray-300">
        Routes to {selectedResult.title}
      </h2>
      <p className="text-sm text-gray-600 px-4 mb-4">{selectedResult.description}</p>

      <div className="space-y-4 px-4">
        {/* Scenic Route */}
        <button
          className={`w-full p-3 text-center font-semibold rounded-lg shadow transition ${
            scenicRoute.geometry
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => scenicRoute.geometry && setRouteGeometry(scenicRoute.geometry)}
          disabled={!scenicRoute.geometry}
        >
          Scenic Route (Estimated Time: {scenicRoute.time} mins)
        </button>

        {/* Safety Route */}
        <button
          className={`w-full p-3 text-center font-semibold rounded-lg shadow transition ${
            safetyRoute.geometry
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => safetyRoute.geometry && setRouteGeometry(safetyRoute.geometry)}
          disabled={!safetyRoute.geometry}
        >
          Safety Route (Estimated Time: {safetyRoute.time} mins)
        </button>

        {/* Direct Route */}
        <button
          className={`w-full p-3 text-center font-semibold rounded-lg shadow transition ${
            directRoute.geometry
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => directRoute.geometry && setRouteGeometry(directRoute.geometry)}
          disabled={!directRoute.geometry}
        >
          Direct Route (Estimated Time: {directRoute.time} mins)
        </button>
      </div>
    </div>
  );
}
