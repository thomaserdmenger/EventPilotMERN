import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { backendUrl } from "../api/api";

const AddEventPage = () => {
  const [errorMessage, setErrorMessage] = useState();
  const addEvent = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const res = await fetch(`${backendUrl}/api/v1/events`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    setErrorMessage("");
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main>
        <h2>add event</h2>
        <form className="flex flex-col" onSubmit={addEvent}>
          {/* userId löschen, wenn auth steht: */}
          <input type="text" placeholder="UserId" name="userId" />
          <input type="text" placeholder="Title of your event" name="title" />
          <MobileDateTimePicker label="start date and time" name="startDate" />
          {/*  // --> value.$d = Sat Jun 22 2024 01:00:00 GMT+0200 (Mitteleuropäische Sommerzeit) */}
          <MobileDateTimePicker label="end date and time" name="endDate" />
          <input type="text" placeholder="Location" name="location" />

          {/* //# Wie Kategorien Values bekommen? */}
          {/* hier dann über json-Datei mit allen Kategorien mappen für die Anzeige */}
          <h3>Categories</h3>
          <input
            type="text"
            placeholder="categories placeholder"
            name="categories"
          />

          <textarea
            type="text"
            placeholder="Description of your event"
            name="description"
          />
          <input type="file" name="eventImage" />
          <button type="submit">Add your event</button>
          {errorMessage ? <p className=" text-red-800">{errorMessage}</p> : ""}
        </form>
      </main>
    </LocalizationProvider>
  );
};

export default AddEventPage;
