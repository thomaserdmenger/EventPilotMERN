import { useState } from "react";

const CurrentLocation = () => {
  const [city, setCity] = useState("");

  // get lat/long and search in Google Api:
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showCity);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  // Then, pass the location coordinates to a Geocoding API to get the city name
  function showCity(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Make a request to a Geocoding API (e.g. Google Maps Geocoding API)
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
        import.meta.env.VITE_GOOGLE_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        // Parse the city name from the API response (to find under "locality")
        const city = data.results[0].address_components.find((component) =>
          component.types.includes("locality")
        ).long_name;

        setCity(city);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="bg-purple-1 flex flex-col items-center py-2">
      <p className="font-roboto-thin text-white">Current Location</p>
      <p className="text-white">{city}</p>
    </div>
  );
};

export default CurrentLocation;
