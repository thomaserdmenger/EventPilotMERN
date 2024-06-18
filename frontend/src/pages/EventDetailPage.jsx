import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import FollowButton from "../components/FollowButton";
import { UserContext } from "../context/UserContext";

const EventDetailPage = () => {
  const { user } = useContext(UserContext);
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/events/${eventId}`);

      const data = await res.json();
      setEventDetails(data.event);
      setParticipants(data.participants);
    };
    fetchData();
  }, [eventId, user]);

  return (
    <main className="min-h-svh">
      <article
        style={{
          "--image-url": `url(${eventDetails?.eventImage?.secure_url})`,
        }}
        className={`bg-[image:var(--image-url)] bg-no-repeat bg-center bg-cover h-[200px] mb-10`}
      >
        <h1 className="">Event Details</h1>
      </article>

      {participants?.map(
        (
          singleParticipant // splitten nach 3 Personen
        ) => (
          <article>
            {participants?.length !== 0 && (
              <img
                className="max-w-10"
                src={singleParticipant?.userId?.profileImage?.secure_url}
              />
            )}
            <p>
              {participants?.length === 0
                ? "Be the first to register!"
                : `+${participants?.length} registered`}
            </p>
          </article>
        )
      )}

      <article className="px-5 mb-10">
        <div className="mb-7">
          <h2 className="font-roboto-thin text-4xl mb-5">
            {eventDetails?.title}
          </h2>
        </div>

        <div className="mb-5">
          <p>{eventDetails?.startDate} Datum</p>
          <p className="font-roboto-thin">
            {eventDetails?.startDate} Wochentag, Zeit
          </p>
        </div>

        <div className="mb-7">
          <p>{eventDetails?.location} Verstaltungsort</p>
          <p className="font-roboto-thin">
            {eventDetails?.location} Stadt, Land
          </p>
        </div>

        <div className="flex gap-10 justify-between items-center">
          <div className="flex gap-5 items-center">
            <img
              className="max-w-10 rounded-[10px] w-[48px] h-[48px] object-cover"
              src={eventDetails?.userId?.profileImage?.secure_url}
            />

            <div className="">
              <p> {eventDetails?.userId?.username}</p>
              <p className="font-roboto-thin">Organizer</p>
            </div>
          </div>
          <FollowButton followedUserId={eventDetails?.userId?._id} />
        </div>
      </article>

      <article className="px-5">
        <h3>About the Event</h3>
        <p className="text-[#120D26] font-roboto-thin">
          {eventDetails?.description}
        </p>
      </article>
    </main>
  );
};

export default EventDetailPage;
