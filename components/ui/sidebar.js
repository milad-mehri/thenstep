"use client";

import React, { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import Result from "@/components/ui/result";
import { Skeleton } from "@/components/ui/skeleton";
import fetchCheckpointData from "@/lib/fetchCheckpoint";
import getRoutes from "@/lib/getRoutes";

export default function Sidebar({
  closeSidebar,
  search_obj,
  coords,
  isLoading,
}) {
  const {
    setSearchResults,
    setRouteGeometry,
    userLocation,
    setSelectedResult,
    setRoutes,
  } = useAppStore();
  const [places, setPlaces] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (search_obj) {
      setPlaces(search_obj.places || []);
      setEvents(search_obj.events || []);
    }
  }, [search_obj]);

  return (
    <div className="p-4 no-scrollbar overflow-y-auto h-full">
      {/* Header */}
      <div className="p-2 items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Results</h2>
      </div>

      {/* Display Loading */}
      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        </div>
      ) : (
        <>
          {/* Display Places */}
          <h3 className="text-lg font-semibold">Places</h3>
          <div className="text-black">
            {places.length > 0 ? (
              places.map((place, index) => (
                <Result
                  key={index}
                  title={place.name}
                  description={place.desc}
                  latitude={coords.places[index].lat}
                  longitude={coords.places[index].lng}
                  date={place.address}
                  onClick={async () => {
                    try {
                      const userLat = userLocation?.lat;
                      const userLng = userLocation?.lng;
                      const placeLat = coords.places[index].lat;
                      const placeLng = coords.places[index].lng;
                  
                      const checkpointData = await fetchCheckpointData(
                        userLat,
                        userLng,
                        placeLat,
                        placeLng
                      );
                  
                      const fetchedRoutes = await getRoutes({
                        start: [userLat, userLng],
                        end: [placeLat, placeLng],
                        safety: checkpointData.safety,
                        scenic: checkpointData.scenic,
                      });
                  
                      setRoutes({
                        directRoute: fetchedRoutes.directRoute,
                        scenicRoute: fetchedRoutes.scenicRoute,
                        safetyRoute: fetchedRoutes.safetyRoute,
                      });
                  
                      setSelectedResult({
                        title: place.name,
                        description: place.desc,
                        type: "route",
                        geometry: fetchedRoutes.directRoute.geometry, // Default to direct route geometry
                      });
                    } catch (error) {
                      console.error("Error handling location selection:", error);
                    }
                  }}
                                  />
              ))
            ) : (
              <p className="text-black">No places found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
