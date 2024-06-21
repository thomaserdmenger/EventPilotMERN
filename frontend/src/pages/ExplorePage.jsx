import { useContext, useEffect, useRef, useState } from 'react'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import EventCardLarge from '../components/EventCardLarge'
import { UserContext } from '../context/UserContext'
import { backendUrl } from '../api/api'
import { Link } from 'react-router-dom'
import LogoCanvas from '../components/LogoCanvas'
import CurrentLocation from '../components/CurrentLocation'

const ExplorePage = () => {
  const { user } = useContext(UserContext)
  const [upcoming, setUpcoming] = useState([])
  const [trending, setTrending] = useState([])
  const [localCity, setLocalCity] = useState('')
  const [filteredUpcomingEvents, setFilteredUpcomingEvents] = useState([])
  const scrollContainerRef = useRef(null)

  console.log(upcoming)

  useEffect(() => {
    const fetchData = async () => {
      const upcomingRes = await fetch(
        `${backendUrl}/api/v1/events/upcoming`,
      )
      const upcomingData = await upcomingRes.json()
      setUpcoming(upcomingData?.upcomingEvents)

      const trendingRes = await fetch(
        `${backendUrl}/api/v1/events/trending`,
      )
      const trendingData = await trendingRes.json()
      setTrending(trendingData?.trendingEvents)
    }
    fetchData()
  }, [user])

  useEffect(() => {
    setFilteredUpcomingEvents(
      upcoming.filter(event => event.location.name === localCity),
    )
  }, [upcoming, localCity])

  return (
    <div className="h-svh">
      <div className="pb-[6.375rem] flex flex-col gap-5 px-2">
        <div className="w-full flex items-center ">
          <div className="h-20 w-20">
            <LogoCanvas scale={0.3} />
          </div>
          <div className="w-full">
            <CurrentLocation
              borderFind={'border-purple-4'}
              textColorFind={'text-purple-4'}
              setLocalCity={setLocalCity}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h2 className="mb-2 pl-2 font-roboto-bold text-black-1">
              Trending Events
            </h2>
            <Link>
              <div className="flex items-center font-roboto-regular text-[14px] text-black-1">
                <p>See All</p>
                <div className="pb-[3px] text-black-1">
                  <KeyboardDoubleArrowRightIcon
                    sx={{ stroke: '#ffffff', strokeWidth: 1 }}
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex gap-5 overflow-x-scroll px-1 pb-3 whitespace-nowrap scrollbar-hide">
            {trending?.slice(0, 5).map(event => (
              <div key={event?._id}>
                <EventCardLarge
                  event={event}
                  className="inline-block mr-4"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h2 className="mb-2 pl-2 font-roboto-bold text-black-1">
              Upcoming Events
            </h2>
            <Link>
              <div className="flex items-center font-roboto-regular text-[14px] text-black-1">
                <p>See All</p>
                <div className="pb-[3px] text-black-1">
                  <KeyboardDoubleArrowRightIcon
                    sx={{ stroke: '#ffffff', strokeWidth: 1 }}
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex gap-5 overflow-x-scroll px-1 pb-3 whitespace-nowrap scrollbar-hide">
            {upcoming?.slice(0, 5).map(event => (
              <div key={event?._id}>
                <EventCardLarge
                  event={event}
                  className="inline-block mr-4"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <h2 className="mb-2 pl-2 font-roboto-bold text-black-1">
              Events In Your City
            </h2>
            <Link>
              <div className="flex items-center font-roboto-regular text-[14px] text-black-1">
                <p>See All</p>
                <div className="pb-[3px] text-black-1">
                  <KeyboardDoubleArrowRightIcon
                    sx={{ stroke: '#ffffff', strokeWidth: 1 }}
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex gap-5 overflow-x-scroll px-1 pb-3 whitespace-nowrap scrollbar-hide">
            {filteredUpcomingEvents.length > 0 ?
              filteredUpcomingEvents.slice(0, 5).map(event => (
                <div key={event?._id}>
                  <EventCardLarge
                    event={event}
                    className="inline-block mr-4"
                  />
                </div>
              ))
            : <div className="text-center w-full">
                <p className="text-grey-2 pt-4 font-roboto-thin">
                  No upcoming events found in your location.
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
