"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useAppStore } from "@/lib/store";
import { fetchORSRoute } from "@/lib/ors";

// Leaflet default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Override Leaflet's default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Google_Maps_pin.svg/1200px-Google_Maps_pin.svg.png",
  shadowUrl: markerShadow.src,
  iconSize: [40, 65],
  iconAnchor: [20, 65],
  popupAnchor: [0, -60],
  shadowSize: [65, 65],
});

// Custom icon for user's current location
const userLocationIcon = L.icon({
  iconUrl:
    "https://cdn3.iconfinder.com/data/icons/maps-and-navigation-7/65/68-512.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Button to fly to the user's location
function FlyToUserLocationButton() {
  const map = useMap();

  const handleFlyToLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          map.flyTo([coords.latitude, coords.longitude], 18, { duration: 2 });
        },
        (error) => console.error("Error retrieving location:", error)
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
        bottom: "10px",
        right: "10px",
        zIndex: 1000,
        padding: "10px",
        backgroundColor: "#27272a",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Fly to My Location
    </button>
  );
}

// Fit the map to the route
function FitToRoute({ route }) {
  const map = useMap();

  useEffect(() => {
    if (route.length > 1) {
      const bounds = L.latLngBounds(route);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [route, map]);

  return null;
}

// Main Map Component
export default function Map() {
  const {
    routeGeometry,
    setRouteGeometry,
    selectedResult,
    userLocation,
    setUserLocation,
    searchResults,
  } = useAppStore();
  const [hasFetchedLocation, setHasFetchedLocation] = useState(false);

  // Fetch user's location on mount
  useEffect(() => {
    if (!hasFetchedLocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setHasFetchedLocation(true);
        },
        (err) => console.error("Error fetching location:", err),
        { enableHighAccuracy: true }
      );
    }
  }, [hasFetchedLocation, setUserLocation]);

  // Fetch route from ORS API whenever the selected result changes
  useEffect(() => {
    if (
      selectedResult &&
      selectedResult.type === "route" &&
      Array.isArray(selectedResult.geometry) &&
      selectedResult.geometry.length >= 2
    ) {
      fetchORSRoute(selectedResult.geometry)
        .then((route) => setRouteGeometry(route))
        .catch((error) => console.error("Error fetching ORS route:", error));
    } else {
      console.warn("No valid geometry for selected result.");
      setRouteGeometry([]);
    }
  }, [selectedResult, setRouteGeometry]);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[49.266757, -123.245905]} // UBC Rec Center
        zoom={15}
        scrollWheelZoom
        zoomControl={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* User location */}
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>
              <strong>You are here</strong>
            </Popup>
          </Marker>
        )}

        {/* Fly-to-location button */}
        <FlyToUserLocationButton />

        {/* Search result markers */}
        {searchResults.map((res, i) => (
          <Marker
            key={i}
            position={[res.latitude, res.longitude]}
            eventHandlers={{
              mouseover: (e) => e.target.openPopup(),
              mouseout: (e) => e.target.closePopup(),
            }}
          >
            <Popup>
              <h3 className="font-semibold">{res.title || "Untitled"}</h3>
              <p>{res.description || "No description."}</p>
            </Popup>
          </Marker>
        ))}

        {/* Render the route as a polyline */}
        {routeGeometry.length > 1 && (
          <>
            <Polyline
              pathOptions={{ color: "blue", weight: 4 }}
              positions={routeGeometry}
            />
            <FitToRoute route={routeGeometry} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
