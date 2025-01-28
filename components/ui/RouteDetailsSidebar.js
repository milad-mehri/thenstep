"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/ui/skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLeaf,
  faTree,
  faLock,
  faPersonRunning,
  faPersonWalking,
  faCar,
} from "@fortawesome/free-solid-svg-icons";

export default function RouteDetailsSidebar() {
  const { routes, setRouteGeometry, selectedResult, routeLoading } = useAppStore();

  if (!selectedResult || !routes) {
    return (
      <div className="fixed top-0 right-0 w-80 h-full bg-white border-l border-gray-200 z-50 shadow-lg overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b border-gray-300">Route Options</h2>
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

  // Pre-filled data for Science World (example values)
  const details = {
    scenic: {
      running: { calories: 350, time: "45 mins" },
      walking: { calories: 200, time: "1 hr 30 mins" },
      driving: { time: "15 mins" },
    },
    safety: {
      running: { calories: 330, time: "40 mins" },
      walking: { calories: 190, time: "1 hr 20 mins" },
      driving: { time: "12 mins" },
    },
    direct: {
      running: { calories: 300, time: "35 mins" },
      walking: { calories: 180, time: "1 hr 15 mins" },
      driving: { time: "10 mins" },
    },
  };

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white border-l border-gray-200 z-50 shadow-lg overflow-y-auto">
      <h2 className="text-xl font-semibold p-4 border-b border-gray-300">
        Routes to {selectedResult.title}
      </h2>
      <p className="text-sm text-gray-600 px-4 mb-4">{selectedResult.description}</p>

      {routeLoading ? (
        <div className="space-y-4 px-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[125px] w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-4 px-4">
          {/* Scenic Route */}
          <div>
            <button
              className={`w-full p-3 text-center font-semibold rounded-lg shadow border transition ${
                scenicRoute?.geometry
                  ? "bg-white hover:bg-gray-100 text-gray-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => handleRouteSelection(scenicRoute)}
              disabled={!scenicRoute?.geometry}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faTree} className="text-gray-500" />
                  <FontAwesomeIcon icon={faLeaf} className="text-gray-500" />
                  <span>Scenic Route</span>
                </span>
              </div>
            </button>
            <div className="mt-2 text-sm text-gray-600 pl-6">
              <p>
                <FontAwesomeIcon icon={faPersonRunning} className="text-gray-500 mr-2" />
                Running: {details.scenic.running.calories} calories, {details.scenic.running.time}
              </p>
              <p>
                <FontAwesomeIcon icon={faPersonWalking} className="text-gray-500 mr-2" />
                Walking: {details.scenic.walking.calories} calories, {details.scenic.walking.time}
              </p>
              <p>
                <FontAwesomeIcon icon={faCar} className="text-gray-500 mr-2" />
                Driving: {details.scenic.driving.time}
              </p>
            </div>
          </div>

          {/* Safety Route */}
          <div>
            <button
              className={`w-full p-3 text-center font-semibold rounded-lg shadow border transition ${
                safetyRoute?.geometry
                  ? "bg-white hover:bg-gray-100 text-gray-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => handleRouteSelection(safetyRoute)}
              disabled={!safetyRoute?.geometry}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faLock} className="text-gray-500" />
                  <FontAwesomeIcon icon={faLeaf} className="text-gray-500" />
                  <span>Safety Route</span>
                </span>
              </div>
            </button>
            <div className="mt-2 text-sm text-gray-600 pl-6">
              <p>
                <FontAwesomeIcon icon={faPersonRunning} className="text-gray-500 mr-2" />
                Running: {details.safety.running.calories} calories, {details.safety.running.time}
              </p>
              <p>
                <FontAwesomeIcon icon={faPersonWalking} className="text-gray-500 mr-2" />
                Walking: {details.safety.walking.calories} calories, {details.safety.walking.time}
              </p>
              <p>
                <FontAwesomeIcon icon={faCar} className="text-gray-500 mr-2" />
                Driving: {details.safety.driving.time}
              </p>
            </div>
          </div>

          {/* Direct Route */}
          <div>
            <button
              className={`w-full p-3 text-center font-semibold rounded-lg shadow border transition ${
                directRoute?.geometry
                  ? "bg-white hover:bg-gray-100 text-gray-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => handleRouteSelection(directRoute)}
              disabled={!directRoute?.geometry}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faClock} className="text-gray-500" />
                  <FontAwesomeIcon icon={faLeaf} className="text-gray-500" />
                  <span>Direct Route</span>
                </span>
              </div>
            </button>
            <div className="mt-2 text-sm text-gray-600 pl-6">
              <p>
                <FontAwesomeIcon icon={faPersonRunning} className="text-gray-500 mr-2" />
                Running: {details.direct.running.calories} calories, {details.direct.running.time}
              </p>
              <p>
                <FontAwesomeIcon icon={faPersonWalking} className="text-gray-500 mr-2" />
                Walking: {details.direct.walking.calories} calories, {details.direct.walking.time}
              </p>
              <p>
                <FontAwesomeIcon icon={faCar} className="text-gray-500 mr-2" />
                Driving: {details.direct.driving.time}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
