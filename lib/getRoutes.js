const fetchCheckpointData = require("./fetchCheckpoint");

const apiKey = "5b3ce3597851110001cf624837766d422a9b4d7482ba25be78e36eac";
const baseURL = "https://api.openrouteservice.org/v2/directions";

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

// Example Usage
async function getRoutes(data) {
  const { start, scenic, safety, end } = data;

  const startCoords = [start[1], start[0]]; // Convert to [lng, lat]
  const endCoords = [end[1], end[0]]; // Convert to [lng, lat]

  const scenicCoords = scenic.map((item) => [item[1], item[0]]); // lng, lat
  const safetyCoords = safety.map((item) => [item[1], item[0]]); // lng, lat

  try {
    // Route 1: Start -> Scenic Checkpoints -> End
    const scenicRoute = await getRoute(
      [startCoords, ...scenicCoords.slice(0, 3), endCoords],
      "foot-walking"
    );

    // Route 2: Start -> Safety Checkpoints -> End
    const safetyRoute = await getRoute(
      [startCoords, ...safetyCoords.slice(0, 3), endCoords],
      "foot-walking"
    );

    // Route 3: Start -> End
    const directRoute = await getRoute(
      [startCoords, endCoords],
      "foot-walking"
    );

    console.log("Scenic Route:", scenicRoute);
    console.log("Safety Route:", safetyRoute);
    console.log("Direct Route:", directRoute);

    return {
      scenicRoute,
      safetyRoute,
      directRoute,
    };
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
}

module.exports = getRoutes;


// // Example Usage
// (async () => {
//   try {
//     const checkpointData = await fetchCheckpointData(
//       49.2956096,
//       -123.1430471,
//       49.286314,
//       -123.1434865
//     )
//     const routes = await getRoutes({
//       start: [49.2956096, -123.1430471],
//       end: [49.286314, -123.1434865],
//       safety:checkpointData.safety,
//       scenic: checkpointData.scenic
//     });
//     console.log("Routes fetched successfully:", routes);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();
