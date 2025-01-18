// components/ui/map.jsx
"use client"

import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useAppStore } from "@/lib/store"
import Pin from "./pin"


function FlyToUserLocationButton() {
  const map = useMap()

  const handleFlyToLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          map.flyTo([coords.latitude, coords.longitude], 13, { duration: 2 })
        },
        (error) => console.error("Error retrieving location:", error)
      )
    } else {
      alert("Geolocation is not supported by your browser.")
    }
  }

  return (
    <button
      onClick={handleFlyToLocation}
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 1000,
        padding: "10px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Fly to My Location
    </button>
  )
}

export default function Map() {
  const { userLocation, setUserLocation, searchResults } = useAppStore()
  const [hasFetchedLocation, setHasFetchedLocation] = useState(false)

  // Debug: check if we actually have searchResults
  console.log("searchResults from store:", searchResults)

  useEffect(() => {
    if (!hasFetchedLocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
          setHasFetchedLocation(true)
        },
        (err) => console.error("Error fetching location:", err),
        { enableHighAccuracy: true }
      )
    }
  }, [hasFetchedLocation, setUserLocation])

  return (
    <div className="relative h-full w-full">
      <MapContainer
        // Zoom out more so you can see if pins are ~7 degrees away from center
        center={[49, -125]}
        zoom={6}
        scrollWheelZoom
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Marker for user location */}
        {userLocation && (
          <Marker position={userLocation}>
            {/* optional Popup */}
          </Marker>
        )}

        <FlyToUserLocationButton />

        {/* Render each search result as a pin */}
        {searchResults.map((res, i) => {
          // only render if lat/long exist
          if (
            typeof res.latitude === "number" &&
            typeof res.longitude === "number"
          ) {
            return (
              <Pin
                key={i}
                lat={res.latitude}
                lng={res.longitude}
                title={res.title}
                description={res.description}
              />
            )
          }
          return null
        })}
      </MapContainer>
    </div>
  )
}
