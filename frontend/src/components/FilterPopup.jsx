import { categories } from "../constants/categories";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material";
import { useState } from "react";
import SearchLocation from "./SearchLocation";

const FilterPopup = ({
  showPopup,
  setShowPopup,
  selectedCategory,
  setSelectedCategory,
  eventsData,
  filteredData,
  setFilteredData,
  localCity,
  setLocalCity,
  handleCategories,
  searchText,
}) => {
  const [date, setDate] = useState("");
  const [dateSelector, setDateSelector] = useState("");
  const [location, setLocation] = useState(localCity || "");
  const [tempCategories, setTempCategories] = useState([]);

  // - 3 Filterfunktionen unabhängig von apply filtern die events
  // - dabei muss darauf geachtet werden, dass nur beim ersten Klick die eventsData, sonst filteredData gefiltert werden
  // - transition stylen

  // styling for dateTimePicker from MUI
  const CustomMobileDateTimePicker = styled(MobileDateTimePicker)(
    ({ theme }) => ({
      "& .MuiInputBase-root": {
        borderRadius: "15px",
        color: "#7254EE", // Default text color
      },
      "& .MuiInputLabel-root": {
        color: "#7254EE", // Default label color
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderRadius: "15px",
          borderColor: "#7254EE", // Default border color
        },
        "&:hover fieldset": {
          borderColor: "#7254EE", // Border color on hover
        },
        "&.Mui-focused": {
          "& fieldset": {
            borderColor: "#00ECAA", // Border color when focused
          },
          "& .MuiInputLabel-root": {
            color: "#00ECAA !important", // Label color when focused
          },
        },
      },
    })
  );

  // * Function to check length of filteredData
  const chooseArrayToFilter = () => {
    const dataToFilter = filteredData?.length === 0 ? eventsData : filteredData;

    return dataToFilter;
  };

  // * Functions to filter Category Stuff
  // -> Kategorien lassen sich im Filter Popup noch nicht abwählen
  const selectCategory = (e) => {
    const isClicked = selectedCategory === e.currentTarget.textContent;

    if (isClicked) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(e.currentTarget.textContent);
    }

    const category = e.currentTarget.textContent;
    console.log({ category });
    console.log({ filteredData });
    let filteredEvents;

    if (filteredData?.length < 1) {
      filteredEvents = eventsData?.filter((item) =>
        item?.categories?.find((item) => item === category)
      );
    } else if (filteredData?.length > 0) {
      filteredEvents = filteredData?.filter((item) =>
        item?.categories?.find((item) => item === category)
      );
    }

    console.log(filteredEvents);

    // setTempCategories(filteredEvents);

    // - Auswahl Cat && Filtered Data === 0 => Auswahl aus eventsData und speichern in Temp
    // - Abwahl Cat && Filtered Data === 0 => Zurück auf EventsData

    // - Auswahl Cat && Filterd Data !== 0 => Auswahl aus Filtered Data und speichern in Temp
    // - Abwahl Cat && Filterd DAta !?== 0 => Zurück auf Filterd Data

    // const selectedCategoryConst = e.currentTarget.textContent;

    // const dataToFilter = chooseArrayToFilter();
    // console.log({ dataToFilter });

    // const filteredEvents = dataToFilter?.filter((item) =>
    //   item?.categories?.find((item) => item === selectedCategoryConst)
    // );
    // setFilteredData(filteredEvents);
  };
  // console.log({ filteredData });

  //  * Functions to filter Date Stuff
  const convertTimestampToDate = (timestamp) => {
    // Ein Date-Objekt aus dem Timestamp erstellen
    const date = new Date(timestamp);

    // Tag, Monat und Jahr extrahieren
    const day = date.getDate();
    const month = date.getMonth() + 1; // Monate sind nullbasiert
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const selectDate = () => {
    if (checkFilteredData()) {
      if (dateSelector === "Today" || dateSelector === "Tomorrow") {
        const filteredEvents = eventsData?.filter(
          (event) =>
            convertTimestampToDate(event?.startDate) ===
            convertTimestampToDate(date)
        );
        setFilteredData(filteredEvents);
      } else if (dateSelector === "This week") {
        const filteredEvents = eventsData?.filter(
          (event) =>
            event?.startDate > Date.now() &&
            event?.startDate < Date.now() + 7 * 24 * 60 * 60 * 1000
        );
        setFilteredData(filteredEvents);
      } else {
        const filteredEvents = eventsData?.filter(
          (event) =>
            convertTimestampToDate(event?.startDate) ===
            convertTimestampToDate(date)
        );
        setFilteredData(filteredEvents);
      }
    } else {
      if (dateSelector === "Today" || dateSelector === "Tomorrow") {
        const filteredEvents = filteredData?.filter(
          (event) =>
            convertTimestampToDate(event?.startDate) ===
            convertTimestampToDate(date)
        );
        setFilteredData(filteredEvents);
      } else if (dateSelector === "This week") {
        const filteredEvents = filteredData?.filter(
          (event) =>
            event?.startDate > Date.now() &&
            event?.startDate < Date.now() + 7 * 24 * 60 * 60 * 1000
        );
        setFilteredData(filteredEvents);
      } else {
        const filteredEvents = filteredData?.filter(
          (event) =>
            convertTimestampToDate(event?.startDate) ===
            convertTimestampToDate(date)
        );
        setFilteredData(filteredEvents);
      }
    }

    // if (checkFilteredData()) {
    //   const filteredEvents = eventsData?.filter((item) =>
    //     item?.categories?.find((item) => item === selectedCategoryConst)
    //   );
    //   setFilteredData(filteredEvents);
    // } else {
    //   const filteredEvents = filteredData?.filter((item) =>
    //     item?.categories?.find((item) => item === selectedCategoryConst)
    //   );
    //   setFilteredData(filteredEvents);
    // }

    setDateSelector("");
  };

  // * Functions to filter Location Stuff
  const selectLocation = () => {
    const filteredEvents = eventsData?.filter((event) =>
      event?.location?.city?.includes(location.city)
    );
  };

  // * apply all selected filters
  const handleApply = () => {
    setShowPopup(false);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="fixed bottom-0 z-20 bg-white w-full h-[80%]">
          <h2>Filter</h2>
          <h3>Category</h3>
          {/* Categories Filter */}
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {categories?.map((cat, index) => {
              return (
                <div
                  onClick={selectCategory}
                  className={` py-2 px-3 flex items-center justify-center gap-2 rounded-[10px] cursor-pointer ${
                    selectedCategory === cat?.category
                      ? "text-purple-1 bg-green-1"
                      : "bg-purple-2 text-white"
                  }`}
                  key={index}
                >
                  <img className="w-[15px]" src={cat?.src} alt="" />
                  <p className="font-roboto-thin">{cat?.category}</p>
                </div>
              );
            })}
          </div>

          <h3>Time & Date</h3>
          <div className="flex flex-col  justify-center gap-2">
            <div className="flex gap-5">
              <p
                onClick={(e) => {
                  setDateSelector(e.currentTarget.textContent);
                  setDate(Date.now());
                }}
              >
                Today
              </p>
              <p
                onClick={(e) => {
                  setDateSelector(e.currentTarget.textContent);
                  setDate(Date.now() + 24 * 60 * 60 * 1000);
                }}
              >
                Tomorrow
              </p>
              <p
                onClick={(e) => {
                  setDateSelector(e.currentTarget.textContent);
                  setDate(Date.now());
                }}
              >
                This week
              </p>
            </div>
            <CustomMobileDateTimePicker
              label="From"
              name="startDate"
              onChange={(timeDate) => {
                const timestamp = timeDate.$d.getTime();
                setDate(timestamp);
              }}
            />
          </div>

          <h3>Location</h3>
          <SearchLocation setLocation={setLocation} />
          {/* //# localCity übergeben */}

          <button className="bg-purple-1 p-2 text-white" onClick={handleApply}>
            Apply
          </button>
        </div>
      </LocalizationProvider>
    </>
  );
};

export default FilterPopup;
