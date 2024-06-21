import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { backendUrl } from '../api/api'

const EventsPage = () => {
  const { user } = useContext(UserContext)
  const [activeTab, setActiveTab] = useState('upcoming')
  const [events, setEvents] = useState([])

  console.log(events)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/eventRegistration`, {
        credentials: 'include',
      })

      const data = await res.json()

      setEvents(data?.eventRegistrations)
    }
    fetchData()
  }, [user])

  const getUpcomingEvents = () => {
    const currentDate = new Date()
    return events.filter(event => {
      const eventDate = new Date(event.createdAt)
      return eventDate >= currentDate
    })
  }

  const getPastEvents = () => {
    const currentDate = new Date()
    return events.filter(event => {
      const eventDate = new Date(event.createdAt)
      return eventDate < currentDate
    })
  }

  const handleTabChange = tab => {
    setActiveTab(tab)
  }

  let eventsToDisplay = []
  if (activeTab === 'upcoming') {
    eventsToDisplay = getUpcomingEvents()
  } else if (activeTab === 'past') {
    eventsToDisplay = getPastEvents()
  }

  return (
    <div className="h-svh">
      {/* <div className="pb-[4.375rem]">
        <h1>Events</h1>
        <div className="tabs">
          <button
            className={activeTab === 'upcoming' ? 'active' : ''}
            onClick={() => handleTabChange('upcoming')}>
            Upcoming Events
          </button>
          <button
            className={activeTab === 'past' ? 'active' : ''}
            onClick={() => handleTabChange('past')}>
            Past Events
          </button>
        </div>
        <div>
          {eventsToDisplay.length === 0 ?
            <p>No events</p>
          : <ul>
              {eventsToDisplay.map(event => (
                <li key={event.eventId}>
                  <p>Event ID: {event.eventId}</p>
                </li>
              ))}
            </ul>
          }
        </div>
      </div> */}
    </div>
  )
}

export default EventsPage
