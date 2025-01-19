// components/ui/map.js
"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
<<<<<<< Updated upstream
  useMapEvents,
=======
>>>>>>> Stashed changes
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useAppStore } from "@/lib/store";
import { fetchORSRoute } from "@/lib/ors"; // Update the import path accordingly

<<<<<<< Updated upstream
=======
// Leaflet default marker icons
>>>>>>> Stashed changes
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

<<<<<<< Updated upstream
// Override default for search results
=======
// Override Leaflet's default icon
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
// Custom icon for user location
=======
// Custom icon for user's current location
>>>>>>> Stashed changes
const userLocationIcon = L.icon({
  iconUrl:
    "https://cdn3.iconfinder.com/data/icons/maps-and-navigation-7/65/68-512.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

<<<<<<< Updated upstream
// Button to fly to user location
=======
// Button to fly to the user's location
>>>>>>> Stashed changes
function FlyToUserLocationButton() {
  const map = useMap();

  const handleFlyToLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          map.flyTo([coords.latitude, coords.longitude], 13, { duration: 2 });
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

<<<<<<< Updated upstream
function AddPinOnClick({ onPinAdd }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onPinAdd({ lat, lng });
    },
  });
=======
// Fit the map to the route
function FitToRoute({ route }) {
  const map = useMap();

  useEffect(() => {
    if (route.length > 1) {
      const bounds = L.latLngBounds(route);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [route, map]);

>>>>>>> Stashed changes
  return null;
}

// Main Map Component
export default function Map() {
<<<<<<< Updated upstream
  const { userLocation, setUserLocation, searchResults } = useAppStore();
  const [hasFetchedLocation, setHasFetchedLocation] = useState(false);
  const [clickedPin, setClickedPin] = useState(null);

=======
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
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[49, -125]}
        zoom={6}
=======
  // Fetch route from ORS API whenever the selected result changes

  useEffect(() => {
    if (selectedResult && selectedResult.type === "route" && selectedResult.geometry) {
      console.log("Selected result geometry:", selectedResult.geometry); // Debug log
  
      fetchORSRoute(selectedResult.geometry)
        .then((route) => setRouteGeometry(route))
        .catch((error) => console.error("Error fetching ORS route:", error));
    } else {
      setRouteGeometry([]);
    }
  }, [selectedResult, setRouteGeometry]);
    
  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[49.266757, -123.245905]} // UBC Rec Center
        zoom={15}
>>>>>>> Stashed changes
        scrollWheelZoom
        zoomControl={false}  // remove default zoom in/out
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

<<<<<<< Updated upstream
=======
        {/* User location */}
>>>>>>> Stashed changes
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>
              <strong>You are here</strong>
            </Popup>
          </Marker>
        )}

<<<<<<< Updated upstream
        <FlyToUserLocationButton />

        {searchResults.map((res, i) => {
          if (
            typeof res.latitude === "number" &&
            typeof res.longitude === "number"
          ) {
            return (
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
            );
          }
          return null;
        })}

        <AddPinOnClick
          onPinAdd={(newPin) => {
            setClickedPin(newPin);
            console.log("Pin dropped at:", newPin);
          }}
        />
        {clickedPin && (
          <Marker position={[clickedPin.lat, clickedPin.lng]}>
=======
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
>>>>>>> Stashed changes
            <Popup>
              <h3 className="font-semibold">{res.title || "Untitled"}</h3>
              <p>{res.description || "No description."}</p>
            </Popup>
          </Marker>
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
        )}
      </MapContainer>
    </div>
  );
}
