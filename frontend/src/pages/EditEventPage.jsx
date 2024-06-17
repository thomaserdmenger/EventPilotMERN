import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { backendUrl } from "../api/api";
import { categories } from "../constants/categories.js";
import EventForm from "../components/EventForm.jsx";
import EventForm2 from "../components/EventForm2.jsx";

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
      {/* <EventForm2 /> */}
    </main>
  );
};

export default EditEventPage;
