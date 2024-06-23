import { categories } from "../constants/categories";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material";
import { useState } from "react";
import SearchLocation from "./SearchLocation";
import CustomButton from "./CustomButton";

const FilterPopup = ({
  setShowPopup,
  selectedCategory,
  setSelectedCategory,
  eventsData,
  setFilteredData,
  localCity,
  searchText,
  setNoEventsFound,
}) => {
  const [date, setDate] = useState("");
  const [dateSelector, setDateSelector] = useState("");
  const [location, setLocation] = useState(localCity || "");

  // styling for dateTimePicker from MUI
  const CustomMobileDateTimePicker = styled(MobileDateTimePicker)(({ theme }) => ({
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
  }));

  const filterEvents = () => {
    const filtered = eventsData.filter((event) => {
      const matchesCategory = selectedCategory ? event.categories.includes(selectedCategory) : true;

      const eventDate = new Date(event.startDate);
      const selectedDate = new Date(date);

      const endOfWeek = new Date(selectedDate);
      endOfWeek.setDate(selectedDate.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const matchesDate =
        dateSelector === "This week"
          ? eventDate >= selectedDate && eventDate <= endOfWeek
          : date
          ? eventDate.toDateString() === selectedDate.toDateString()
          : true;

      const matchesLocation = location ? event?.location?.city === location.city : true;

      const matchesSearch = searchText
        ? event.title.toLowerCase().includes(searchText.toLowerCase())
        : true;

      return matchesCategory && matchesDate && matchesLocation && matchesSearch;
    });

    setFilteredData(filtered);
    setShowPopup(false);
    setNoEventsFound(filtered.length === 0);
  };

  const selectCategory = (e) => {
    const category = e.currentTarget.textContent;
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const selectDate = (e) => {
    const selectedDate = e.currentTarget.textContent;

    setDateSelector(selectedDate === dateSelector ? "" : selectedDate);

    if (selectedDate === "Today") {
      setDate(Date.now());
    } else if (selectedDate === "Tomorrow") {
      setDate(Date.now() + 24 * 60 * 60 * 1000);
    } else if (selectedDate === "This week") {
      setDate(Date.now());
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="fixed bottom-0 z-20 bg-white w-full h-[80%] rounded-tl-[15px] rounded-tr-[15px] p-4">
          <h2 className="text-[25px] mb-2">Filter</h2>
          <h3 className="font-roboto-regular mb-4">Category</h3>
          {/* Categories Filter */}
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {categories?.map((cat, index) => {
              return (
                <div
                  onClick={selectCategory}
                  className={`py-2 px-3 flex items-center justify-center gap-2 rounded-[10px] cursor-pointer ${
                    selectedCategory === cat?.category
                      ? "text-purple-1 bg-green-1"
                      : "bg-purple-2 text-white"
                  }`}
                  key={index}>
                  <img className="w-[15px]" src={cat?.src} alt="" />
                  <p className="font-roboto-thin">{cat?.category}</p>
                </div>
              );
            })}
          </div>

          <h3 className="font-roboto-regular mb-4">Time & Date</h3>
          <div className="flex flex-col  justify-center gap-2 mb-8">
            <div className="flex gap-2">
              <p
                className={`py-2 px-3 flex items-center justify-center gap-2 rounded-[10px] cursor-pointer font-roboto-thin ${
                  dateSelector === "Today" ? "text-purple-1 bg-green-1" : "bg-purple-2 text-white"
                }`}
                onClick={selectDate}>
                Today
              </p>
              <p
                className={`py-2 px-3 flex items-center justify-center gap-2 rounded-[10px] cursor-pointer font-roboto-thin ${
                  dateSelector === "Tomorrow"
                    ? "text-purple-1 bg-green-1"
                    : "bg-purple-2 text-white"
                }`}
                onClick={selectDate}>
                Tomorrow
              </p>
              <p
                className={`py-2 px-3 flex items-center justify-center gap-2 rounded-[10px] cursor-pointer font-roboto-thin ${
                  dateSelector === "This week"
                    ? "text-purple-1 bg-green-1"
                    : "bg-purple-2 text-white"
                }`}
                onClick={selectDate}>
                This week
              </p>
            </div>
            <CustomMobileDateTimePicker
              label="From"
              name="startDate"
              onChange={(timeDate) => {
                const timestamp = timeDate.$d.getTime();
                setDate(timestamp);
                setDateSelector("");
              }}
            />
          </div>
          <div className="mb-8">
            <h3 className="font-roboto-regular mb-4">Location</h3>
            <SearchLocation setLocation={setLocation} />
          </div>
          <div>
            <CustomButton
              fontSize={"16px"}
              width={"100%"}
              borderRadius={"15px"}
              bgcolor={"#7254EE"}
              bgcolorHover={"#5D3EDE"}
              padding={"16px"}
              text={"Apply"}
              onClick={filterEvents}
            />
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
};

export default FilterPopup;
