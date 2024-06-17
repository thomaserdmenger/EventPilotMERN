import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { backendUrl } from "../api/api";
import { categories } from "../constants/categories.js";

// # Route zu /events/edit noch einfügen
const EditEventPage = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [categoriesArray, setCategoriesArray] = useState([]);

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

    if (!data.result) return setErrorMessage(data.message);
    setErrorMessage("");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main>
        <h2>edit event</h2>
        <form className="flex flex-col" onSubmit={addEvent}>
          {/* userId löschen, wenn auth steht: */}
          <input type="text" placeholder="UserId" name="userId" />
          <input type="text" placeholder="Title of your event" name="title" />
          <MobileDateTimePicker label="start date and time" name="startDate" />
          <MobileDateTimePicker label="end date and time" name="endDate" />

          {/* //# Location mit externer API vorschlagen? */}
          <input type="text" placeholder="Location" name="location" />

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
          />
          <input type="file" name="eventImage" />
          <button type="submit">Add your event</button>
          {errorMessage ? <p className=" text-red-800">{errorMessage}</p> : ""}
        </form>
      </main>
    </LocalizationProvider>
  );
};

export default EditEventPage;
