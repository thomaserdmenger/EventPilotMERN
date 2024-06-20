import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import FollowButton from "../components/FollowButton";
import { UserContext } from "../context/UserContext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import BookmarkButton from "../components/BookmarkButton";
import RegisterButton from "../components/RegisterButton";
import ProfileImage from "../components/ProfileImage";
import HeaderNav from "../components/HeaderNav";

const EventDetailPage = () => {
  const { user } = useContext(UserContext);

  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [participants, setParticipants] = useState([]);

  const navigate = useNavigate();

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
    const time = date.toLocaleString("en-GB", {
      timeStyle: "short",
      hour12: "true",
    });

    return {
      date: `${day} ${month}, ${year}`,
      time: `${weekday}, ${time}`,
    };
  };
  const startDate = changeDateFormat(eventDetails?.startDate);
  const endDate = changeDateFormat(eventDetails?.endDate);

  return (
    <main className="min-h-svh">
      <HeaderNav
        eventDetails={eventDetails}
        pathname={`/events/${eventDetails?._id}`}
      />

      <article
        style={{
          "--image-url": `url(${eventDetails?.eventImage?.secure_url})`,
        }}
        className={`bg-[image:var(--image-url)] bg-no-repeat bg-center bg-cover h-[250px] mb-10`}
      ></article>

      <section className="pt-7 px-5 relative pb-28">
        <article className="rounded-md   bg-white py-[16px] px-[20px] shadow-md absolute left-0 right-0 top-[-65px] text-center mx-16">
          {participants?.length === 0 ? (
            <p className="font-roboto-regular text-blue-1 cursor-pointer">
              Be the first to register!
            </p>
          ) : (
            <div className="flex gap-5 items-center justify-center relative">
              <div className="flex [&>*:not(:nth-child(1))]:ml-[-10px]">
                {participants?.slice(0, 3).map((singleParticipant) => (
                  <ProfileImage
                    key={singleParticipant?.userId?._id}
                    className={
                      "max-w-10 rounded-full h-[34px] w-[34px] object-cover overflow-hidden "
                    }
                    src={singleParticipant?.userId?.profileImage?.secure_url}
                    to={`/hostprofile/${singleParticipant?.userId?._id}`}
                  />
                ))}
              </div>
              <p className="font-roboto-regular text-blue-1">
                {participants?.length >= 99
                  ? "+99 registered"
                  : `${participants?.length} registered`}
              </p>
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
              <p>{eventDetails?.location?.name}</p>
              <p className="font-roboto-thin">
                {eventDetails?.location?.city},{" "}
                {eventDetails?.location?.country}
              </p>
            </div>
          </div>

          <div className="flex gap-10 justify-between items-center">
            <div className="flex gap-5 items-center">
              <ProfileImage
                className={
                  "max-w-10 rounded-full h-[34px] w-[34px] object-cover"
                }
                src={eventDetails?.userId?.profileImage?.secure_url}
                to={`/hostprofile/${eventDetails?.userId?._id}`}
              />

              <div className="">
                <p className="font-roboto-regular">
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

      <div className="px-5 fixed bottom-4 w-full">
        <RegisterButton eventId={eventId} />
      </div>
    </main>
  );
};

export default EventDetailPage;
