import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import EventForm from "../components/EventForm.jsx";
import HeaderNav from "../components/HeaderNav.jsx";

const EditEventPage = () => {
  const { eventId } = useParams();
  const [eventToEdit, setEventToEdit] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/events/${eventId}`);

      const data = await res.json();
      setEventToEdit(data.event);
    };
    fetchData();
  }, [eventId]);

  return (
    <div className="min-h-svh flex flex-col  px-5 pb-12 pt-4">
      <HeaderNav
        pathname={`/events/edit/${eventId}`}
        eventDetails={eventToEdit}
      />
      <div className="pt-20">
        <EventForm eventToEdit={eventToEdit} />
      </div>
    </div>
  );
};

export default EditEventPage;
