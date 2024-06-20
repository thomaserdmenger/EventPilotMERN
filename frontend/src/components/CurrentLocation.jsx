import { useState } from 'react'
import MyLocationIcon from '@mui/icons-material/MyLocation'

const CurrentLocation = ({
  borderFind,
  textColorFind,
  textColorTitle,
}) => {
  const [city, setCity] = useState('')

  const getMyLocation = () => {
    // get lat/long and search in Google Api:
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showCity)
    } else {
      console.log('Geolocation is not supported by this browser.')
    }

    // Then, pass the location coordinates to a Geocoding API to get the city name
    function showCity(position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      // Make a request to a Geocoding API (e.g. Google Maps Geocoding API)
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }`,
      )
        .then(response => response.json())
        .then(data => {
          // Parse the city name from the API response (to find under "locality")
          const city = data.results[0].address_components.find(component =>
            component.types.includes('locality'),
          ).long_name

          setCity(city)
        })
        .catch(error => console.log(error))
    }
  }

  return (
    <div className="flex flex-col items-center py-2">
      <p className={`${textColorTitle} font-roboto-regular text-[14px]`}>
        Current Location
      </p>
      {city ?
        <p className="">{city}</p>
      : <div
          className={`flex gap-2 items-center cursor-pointer ${borderFind} ${textColorFind}  border-2 px-2 py-1 rounded-[15px] `}
          onClick={getMyLocation}>
          <MyLocationIcon className="e" style={{ fontSize: 15 }} />
          <p className={`text-[14px]`}>Find my location </p>
        </div>
      }
    </div>
  )
}

export default CurrentLocation
