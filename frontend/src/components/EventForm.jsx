// import dayjs from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { categories } from "../constants/categories.js";
import CustomInput from "./CustomInput.jsx";
import CustomButton from "./CustomButton.jsx";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const EventForm = ({ eventToEdit }) => {
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
  const addEvent = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    formData.append("categories", categoriesArray);

    const res = await fetch(`${backendUrl}/api/v1/events`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (data.message) return setErrorMessage(data.message);
    setErrorMessage("");
  };

  // edit event fetch
  const editEvent = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    formData.append("categories", categoriesArray);

    const res = await fetch(`${backendUrl}/api/v1/events/${eventToEdit._id}`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });
    // for (const value of formData.entries()) {
    //   console.log(value);
    // }
    const data = await res.json();

    if (data.message) return setErrorMessage(data.message);
    setErrorMessage("");
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form
          className="flex flex-col gap-3"
          onSubmit={eventToEdit ? editEvent : addEvent}
        >
          <CustomInput
            type="text"
            placeholder="Title of your event"
            name="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* //# MUI Design Custom --> Icaro? */}
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
          <CustomInput
            type="text"
            label="Location"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div className="border border-[#7254EE] rounded-[16px] p-4 relative">
            <h3 className="absolute top-[-10px] text-[#7254EE] text-[13px] bg-white px-1 ml-[-6px] font-roboto-thin">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories?.map((singleCategory) => (
                <p
                  onClick={() => handleCatArray(singleCategory)}
                  className={
                    checkCategoriesArray(singleCategory)
                      ? "text-[#7254EE]"
                      : "text-[#9CA3AF]"
                  }
                  key={singleCategory}
                  name={singleCategory}
                >
                  {singleCategory}
                </p>
              ))}
            </div>
          </div>

          <textarea
            className="border border-[#7254EE]"
            type="text"
            placeholder="Describe your event"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="file" name="eventImage" />
          <CustomButton
            fontSize="16px"
            width="100%"
            borderRadius="15px"
            bgcolor="#7254EE"
            bgcolorHover="#5D3EDE"
            padding="16px"
            text={eventToEdit ? "Edit your event" : "Add your event"}
            endIcon={<ArrowCircleRightIcon />}
          />
          {errorMessage && <p className=" text-red-800">{errorMessage}</p>}
          {/* //# Weiterleitung wohin? */}
        </form>
      </LocalizationProvider>
    </>
  );
};

export default EventForm;
