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
  console.log(participants);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/events/${eventId}`);

      const data = await res.json();
      console.log(data);
      setEventDetails(data.event);
      setParticipants(data.participants);
    };
    fetchData();
  }, [eventId, user]);

  return (
    <main className="min-h-svh">
      {/* back button einbauen */}
      {/* //# hier oben noch bookmark einbauen */}
      <article
        style={{
          "--image-url": `url(${eventDetails?.eventImage?.secure_url})`,
        }}
        className={`bg-[image:var(--image-url)] bg-no-repeat bg-center bg-cover h-[200px] mb-10`}
      >
        <h1 className="">Event Details</h1>
      </article>

      <section className="pt-7 px-5 relative">
        {participants?.length === 0 ? (
          <p className="font-roboto-regular text-[#668BE9]">
            Be the first to register!
          </p>
        ) : (
          <article className="flex gap-5 items-center justify-center rounded-md absolute top-[-57px] left-[7rem] max-w-[230px] bg-white py-[16px] px-[20px] shadow-md">
            {/* //# noch splitten nach 3 Personen für Anzeige vom Image */}
            {participants?.map((singleParticipant) => (
              <img
                key={singleParticipant._id}
                className="max-w-10 rounded-full h-[34px] w-[34px] object-cover"
                src={singleParticipant?.userId?.profileImage?.secure_url}
              />
            ))}
            <p className="font-roboto-regular text-[#668BE9]">{`+${participants?.length} registered`}</p>
          </article>
        )}

        <article className="mb-10">
          <div className="mb-7">
            <h2 className="font-roboto-thin text-4xl mb-5">
              {eventDetails?.title}
            </h2>
          </div>

          <div className="mb-5 flex gap-3 items-center">
            <CalendarMonthIcon
              fontSize="large"
              htmlColor="#7254EE"
              className="bg-[#ECEBEB] p-1 rounded-md"
            />
            <div>
              <p>{eventDetails?.startDate} Datum</p>
              <p className="font-roboto-thin">
                {eventDetails?.startDate} Wochentag, Zeit
              </p>
            </div>
          </div>

          <div className="mb-7 flex gap-3 items-center">
            <LocationOnIcon
              fontSize="large"
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
                <p className="font-roboto-thin">Organizer</p>
              </div>
            </div>
            <FollowButton followedUserId={eventDetails?.userId?._id} />
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
