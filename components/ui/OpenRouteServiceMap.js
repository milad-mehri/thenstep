"use client"

import React, { useState } from "react"
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// 1) OPTIONAL: If you want to fix Leaflet's default icon paths in Next.js:
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

// Fix default marker icon references so they load in Next.js
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
})


// 2) Function to fetch a walking route from OpenRouteService
export async function fetchORSRoute(coords) {
    if (!Array.isArray(coords) || coords.length < 2) {
      console.error("Invalid coordinates:", coords);
      throw new Error("Invalid coordinates. At least two points are required.");
    }
  
    const apiKey = "5b3ce3597851110001cf624837766d422a9b4d7482ba25be78e36eac";
    const start = `${coords[0][1]},${coords[0][0]}`; // Longitude, Latitude
    const end = `${coords[1][1]},${coords[1][0]}`; // Longitude, Latitude
  
    const url = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${apiKey}&start=${start}&end=${end}`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        },
      });
  
      if (!response.ok) {
        throw new Error(`ORS API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      const coordinates = data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      return coordinates;
    } catch (error) {
      console.error("Error fetching ORS route:", error);
      throw error;
    }
  }
  

// 3) A small helper to programmatically fit the map to our route
function FitToRoute({ route }) {
  const map = useMap()

  React.useEffect(() => {
    if (route.length > 1) {
      const bounds = L.latLngBounds(route)
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [route, map])

  return null
}

// 4) Main component
export default function OpenRouteServiceMap() {
  const [routeCoords, setRouteCoords] = useState([])

  // Example button click: fetch a route from UBC Rec to UBC Hospital
  async function handleGetRoute() {
    try {
      const apiKey = "5b3ce3597851110001cf624837766d422a9b4d7482ba25be78e36eac" // <-- Replace with your real ORS key
      // Must be [lng, lat] for ORS
      const coords = [
        [-123.245905, 49.266757], // UBC Rec Center (start)
        [-123.24567, 49.26664],   // waypoint
        [-123.2451, 49.2649],     // UBC Hospital (end)
      ]

      const result = await fetchORSRoute( coords)
      console.log("Route from ORS:", result)
      setRouteCoords(result)
    } catch (err) {
      console.error("Error fetching route:", err)
    }
  }

  return (
    <div className="h-screen w-screen relative">
      {/* A button to load the route */}
      <button
        onClick={handleGetRoute}
        className="absolute z-10 top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Get Walking Route
      </button>

      <MapContainer
        center={[49.266757, -123.245905]} // near UBC Rec
        zoom={14}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* 5) If we have a route, draw a <Polyline> */}
        {routeCoords.length > 1 && (
          <>
            <Polyline
              pathOptions={{ color: "blue", weight: 4 }}
              positions={routeCoords}
            />
            <FitToRoute route={routeCoords} />
          </>
        )}
      </MapContainer>
    </div>
  )
}
