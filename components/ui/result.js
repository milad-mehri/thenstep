"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import placeholder from "@/public/vercel.svg";

export default function Result({
  selected = false,
  title = "Untitled",
  description = "No description provided",
  longitude = "N/A",
  latitude = "N/A",
  date = "Unknown date",
  image = "",
  type = "place", // NEW
  geometry = [],   // NEW
  ...props
}) {
  const { setRouteGeometry } = useAppStore();

  return (
    <div
      className={`border rounded-md p-4 my-3 transition-all ${
        selected ? "bg-gray-100" : "hover:bg-gray-100"
      } cursor-pointer`}
      {...props}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>

      <div className="mt-2 text-xs text-gray-500">
        <p>Coordinates: {latitude}, {longitude}</p>
        <p>Date: {date}</p>
      </div>

      {/* If it's a route, show a button to set the route geometry */}
      {type === "route" && geometry.length > 1 && (
        <button
          onClick={() => setRouteGeometry(geometry)}
          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
        >
          Show Route on Map
        </button>
      )}
    </div>
  );
}
