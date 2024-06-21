import { useEffect, useState } from "react";
import CurrentLocation from "../components/CurrentLocation";
import SearchLocation from "../components/SearchLocation";
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
  const [localCity, setLocalCity] = useState(""); // # useLocation von ExplorePage, falls vorhanden, sonst leerer String

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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const searchTextConst = e.target.value.toLowerCase();

    const filteredData = eventsData?.filter((item) =>
      item?.title.toLowerCase().includes(searchTextConst)
    );

    setFilteredData(filteredData);
  };

  const handleCategories = (e) => {
    const isClicked = selectedCategory === e.currentTarget.textContent;

    if (isClicked) {
      setSelectedCategory("");
      if (searchText) {
        setFilteredData(
          eventsData?.filter((item) =>
            item?.title.toLowerCase().includes(searchText)
          )
        );
        return;
      } else {
        return setFilteredData(eventsData);
      }
    }

    setSelectedCategory(e.currentTarget.textContent);
    const selectedCategoryConst = e.currentTarget.textContent;

    const filteredCategories =
      filteredData.length < 1
        ? eventsData?.filter((item) =>
            item?.categories?.find((item) => item === selectedCategoryConst)
          )
        : filteredData?.filter((item) =>
            item?.categories?.find((item) => item === selectedCategoryConst)
          );

    setFilteredData(filteredCategories);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-svh pb-32">
      <div className="bg-purple-1 w-full py-4 flex flex-col items-center">
        <div className="mb-5 text-white">
          <CurrentLocation setLocalCity={setLocalCity} />
        </div>
        <div className="flex items-center mb-5">
          {/* Search Input Field */}
          <input
            onChange={handleSearch}
            value={searchText}
            className="border-[1px] p-2"
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
                key={index}
              >
                <img className="w-[15px]" src={cat?.src} alt="" />
                <p className="font-roboto-thin">{cat?.category}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Small Cards */}
      <div className="px-8">
        {filteredData.length < 1 && searchText.length > 0 ? (
          <p>Nothing found.</p>
        ) : filteredData.length > 0 ? (
          filteredData?.map((item) => {
            return <EventCardSmall key={item?._id} event={item} />;
          })
        ) : (
          eventsData?.map((item) => {
            return <EventCardSmall key={item?._id} event={item} />;
          })
        )}
      </div>
      {showPopup && (
        <FilterPopup
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          selectedCategory={selectedCategory}
          localCity={localCity}
        />
      )}
    </div>
  );
};

export default SearchPage;

// ! Was brauchen wir alles?
// - toggleState für Popup
// - Filter Button => Toggle Popup
// - neuer State: localCity, setLocalCity
// - CurrentLocation mit Props setLocalCity => falls von explorePage kommend, aus useLocation holen, sonst leerer String (wie setzen wir currentLocation auf die currentLocation aus der explorePage?)

// - Popup-Komponente mit props: togglePopup, setTogglePopup, selectedCategory, setFilteredEvents, localCity
// - Positioning
// - in Popup-Komponente category-State setzen auf selectedCategory oder ""
// - in Popup-Komponente location-State setzen auf localCity oder ""
// - filtern nach 3 Sachen .....
// - Ergebnis in filteredEvents setten
// - popup schließen
