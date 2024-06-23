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
  setNoEventsFound,
}) => {
  const [date, setDate] = useState("");
  const [dateSelector, setDateSelector] = useState("");
  const [location, setLocation] = useState(localCity || "");
  const [tempCategories, setTempCategories] = useState([]);

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
                  key={index}>
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
                }}>
                Today
              </p>
              <p
                onClick={(e) => {
                  setDateSelector(e.currentTarget.textContent);
                  setDate(Date.now() + 24 * 60 * 60 * 1000);
                }}>
                Tomorrow
              </p>
              <p
                onClick={(e) => {
                  setDateSelector(e.currentTarget.textContent);
                  setDate(Date.now());
                }}>
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

          <button className="bg-purple-1 p-2 text-white" onClick={filterEvents}>
            Apply
          </button>
        </div>
      </LocalizationProvider>
    </>
  );
};

export default FilterPopup;
