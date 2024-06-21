import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import BookmarkButton from "./BookmarkButton";

const EventCardSmall = ({ event, bookmark }) => {
  const eventTimestamp = event?.startDate;
  const bookmarkEventTimestamp = bookmark?.eventId?.startDate;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const ordinalSuffix = (day) => {
      if (day > 3 && day < 21) return "TH";
      switch (day % 10) {
        case 1:
          return "ST";
        case 2:
          return "ND";
        case 3:
          return "RD";
        default:
          return "TH";
      }
    };

    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const dayOfWeek = days[date.getDay()];

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day}${ordinalSuffix(day)} ${month}-${dayOfWeek}-${hours}:${minutes} ${ampm}`;
  };

  return (
    <>
      {event && (
        <Link to={`/events/${event?._id}`}>
          <article>
            <div className="grid grid-cols-7 gap-2 mb-2 rounded-[15px] overflow-hidden p-2 shadow">
              <img
                className="col-span-2 rounded-[15px] w-full h-full object-cover object-center"
                src={event?.eventImage?.secure_url}
                alt="Event Image"
              />
              <div className="col-span-5 p-2 flex flex-col relative">
                <p className="text-[12px] text-purple-4">{formatDate(eventTimestamp)}</p>
                <h2 className="capitalize mb-3 text-[18px] break-words overflow-hidden">
                  {event?.title}
                </h2>
                <div className="flex items-center ml-[-5px]">
                  <LocationOnIcon
                    style={{
                      width: "15px",
                      color: "#848484",
                      marginTop: "-1px",
                    }}
                  />
                  <p className="text-grey-1 font-roboto-thin capitalize text-[13px]">
                    {event?.location?.city}
                  </p>
                </div>
                <div className="absolute top-0 right-0">
                  <BookmarkButton eventId={event?._id} />
                </div>
              </div>
            </div>
          </article>
        </Link>
      )}
      {bookmark && (
        <Link to={`/events/${bookmark?.eventId?._id}`}>
          <article>
            <div className="grid grid-cols-7 gap-2 mb-2 rounded-[15px] overflow-hidden p-2 shadow">
              <img
                className="col-span-2 rounded-[15px] w-full h-full object-cover object-center"
                src={bookmark?.eventId?.eventImage?.secure_url}
                alt="Event Image"
              />
              <div className="col-span-5 p-2 flex flex-col relative">
                <p className="text-[12px] text-purple-4">{formatDate(bookmarkEventTimestamp)}</p>
                <h2 className="capitalize mb-3 text-[18px] break-words overflow-hidden">
                  {bookmark?.eventId?.title}
                </h2>
                <div className="flex items-center ml-[-5px]">
                  <LocationOnIcon
                    style={{
                      width: "15px",
                      color: "#848484",
                      marginTop: "-1px",
                    }}
                  />
                  <p className="text-grey-1 font-roboto-thin capitalize text-[13px]">
                    {bookmark?.eventId?.location?.city}
                  </p>
                </div>
                <div className="absolute top-0 right-0">
                  <BookmarkButton eventId={bookmark?.eventId?._id} />
                </div>
              </div>
            </div>
          </article>
        </Link>
      )}
    </>
  );
};

export default EventCardSmall;
