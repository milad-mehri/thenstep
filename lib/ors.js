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
  