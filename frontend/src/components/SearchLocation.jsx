import { useEffect, useRef, useState } from "react";

// https://www.youtube.com/watch?v=LnF79PMKHUs
// https://github.com/delowardev/google-places-autocomplete
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
// # noch reverse geocoding, ab min 12:00

// load google map api js
function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

// extract the single address details from the searched place
const extractAddress = (place) => {
  const address = {
    name: place.name,
    city: "",
    state: "",
    zip: "",
    country: "",
    lat: place.geometry.location.lat(),
    lon: place.geometry.location.lng(),
    plain() {
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + zip + state + this.country;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("route")) {
      address.street = value;
    }
    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }
  });

  return address;
};

// Page starts here
const SearchLocation = () => {
  const searchInput = useRef(null);
  const [address, setAddress] = useState({});
  const [query, setQuery] = useState("");

  // init gmap script
  const initMapScript = () => {
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setAddress(extractAddress(place));
  };
  console.log(address);

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry", "name"]); // --> hier können wietere Felder gesetzt werden, falls benötigt
    //# mit dem Folgenden passiert noch ein Fehler -> das Input Feld ändert sich zurück auf den eingegebenen Text, setValue auch setzen?
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  // notwendig, falls wir Standort Infos brauchen - bei Input eig unnötig
  //   const reverseGeocode = ({ latitude: lat, longitude: lng }) => {};
  //   const findMyLocation = () => {};

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => {
      initAutocomplete();
    });
  }, []);

  return (
    <>
      <h1>search location input</h1>
      <input
        ref={searchInput}
        type="text"
        placeholder="Search location...."
        className="border-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* <button onClick={findMyLocation}>search</button> */}
      <div>
        <p>{address?.name}</p>
        <p>{address?.street}</p>
      </div>
    </>
  );
};

export default SearchLocation;
