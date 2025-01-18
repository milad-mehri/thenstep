"use client"

import React from "react"

export default function Result({
  title = "Untitled",
  description = "No description provided",
  longitude = "N/A",
  latitude = "N/A",
  date = "Unknown date",
  image = "https://via.placeholder.com/150", // placeholder image
}) {
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
    </div>
  )
}
