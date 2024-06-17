import dayjs from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { categories } from "../constants/categories.js";

const EventForm = ({ eventToEdit }) => {
  // * Idee
  // on EditEventPage: fetch event with the params-id
  // give infos via props to EventForm => eventToEdit
  // fill inputs in eventForm with fetched infos
  // if there is no eventToEdit => addEvent Funktionen

  const [errorMessage, setErrorMessage] = useState();

  // states and useEffect to fill input fields if it's an edit event form:
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setLocation(eventToEdit.location);
      setCategoriesArray(eventToEdit.categories);
      setDescription(eventToEdit.description);
    }
  }, [eventToEdit]);

  // check if clicked category is already part of array -> return boolean
  const checkCategoriesArray = (category) => {
    return categoriesArray.some((item) => category === item);
  };

  // depending on checked click: either add or delete category from array -> return updated array
  const handleCatArray = (category) => {
    const isClicked = checkCategoriesArray(category);
    if (isClicked) {
      // wenn true: filtern und state neu setzen
      const filteredArray = categoriesArray.filter((item) => item !== category);
      return setCategoriesArray(filteredArray);
    } else if (!isClicked) {
      // wenn false: spread und speichern
      return setCategoriesArray([...categoriesArray, category]);
    }
  };

  // add event fetch
  const addEvent = async (e) => {};

  // edit event fetch
  const editEvent = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    formData.append("categories", categoriesArray);
    // for (const value of formData.entries()) {
    //   console.log(value);
    // } //# Daten kommen in formData an, werden dort gespeichert, aber req.body erreicht das backend nicht - warum?

    const res = await fetch(`${backendUrl}/api/v1/events/${eventToEdit._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "multipart/form-data" },
      credentials: "include",
      body: formData,
    });
    for (const value of formData.entries()) {
      console.log(value);
    }
    const data = await res.json();
    console.log(data);

    if (!data.result) return setErrorMessage(data.message);
    setErrorMessage("");
  };

  return (
    <>
      <h1>Event Form</h1>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h2>edit event</h2>
        <form
          className="flex flex-col"
          onSubmit={eventToEdit ? editEvent : addEvent}
        >
          <input
            type="text"
            placeholder="Title of your event"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <MobileDateTimePicker
            label="start date and time"
            name="startDate"
            // defaultValue={dayjs(new Date(eventToEdit?.startDate))} //# noch default einbauen
          />
          <MobileDateTimePicker
            label="end date and time"
            name="endDate"
            // defaultValue={dayjs(eventToEdit?.endDate)} //# noch default einbauen
          />

          {/* //# Location mit externer API vorschlagen? */}
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <h3>Categories</h3>
          {categories?.map((singleCategory) => (
            <p
              onClick={() => handleCatArray(singleCategory)}
              className={
                checkCategoriesArray(singleCategory) ? "text-blue-500" : ""
              }
              key={singleCategory}
              name={singleCategory}
            >
              {singleCategory}
            </p>
          ))}

          <textarea
            type="text"
            placeholder="Description of your event"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="file" name="eventImage" />
          <button type="submit">
            {eventToEdit ? "Edit your event" : "Add your event"}
          </button>
          {errorMessage && <p className=" text-red-800">{errorMessage}</p>}
        </form>
      </LocalizationProvider>
    </>
  );
};

export default EventForm;
