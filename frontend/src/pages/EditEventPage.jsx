import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { backendUrl } from "../api/api";
import { categories } from "../constants/categories.js";
import EventForm from "../components/EventForm.jsx";

const EditEventPage = () => {
  const { eventId } = useParams();

  useEffect(() => {}, [eventId]);
  return (
    <main>
      <EventForm />
    </main>
  );
};

export default EditEventPage;
