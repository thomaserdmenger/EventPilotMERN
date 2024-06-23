import { useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import EventCardSmall from "../components/EventCardSmall";
import { categories } from "../constants/categories.js";
import FilterPopup from "../components/FilterPopup.jsx";
import FilterListIcon from "@mui/icons-material/FilterList";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [eventsData, setEventsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [localCity, setLocalCity] = useState("");
  const [noEventsFound, setNoEventsFound] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsRes = await fetch(`${backendUrl}/api/v1/events/upcoming`, {
        credentials: "include",
      });

      const eventsData = await eventsRes.json();
      setEventsData(eventsData?.upcomingEvents);
    };

    fetchEvents();
  }, []);

  const filterEvents = (events, text, category) => {
    return events.filter((item) => {
      const matchesText = item?.title.toLowerCase().includes(text.toLowerCase());

      const matchesCategory = category ? item?.categories?.includes(category) : true;

      return matchesText && matchesCategory;
    });
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);

    const filteredEvents = filterEvents(eventsData, text, selectedCategory);
    setFilteredData(filteredEvents);
    setNoEventsFound(filteredEvents.length === 0);
  };

  const handleCategories = (e) => {
    const category = e.currentTarget.textContent;
    const isClicked = selectedCategory === category;
    const newCategory = isClicked ? "" : category;

    setSelectedCategory(newCategory);

    const filteredEvents = filterEvents(eventsData, searchText, newCategory);
    setFilteredData(filteredEvents);
    setNoEventsFound(filteredEvents.length === 0);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-svh pb-32">
      <div className="bg-purple-1 w-full py-4 flex flex-col items-center">
        {/* <div className="mb-5 text-white">
          <CurrentLocation setLocalCity={setLocalCity} />
        </div> */}
        <div className="flex items-center mb-5 pt-6 w-full px-5">
          {/* Search Input Field */}
          <input
            onChange={handleSearch}
            value={searchText}
            className="border-[1px] p-2 w-full"
            type="text"
            placeholder="Search"
          />
          <div className="h-full">
            <FilterListIcon
              sx={{
                fontSize: "2.6rem",
                color: "#00ECAA",
              }}
              className="bg-purple-2 cursor-pointer"
              onClick={() => setShowPopup(true)}
            />
          </div>
        </div>
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
                key={index}>
                <img
                  className={`w-[15px] ${
                    selectedCategory === cat?.category ? "filter-purple" : "filter-white"
                  }`}
                  src={cat?.src}
                  alt="Category Icon"
                />
                <p className="font-roboto-thin">{cat?.category}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Small Cards */}
      <div className="px-8">
        {noEventsFound && <p className="px-8 font-roboto-regular mt-4">No events found.</p>}
        {!noEventsFound &&
          (filteredData?.length > 0
            ? filteredData?.map((item) => {
                return <EventCardSmall key={item?._id} event={item} />;
              })
            : eventsData?.map((item) => {
                return <EventCardSmall key={item?._id} event={item} />;
              }))}
      </div>

      {showPopup && (
        <FilterPopup
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          selectedCategory={selectedCategory}
          localCity={localCity}
          eventsData={eventsData}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
          setSelectedCategory={setSelectedCategory}
          setLocalCity={setLocalCity}
          handleCategories={handleCategories}
          searchText={searchText}
          setNoEventsFound={setNoEventsFound}
        />
      )}
    </div>
  );
};

export default SearchPage;
