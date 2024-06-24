import { useState } from 'react'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import { CircularProgress } from '@mui/material'

const CurrentLocation = ({
  borderFind,
  textColorFind,
  textColorTitle,
  setLocalCity,
}) => {
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)

  const getMyLocation = () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
              import.meta.env.VITE_GOOGLE_API_KEY
            }`,
          )
            .then(response => response.json())
            .then(data => {
              const city = data.results[0].address_components.find(
                component => component.types.includes('locality'),
              ).long_name
              setLocalCity(city)
              setCity(city)
              setLoading(false)
            })
            .catch(error => {
              console.log(error)
              setLoading(false)
            })
        },
        error => {
          console.log(error)
          setLoading(false)
        },
      )
    } else {
      console.log('Geolocation is not supported by this browser.')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center py-2">
      <p className={`${textColorTitle} font-roboto-regular text-[14px]`}>
        Current Location
      </p>
      {city ?
        <p
          className={`text-[14px] ${borderFind} ${textColorFind} border-2 px-2 py-1 rounded-[15px]`}>
          {city}
        </p>
      : <div
          className={`flex gap-2 items-center cursor-pointer ${borderFind} ${textColorFind} border-2 px-2 py-1 rounded-[15px] `}
          onClick={getMyLocation}>
          {loading ?
            <CircularProgress size={15} style={{ color: '#777BF3' }} />
          : <>
              <MyLocationIcon className="e" style={{ fontSize: 15 }} />
              <p className="text-[14px]">Find my location </p>
            </>
          }
        </div>
      }
    </div>
  )
}

export default CurrentLocation
