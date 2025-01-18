"use client";

import React, { use, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAppStore } from "../../lib/store"; // Import the Zustand store


const FlyToUserLocation = () => {
  const map = useMap();

  const handleFlyToLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.flyTo([latitude, longitude], 13, {
            duration: 2, // Animation duration in seconds
          });
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

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
  );
};


export default function Map() {
  const { userLocation, setUserLocation } = useAppStore();
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  // const map = useMap();

  // Fetch user's current location on mount
  useEffect(() => {
    if (!userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error fetching location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, [userLocation, setUserLocation]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="h-screen w-full">
      <div className="flex justify-center">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-50 p-2 rounded-xl border border-gray-300 bg-white transition-all duration-300 ${
            isFocused ? "w-1/2" : "w-1/4"
          }`}
        />
      </div>
      <MapContainer
        center={{lat: 49, lng: -123}} // Default to Vancouver
        zoom={13}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {userLocation && <Marker position={userLocation} />}
        <FlyToUserLocation />
        
      </MapContainer>
    </div>
  );
}
