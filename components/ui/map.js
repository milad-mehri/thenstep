// components/ui/map.jsx
"use client"

import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useAppStore } from "@/lib/store"

// (1) Import default Leaflet icons and override
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
  shadowUrl: markerShadow.src,
  iconSize: [40, 65],
  iconAnchor: [20, 65],
  popupAnchor: [0, -60],
  shadowSize: [65, 65],
})

// A simple button to geolocate user, then pan the map to them
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

  // Debug: see what searchResults we have
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
        center={[49, -125]} // Zoomed out to see results around -130 to -123
        zoom={6}
        scrollWheelZoom
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* User's current location marker (if available) */}
        {userLocation && (
          <Marker position={userLocation}>
            {/* Optional popup for user location */}
          </Marker>
        )}

        <FlyToUserLocationButton />

        {/* For each search result, create a Marker with optional Popup */}
        {searchResults.map((res, i) => {
          if (
            typeof res.latitude === "number" &&
            typeof res.longitude === "number"
          ) {
            return (
              <Marker
                key={i}
                position={[res.latitude, res.longitude]}
              >
                <Popup>
                  <h3 className="font-semibold">{res.title || "No Title"}</h3>
                  <p>{res.description || "No Description"}</p>
                </Popup>
              </Marker>
            )
          }
          return null
        })}
      </MapContainer>
    </div>
  )
}
