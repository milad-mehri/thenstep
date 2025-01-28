async function fetchCheckpointData(lat, lng, endLat, endLng) {
  // const endpoint = `http://localhost:3001/checkpoints?lat=${lat}&lng=${lng}&endlat=${endLat}&endlng=${endLng}`;

  // try {
  //   const response = await fetch(endpoint, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error(`Error: ${response.status} - ${response.statusText}`);
  //   }

  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error("Error fetching checkpoint data:", error);
  //   throw error;
  // }

  return {
    start: "University of British Columbia, Vancouver, BC",
    scenic: [
      [49.2691, -123.2609, "Spanish Banks Beach, Vancouver, BC"],
      [49.2744, -123.2074, "Kitsilano Beach, Vancouver, BC"],
      [49.2718, -123.1475, "False Creek Seawall, Vancouver, BC"],
    ],
    safety: [
      [49.2623, -123.1386, "Broadway-City Hall Station, Vancouver, BC"],
      // [49.2681, -123.1239, "Mount Pleasant, Vancouver, BC"],
      // [49.2727, -123.1034, "Science World, 1455 Quebec St, Vancouver, BC"],
    ],
    end: "Science World, 1455 Quebec St, Vancouver, BC",
  };
}

// Export using CommonJS
module.exports = fetchCheckpointData;
