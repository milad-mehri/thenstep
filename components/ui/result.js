"use client"

import React from "react"
import { useAppStore } from "@/lib/store"

export default function Result({
  title = "Untitled",
  description = "No description provided",
  longitude = "N/A",
  latitude = "N/A",
  date = "Unknown date",
  image = "https://via.placeholder.com/150",
  type = "place", // NEW
  geometry = [],   // NEW
}) {
  const { setRouteGeometry } = useAppStore()

  return (
    <div className="border rounded-md p-4">
      <img
        src={image}
        alt={title}
        className="w-full h-auto mb-2 rounded-md object-cover"
      />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-700">{description}</p>

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
  )
}
