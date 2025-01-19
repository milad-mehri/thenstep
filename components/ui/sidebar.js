"use client";

import React, { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import Result from "@/components/ui/result";
import { Skeleton } from "@/components/ui/skeleton";
import RouteDetailsSidebar from "@/components/ui/RouteDetailsSidebar";
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
    setRouteDetails,
  } = useAppStore();
  const [routes, setRoutes] = useState(null);
  const [places, setPlaces] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (search_obj) {
      setPlaces(search_obj.places || []);
      setEvents(search_obj.events || []);
    }
  }, [search_obj]);

  const handleClick = () => {
    closeSidebar();
  };

  return (
    <div className="p-4 no-scrollbar overflow-y-auto h-full">
      {/* Header with Close Button */}
      <div className=" p-2 items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Results</h2>
        {/* <button
          onClick={handleClick}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close sidebar"
        >
          <span className="text-lg font-bold">&times;</span>
        </button> */}
      </div>

      {/* Display loading skeleton */}
      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <>
          {/* Display places */}
          <h3 className="text-lg font-semibold">Places</h3>
          <div className="text-black">
            {places.length > 0 ? (
              places.map((place, index) => (
                // <Result key={index} title={place.name} description={place.desc} latitude={coords.places[index].lat} longitude={coords.places[index].lng} date={place.address}/>
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

                      // Step 1: Fetch checkpoint data
                      const checkpointData = await fetchCheckpointData(
                        userLat,
                        userLng,
                        placeLat,
                        placeLng
                      );
                      console.log("Checkpoint Data:", checkpointData);

                      // Step 2: Get routes using getRoutes
                      const routes = await getRoutes({
                        start: [userLat, userLng],
                        end: [placeLat, placeLng],
                        safety: checkpointData.safety,
                        scenic: checkpointData.scenic,
                      });
                      console.log("Routes:", routes);

                      // Optional: Update store or state with routes
                      setSelectedResult({
                        title: place.name,
                        description: place.desc,
                        type: "route",
                      });

                      setRoutes({
                        directRoute: routes.directRoute,
                        scenicRoute: routes.scenicRoute,
                        safetyRoute: routes.safetyRoute,
                      });
                    } catch (error) {
                      console.error(
                        "Error handling location selection:",
                        error
                      );
                    }
                  }}
                />
              ))
            ) : (
              <p className="text-black">No places found</p>
            )}
          </div>
          <div className="text-black">
            {events.length > 0 ? (
              events.map((event, index) => (
                <Result
                  key={index}
                  title={event.name}
                  description={event.desc}
                />
              ))
            ) : (
              <p></p>
            )}
          </div>
        </>
      )}
      {routes && <RouteDetailsSidebar routes={routes} />}
    </div>
  );
}
