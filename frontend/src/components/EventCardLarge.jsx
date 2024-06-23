import BookmarkButton from "./BookmarkButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { backendUrl } from "../api/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import ProfileImage from "./ProfileImage";

const EventCardLarge = ({ event, bookmark }) => {
  const [participants, setParticipants] = useState([]);
  const [location, setLocation] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/events/${event?._id}`);

      const data = await res.json();
      setParticipants(data?.participants);
      setLocation(data?.event?.location);
    };
    fetchData();
  }, [event._id, user]);

  // convert timestamp to date format for event details
  const changeDateFormat = (timestamp) => {
    const date = new Date(timestamp);

    const day = date.toLocaleString("en-GB", { day: "numeric" });
    const month = date.toLocaleString("en-GB", { month: "long" });

    return {
      day: `${day}`,
      month: `${month}`,
    };
  };
  const startDate = changeDateFormat(event?.startDate);
  const endDate = changeDateFormat(event?.endDate);

  return (
    <Link to={`/events/${event?._id}`}>
      <div className="w-[250px] p-2.5 shadow-md rounded-[15px] text-purple-2 flex flex-col gap-2">
        <div className="relative">
          <img
            className="rounded-[15px] w-full h-[150px] object-cover object-center"
            src={event?.eventImage.secure_url}
            alt={event.title}
          />
          <div className="absolute top-0 left-2">
            <BookmarkButton eventId={event?._id} />
          </div>
          <div className="absolute bottom-2 font-roboto-bold right-2 bg-purple-4 bg-opacity-80 rounded-md text-white px-3 py-1 text-center">
            <p>{startDate.day}</p>
            <p className="uppercase font-roboto-regular text-[0.750rem]">{endDate.month}</p>
          </div>
        </div>
        <p className="font-roboto-regular text-black-1">{event.title}</p>
        <div className="flex gap-1 items-center ml-[-5px] mt-[-5px] overflow-x-hidden">
          <LocationOnIcon
            style={{
              width: "15px",
              color: "#00ECAA",
              marginTop: "-1px",
            }}
          />
          <p className="capitalize text-[12px]">{location?.city}</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex gap-5 items-center justify-center relative">
              <div className="flex h-9 [&>*:not(:nth-child(1))]:ml-[-10px] mr-[-15px]">
                {participants?.slice(0, 3).map((singleParticipant, index) => (
                  <ProfileImage
                    key={index}
                    className={
                      "max-w-10 rounded-full h-[34px] w-[34px] object-cover overflow-hidden border-white border-2 "
                    }
                    src={singleParticipant?.userId?.profileImage?.secure_url}
                    to={`/hostprofile/${singleParticipant?.userId?._id}`}
                  />
                ))}
              </div>
              <p className="text-[12px]">
                {participants?.length >= 99 ? "+99" : `${participants?.length} Registered`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCardLarge;
