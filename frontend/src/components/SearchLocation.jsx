import { useEffect, useRef, useState } from "react";

// # im Elternelement einen state mit leerem Objekt erstellen, hier als Props übergeben und dann mit den einzelnen Daten befüllen, damit sie als append zur formData mit ans Backend geschickt werden können

// https://www.youtube.com/watch?v=LnF79PMKHUs
// https://github.com/delowardev/google-places-autocomplete
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

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

// Page starts here
const SearchLocation = ({ location, setLocation }) => {
  const searchInput = useRef(null);
  const [address, setAddress] = useState({});
  const [query, setQuery] = useState("");

  // extract the single address details from the searched place
  const extractAddress = (place) => {
    const address = {
      name: place.name,
      street: "",
      streetNumber: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      lat: place.geometry.location.lat(),
      lon: place.geometry.location.lng(),
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
      if (types.includes("street_number")) {
        address.streetNumber = value;
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

    setLocation(address);

    return address;
  };

  // init gmap script
  const initMapScript = () => {
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly&language=en`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setAddress(extractAddress(place));
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry", "name"]); // --> hier können wietere Felder gesetzt werden, falls benötigt
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => {
      initAutocomplete();
    });
  }, []);

  return (
    <>
      <div className="">
        <div className="relative">
          <h3 className="absolute top-[-10px] left-4 text-[#7254EE] text-[13px] bg-white px-1 ml-[-7px] font-roboto-regular">
            Location
          </h3>
          <input
            name="location"
            placeholder=""
            className="border rounded-[16px] border-purple-1 p-4 text-purple-1 font-roboto-regular focus:outline-1 focus:outline-green-1 w-full"
            ref={searchInput}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {Object.keys(address).length > 0 && (
          <div className=" bg-purple-1 w-fit px-4 rounded-[16px] py-2 mt-3 mb-2">
            <p className="text-white font-roboto-regular">{address?.name}</p>
            <p className="text-white font-roboto-regular">
              {address?.street} {address?.streetNumber}
            </p>
            <p className="text-white font-roboto-regular">
              {address?.zip} {address?.city}
            </p>
            <p className="text-white font-roboto-regular">{address?.country}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchLocation;
