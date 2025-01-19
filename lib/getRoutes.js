const polyline = require("@mapbox/polyline");

const apiKey = "5b3ce3597851110001cf624837766d422a9b4d7482ba25be78e36eac";
const baseURL = "https://api.openrouteservice.org/v2/directions";

// Define the getRoute function
async function getRoute(coordinates, mode) {
  const url = `${baseURL}/${mode}`;
  const body = JSON.stringify({ coordinates });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching route:", error);
    throw error;
  }
}

// Main getRoutes function
async function getRoutes(data) {
  const { start, scenic, safety, end } = data;

  const startCoords = [start[1], start[0]]; // [lng, lat]
  const endCoords = [end[1], end[0]];

  const scenicCoords = scenic.map((item) => [item[1], item[0]]);
  const safetyCoords = safety.map((item) => [item[1], item[0]]);

  try {
    // Fetch each route
    const scenicRoute = await getRoute(
      [startCoords, ...scenicCoords.slice(0, 3), endCoords],
      "foot-walking"
    );
    const safetyRoute = await getRoute(
      [startCoords, ...safetyCoords.slice(0, 3), endCoords],
      "foot-walking"
    );
    const directRoute = await getRoute([startCoords, endCoords], "foot-walking");

    // Decode geometry for each route
    return {
      scenicRoute: {
        ...scenicRoute,
        geometry: polyline.decode(scenicRoute.routes[0].geometry),
      },
      safetyRoute: {
        ...safetyRoute,
        geometry: polyline.decode(safetyRoute.routes[0].geometry),
      },
      directRoute: {
        ...directRoute,
        geometry: polyline.decode(directRoute.routes[0].geometry),
      },
    };
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
}

module.exports = getRoutes;
