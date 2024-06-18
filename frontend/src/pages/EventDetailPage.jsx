import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import FollowButton from "../components/FollowButton";

const EventDetailPage = () => {
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
  }, [eventId]);
  console.log(eventDetails);
  // console.log(participants);
  console.log(eventDetails?.userId?._id);

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

      <article className="px-5">
        <div className="mb-7">
          <h2 className="font-roboto-thin text-4xl mb-5">
            {eventDetails?.title}
          </h2>
        </div>

        <div className="mb-7">
          <h4>{eventDetails?.startDate}</h4>
        </div>

        <div className="mb-7">
          <h4>{eventDetails?.location}</h4>
        </div>

        <div className="flex gap-10">
          <img
            className="max-w-10 rounded-[10px] w-[48px] h-[48px] object-cover"
            src={eventDetails?.userId?.profileImage?.secure_url}
          />

          <div className="mb-7">
            <p> {eventDetails?.userId?.username}</p>
            <p>Organizer</p>
          </div>
          <FollowButton followedUserId={eventDetails?.userId?._id} />
        </div>
      </article>
    </main>
  );
};

export default EventDetailPage;
