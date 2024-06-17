import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import EventForm from "../components/EventForm.jsx";

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
    <main>
      <EventForm eventToEdit={eventToEdit} />
    </main>
  );
};

export default EditEventPage;
