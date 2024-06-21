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
}) => {
  const [date, setDate] = useState("");
  const [dateSelector, setDateSelector] = useState("");
  const [location, setLocation] = useState(localCity || "");
  console.log(location?.city);

  console.log(dateSelector);

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

  // # Kategorien auch erst ab Submit

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

    setDateSelector("");
  };

  // * Functions to filter Location Stuff
  const selectLocation = () => {
    const filteredEvents = eventsData?.filter((event) =>
      event?.location?.city?.includes(location.city)
    );
    setFilteredData(filteredEvents);
  };

  // * apply all selected filters
  // neuer State als Zwischenspeicher mit spread-Operator für alle Zwischenschritte/Filter und erst das Endergebnis in filteredData speichern: bei selectDate und bei selectCategory (handleCategory V2)
  const handleApply = () => {
    // selectDate();
    selectLocation();
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
                  onClick={handleCategories}
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
                  setDate(Date.now() + 24 * 60 * 60 * 1000);
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

// - Popup-Komponente mit props: showPopup, setShowPopup, selectedCategory, setFilteredEvents, localCity
// - Positioning
// - in Popup-Komponente category-State setzen auf selectedCategory oder ""
// - in Popup-Komponente location-State setzen auf localCity oder ""
// - filtern nach 3 Sachen .....
// - Ergebnis in filteredEvents setten
// - popup schließen
// - transition vom popup
