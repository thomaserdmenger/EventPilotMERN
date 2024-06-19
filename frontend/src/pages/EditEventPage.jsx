import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { backendUrl } from '../api/api'
import EventForm from '../components/EventForm.jsx'

const EditEventPage = () => {
  const { eventId } = useParams()
  const [eventToEdit, setEventToEdit] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/events/${eventId}`)

      const data = await res.json()
      setEventToEdit(data.event)
    }
    fetchData()
  }, [eventId])

  return (
    <div className="min-h-svh flex flex-col  px-5 pb-12 pt-4">
      <h1 className="text-center mb-6 text-purple-1 self-center font-roboto-bold text-xl">
        Edit <span className="text-green-1">Event</span>
      </h1>
      <EventForm eventToEdit={eventToEdit} />
    </div>
  )
}

export default EditEventPage
