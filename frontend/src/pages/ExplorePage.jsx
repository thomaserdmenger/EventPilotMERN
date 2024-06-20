import { useContext, useEffect, useState } from 'react'
import CustomUpload from '../components/CustomUpload'
import EventCardLarge from '../components/EventCardLarge'
import { UserContext } from '../context/UserContext'
import { backendUrl } from '../api/api'

const ExplorePage = () => {
  const { user } = useContext(UserContext)
  const [upcoming, setUpcoming] = useState([])
  const [usersBookmarks, setUsersBookmarks] = useState([])

  console.log(upcoming)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/events/upcoming`)
      const data = await res.json()
      setUpcoming(data?.upcomingEvents)
    }
    fetchData()
  }, [user])

  return (
    <div className="h-svh">
      <div className="pb-[4.375rem]">
        <h1>Explore</h1>
        {upcoming?.map(event => (
          <EventCardLarge key={event?._id} event={event} />
        ))}
      </div>
    </div>
  )
}

export default ExplorePage
