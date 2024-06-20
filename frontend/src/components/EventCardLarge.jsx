import BookmarkButton from './BookmarkButton'

const EventCardLarge = ({ event, bookmark }) => {
  // convert timestamp to date format for event details
  const changeDateFormat = timestamp => {
    const date = new Date(timestamp)

    const day = date.toLocaleString('en-GB', { day: 'numeric' })
    const month = date.toLocaleString('en-GB', { month: 'long' })

    return {
      day: `${day}`,
      month: `${month}`,
    }
  }
  const startDate = changeDateFormat(event?.startDate)
  const endDate = changeDateFormat(event?.endDate)

  return (
    <div className="">
      <div>
        <img src="" alt="" />
        <BookmarkButton eventId={event._id} />
        <div>
          <p>{startDate.day}</p>
          <p className=" uppercase">{endDate.month}</p>
        </div>
      </div>
    </div>
  )
}

export default EventCardLarge
