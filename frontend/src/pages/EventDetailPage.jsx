import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import FollowButton from "../components/FollowButton";
import { UserContext } from "../context/UserContext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const EventDetailPage = () => {
  const { user } = useContext(UserContext);
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [participants, setParticipants] = useState([]);

  // fetch the event details
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/events/${eventId}`);

      const data = await res.json();
      setEventDetails(data.event);
      setParticipants(data.participants);
    };
    fetchData();
  }, [eventId, user]);

  // convert timestamp to date format for event details
  const changeDateFormat = (timestamp) => {
    const date = new Date(timestamp);

    // 18 July, 2023
    const day = date.toLocaleString("en-GB", { day: "numeric" });
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    // Tuesday, 6:00 PM - 11:00PM
    const weekday = date.toLocaleString("en-GB", { weekday: "long" });
    const time = date.toLocaleString("en-GB", { timeStyle: "short" });

    return {
      date: `${day} ${month}, ${year}`,
      time: `${weekday}, ${time}`,
    };
  };
  const startDate = changeDateFormat(eventDetails?.startDate);
  const endDate = changeDateFormat(eventDetails?.endDate);
  console.log(eventDetails);
  return (
    <main className="min-h-svh">
      {/* back button einbauen */}
      {/* //# hier oben noch bookmark einbauen */}
      <article
        style={{
          "--image-url": `url(${eventDetails?.eventImage?.secure_url})`,
        }}
        className={`bg-[image:var(--image-url)] bg-no-repeat bg-center bg-cover h-[250px] mb-10`}
      ></article>

      <section className="pt-7 px-5 relative">
        <article className="flex gap-5 items-center justify-center rounded-md absolute top-[-65px] left-[7rem] max-w-[230px] bg-white py-[16px] px-[20px] shadow-md">
          {/* //# zur Registrierung weiterleiten? Direkt Funktion auflegen? */}
          {participants?.length === 0 ? (
            <p className="font-roboto-regular text-blue-1">
              Be the first to register!
            </p>
          ) : (
            <div>
              {/* //# noch splitten nach 3 Personen für Anzeige vom Image */}
              {participants?.map((singleParticipant) => (
                <img
                  key={singleParticipant._id}
                  className="max-w-10 rounded-full h-[34px] w-[34px] object-cover"
                  src={singleParticipant?.userId?.profileImage?.secure_url}
                />
              ))}
              <p className="font-roboto-regular text-blue-1">{`+${participants?.length} registered`}</p>
            </div>
          )}
        </article>

        <article className="mb-10">
          <div className="mb-7">
            <h2 className="font-roboto-thin text-4xl mb-5">
              {eventDetails?.title}
            </h2>
          </div>

          <div className="mb-5 flex gap-3 items-center">
            <CalendarMonthIcon
              style={{ fontSize: 45 }}
              htmlColor="#7254EE"
              className="bg-[#ECEBEB] p-1 rounded-md"
            />
            <div>
              <p>
                {startDate.date} - {endDate.date}
              </p>
              <p className="font-roboto-thin">
                {startDate.time} - {endDate.time}
              </p>
            </div>
          </div>

          <div className="mb-7 flex gap-3 items-center">
            <LocationOnIcon
              style={{ fontSize: 45 }}
              htmlColor="#7254EE"
              className="bg-[#ECEBEB] p-1 rounded-md"
            />
            <div>
              <p>{eventDetails?.location} Verstaltungsort</p>
              <p className="font-roboto-thin">
                {eventDetails?.location} Stadt, Land
              </p>
            </div>
          </div>

          <div className="flex gap-10 justify-between items-center">
            <div className="flex gap-5 items-center">
              <Link to={`/hostprofile/${eventDetails?.userId}`}>
                <img
                  className="max-w-10 rounded-[10px] w-[48px] h-[48px] object-cover"
                  src={eventDetails?.userId?.profileImage?.secure_url}
                />
              </Link>

              <div className="">
                <p className="font-roboto-regular">
                  {" "}
                  {eventDetails?.userId?.username}
                </p>
                <p className="font-roboto-thin">
                  {user?.user?._id === eventDetails?.userId?._id
                    ? "You're the organizer"
                    : "Organizer"}
                </p>
              </div>
            </div>
            {user?.user?._id === eventDetails?.userId?._id ? (
              <Link
                to={`/events/edit/${eventDetails?._id}`}
                className=" text-purple-1 font-roboto-thin border-purple-1 border-[1px] rounded-md py-2 px-4 hover:bg-green-1"
              >
                Edit event
              </Link>
            ) : (
              <FollowButton followedUserId={eventDetails?.userId?._id} />
            )}
          </div>
        </article>

        <article>
          <h3>About the Event</h3>
          <p className="text-[#120D26] font-roboto-thin">
            {eventDetails?.description}
          </p>
        </article>
      </section>
    </main>
  );
};

export default EventDetailPage;
