// components/ui/sidebar.js
"use client";

import React, { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import Result from "@/components/ui/result";
import { fetchORSRoute } from "@/lib/ors";

export default function Sidebar({ closeSidebar }) {
  const {
    searchTerm,
    setSearchResults,
    setRouteGeometry,
    userLocation,
    setSelectedResult,
    setRouteDetails,
  } = useAppStore();

  const [places, setPlaces] = useState([]);
  const [webResults, setWebResults] = useState(null);

  // Fetch results explicitly when the user submits a search
  const fetchResults = async () => {
    if (!searchTerm.trim()) {
      console.log("Search term is empty, skipping fetch.");
      return;
    }
    if (!userLocation) {
      console.error("User location not available, cannot proceed with fetch.");
      return;
    }

    const userLocationQuery =""// `The current location of the user is: ${userLocation.lng}, ${userLocation.lat}`;
    console.log(`Fetching results for searchTerm: "${searchTerm}" with userLocation: ${userLocationQuery}`);

    try {
      const response = await fetch(
        `http://localhost:3001/search?q=${encodeURIComponent(
          searchTerm
        )}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch results. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      const validPlaces = (data.places || []).filter(
        (place) => place.lat !== undefined && place.lng !== undefined
      );
  
      setPlaces(validPlaces);
      setWebResults(data.webresults || {});
      setSearchResults(validPlaces);

      console.log("Places:", data.places || []);
      console.log("WebResults:", data.webresults || {});
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Handle result selection and fetch route
  const handleResultClick = async (result) => {
    console.log("Result clicked:", result);
    setSelectedResult(result);

    if (userLocation) {
      try {
        console.log("Fetching route details...");
        const details = [
          {
            mode: "Walking",
            time: "15 mins",
            benefits: [
              { label: "Eco-Friendly", icon: "ecoFriendly" },
              { label: "Exercise", icon: "exercise" },
            ],
          },
          {
            mode: "Jogging",
            time: "10 mins",
            benefits: [{ label: "Exercise", icon: "exercise" }],
          },
          {
            mode: "Biking",
            time: "8 mins",
            benefits: [
              { label: "Eco-Friendly", icon: "ecoFriendly" },
              { label: "Exercise", icon: "exercise" },
            ],
          },
          {
            mode: "Scenic Path",
            time: "20 mins",
            benefits: [{ label: "Scenic Beauty", icon: "scenic" }],
          },
        ];

        setRouteDetails(details);
        console.log("Route details set:", details);

        // Fetch and display the route geometry
        const route = await fetchORSRoute([
          [userLocation.lat, userLocation.lng],
          [result.lat, result.lng],
        ]);
        setRouteGeometry(route);
        console.log("Route geometry set:", route);
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    } else {
      console.error("User location not available, cannot fetch route.");
    }
  };

  // Fetch results when the component renders if there's a valid searchTerm
  useEffect(() => {
    if (searchTerm.trim()) {
      fetchResults();
    }
  }, [searchTerm]);

  return (
    <div className="p-4 no-scrollbar overflow-y-auto h-full">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Results</h2>
        <button
          onClick={closeSidebar}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close sidebar"
        >
          <span className="text-lg font-bold">&times;</span>
        </button>
      </div>

      {searchTerm.length === 0 ? (
        <p className="text-sm text-gray-500">No search yet.</p>
      ) : webResults && Object.keys(webResults).length > 0 ? (
        <>
          {/* Display events first */}
          {webResults.events && webResults.events.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Events</h3>
              <div className="flex flex-col gap-4">
                {webResults.events.map((event, i) => (
                  <div
                    key={`event-${i}`}
                    className="cursor-pointer"
                    onClick={() => handleResultClick(event)}
                  >
                    <Result
                      title={event.name}
                      description={event.address}
                      latitude={event.lat}
                      longitude={event.lng}
                      date={event.time}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display landmarks */}
          {webResults.landmarks && webResults.landmarks.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Landmarks</h3>
              <div className="flex flex-col gap-4">
                {webResults.landmarks.map((landmark, i) => (
                  <div
                    key={`landmark-${i}`}
                    className="cursor-pointer"
                    onClick={() => handleResultClick(landmark)}
                  >
                    <Result
                      title={landmark.name}
                      description={`${landmark.address}, ${landmark.state}, ${landmark.country}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Display places if webResults is empty */
        <>
          <h3 className="text-lg font-semibold mb-2">Places</h3>
          <div className="flex flex-col gap-4">
            {places.map((place, i) => (
              <div
                key={`place-${i}`}
                className="cursor-pointer"
                onClick={() => handleResultClick(place)}
              >
                <Result
                  title={place.description}
                  latitude={place.lat}
                  longitude={place.lng}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
