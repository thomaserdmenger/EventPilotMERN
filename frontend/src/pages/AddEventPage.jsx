import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { backendUrl } from "../api/api";

const AddEventPage = () => {
  const [userId, setUserId] = useState("");

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [eventImageFile, setEventImageFile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // function to add event to the database:
  const addEvent = async (e) => {
    e.preventDefault();

    if (title.length < 5 || title.length > 50)
      return setErrorMessage(
        "Please give a title to your event, 5-50 characters long."
      );
    if (description.length < 20 || description.length > 200)
      return setErrorMessage(
        "Please give a description to your event, 20-200 characters long."
      );
    if (startDate.$d > endDate.$d)
      return setErrorMessage("Your end date must be after your start date.");

    // --> file mitschicken - wie?
    // const form = e.target;
    // const formData = new FormData(form);

    const imageFormData = new FormData();
    if (!eventImageFile)
      return setErrorMessage("Please add an image for your event.");
    imageFormData.append("eventImage", eventImageFile, eventImageFile.name);
    // console.log(eventImageFile);

    // // body erstellen
    const body = {
      userId,
      title,
      dates: {
        startDate: startDate.$d,
        endDate: endDate.$d,
      },
      location,
      categories: [],
      description,
      eventImage: imageFormData,
    };

    // fetch post event
    const res = await fetch(`${backendUrl}/api/v1/events`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
          <input
            type="text"
            placeholder="UserId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Title of your event"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <h3>Categories</h3>
          {/* hier dann über json-Datei mit allen Kategorien mappen für die Anzeige */}
          {/* <div className="flex flex-col">
            <div>
              <input
                type="checkbox"
                id="music"
                name="music"
                // value={categories}
                // onChange={(e) => setCategories([...categories, e.target.value])}
              />
              <label htmlFor="music"> Music</label>
            </div>
            <div>
              <input type="checkbox" id="art" name="art" />
              <label htmlFor="art"> Art</label>
            </div>
            <div>
              <input type="checkbox" id="sports" name="sports" />
              <label htmlFor="sports"> Sports</label>
            </div>
            <div>
              <input type="checkbox" id="programming" name="programming" />
              <label htmlFor="programming"> Programming</label>
            </div>
          </div> */}
          <textarea
            type="text"
            placeholder="Description of your event"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setEventImageFile(e.target.files[0])}
          />
          <button type="submit">Add your event</button>
          {errorMessage ? <p className=" text-red-800">{errorMessage}</p> : ""}
        </form>
      </main>
    </LocalizationProvider>
  );
};

export default AddEventPage;
