import { DatePicker } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

import { useState } from "react";

const AddEventPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //   console.log(startDate.$d);
  //   console.log(endDate.$d);
  //   const start = new Date(startDate.$d).getTime(); // timestamp
  //   console.log(start);

  // Funktion, um Event zu adden
  // Felder prüfen: Start-Date kleiner als End-Date
  // Dates umwandeln in Timestamps für spätere Verarbeitung? .getTime()
  // Textinhalte auf Länge prüfen
  //

  return (
    <main>
      <h2>add event</h2>
      <input type="text" placeholder="Title of your event" />
      <form>
        <MobileDateTimePicker
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          label="start date and time"
        />
        {/*  // --> value.$d = Sat Jun 22 2024 01:00:00 GMT+0200 (Mitteleuropäische Sommerzeit) */}

        <MobileDateTimePicker
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          label="end date and time"
        />
        <input type="text" placeholder="Location" />
        {/* categories */}
        <input type="radio" />
        <input type="text" placeholder="Description of your event" />
        <input type="file" />
        {/* 
      userId, --> authenticatedUser
      title,
      dates: {
            start: dates.start,
            end: dates.end,
         },
      location,
      categories,
      description,
      eventImage: uploadResult.secure_url, */}
      </form>
    </main>
  );
};

export default AddEventPage;
