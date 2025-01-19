async function fetchCheckpointData(lat, lng, endLat, endLng) {
    const endpoint = `http://localhost:3001/checkpoints?lat=${lat}&lng=${lng}&endlat=${endLat}&endlng=${endLng}`;
  
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching checkpoint data:", error);
      throw error;
    }
  }
  
  // Export using CommonJS
  module.exports = fetchCheckpointData;
  