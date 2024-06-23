import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { backendUrl } from "../api/api";
import EventCardLarge from "../components/EventCardLarge";
import EventCardSmall from "../components/EventCardSmall";

const EventsPage = () => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [tab, setTab] = useState("upcoming");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/eventRegistration`, {
        credentials: "include",
      });
      const data = await res.json();
      setEvents(data?.eventRegistrations || []);
    };
    fetchData();
  }, [user]);

  // Filter upcoming events
  const upcomingEvents = events?.filter(
    (event) => new Date(event?.eventId?.startDate) > new Date()
  );

  // Filter past events
  const pastEvents = events?.filter((event) => new Date(event?.eventId?.startDate) <= new Date());

  return (
    <div className="h-svh">
      <div className="pb-14 px-2">
        <h1 className="py-8 text-center font-roboto-bold text-xl">
          <span className="text-green-1">Your</span> registrations
        </h1>
        <div className="flex items-center justify-center gap-2">
          <button
            className={`${
              tab === "upcoming"
                ? "bg-purple-2 border-2 border-purple-2 text-white shadow-md"
                : "text-green-1 border-2 border-green-1"
            } px-4 text-sm py-2 rounded-[15px]`}
            onClick={() => setTab("upcoming")}>
            Upcoming Events
          </button>
          <button
            className={`${
              tab === "past"
                ? "bg-purple-2 border-2 border-purple-2 text-white shadow-md"
                : "text-green-1 border-2 border-green-1"
            } px-4 py-2 text-sm rounded-[15px]`}
            onClick={() => setTab("past")}>
            Past Events
          </button>
        </div>
        <div className="mt-4">
          {tab === "upcoming" && (
            <div className="px-6">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <EventCardSmall key={event?.eventId?._id} event={event.eventId} />
                ))
              ) : (
                <p className="text-center pt-2 font-roboto-medium">No upcoming events</p>
              )}
            </div>
          )}
          {tab === "past" && (
            <div className="px-6">
              {pastEvents.length > 0 ? (
                pastEvents.map((event) => (
                  <EventCardSmall key={event?.eventId?._id} event={event.eventId} />
                ))
              ) : (
                <p className="text-center pt-2 font-roboto-medium">No past events</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
