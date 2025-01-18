"use client"

import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import { useAppStore } from "@/lib/store"

// We still import Leaflet's marker icons for the shadow image
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

// 1) Override Leaflet's default icon, using your custom iconUrl
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

// A button to fly to user location
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

  // Fetch user location once
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
        center={[49, -125]}
        zoom={6}
        scrollWheelZoom
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* If userLocation is found, show a Marker for it (also uses the custom icon) */}
        {userLocation && (
          <Marker position={userLocation}>
            {/* optional Popup, if you want */}
          </Marker>
        )}

        <FlyToUserLocationButton />

        {/* Render a Marker for each search result, showing a popup on hover */}
        {searchResults.map((res, i) => {
          if (
            typeof res.latitude === "number" &&
            typeof res.longitude === "number"
          ) {
            return (
              <Marker
                key={i}
                position={[res.latitude, res.longitude]}
                // 2) Add eventHandlers for hover
                eventHandlers={{
                  mouseover: (e) => {
                    e.target.openPopup()
                  },
                  mouseout: (e) => {
                    e.target.closePopup()
                  },
                }}
              >
                {/* 3) Show the result details in a Popup */}
                <Popup>
                  <h3 className="font-semibold">{res.title || "Untitled"}</h3>
                  <p>{res.description || "No description."}</p>
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
