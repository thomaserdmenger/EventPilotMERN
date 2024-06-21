import { useEffect, useState } from "react";
import CurrentLocation from "../components/CurrentLocation";
import SearchLocation from "../components/SearchLocation";
import { backendUrl } from "../api/api";
import EventCardSmall from "../components/EventCardSmall";
import { categories } from "../constants/categories.js";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [eventsData, setEventsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
      if (searchText)
        setFilteredData(
          eventsData?.filter((item) => item?.title.toLowerCase().includes(searchText))
        );
      setFilteredData(eventsData);
      return;
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

    // setSelectedCategory([...selectedCategories, e.target.textContent]);
  };

  return (
    <div className="flex flex-col items-center justify-start h-svh">
      <div className="pb-[4.375rem]">{/* <CurrentLocation /> */}</div>
      {/* Search Input Field */}
      <input
        onChange={handleSearch}
        value={searchText}
        className="border-[1px] p-2 mb-8"
        type="text"
        placeholder="Search"
      />
      {/* Categories Filter */}
      <div className="flex gap-2 flex-wrap justify-center mb-8">
        {categories?.map((cat, index) => {
          return (
            <div
              onClick={handleCategories}
              className="border-[1px] p-1 flex items-center justify-center gap-2"
              key={index}>
              <img className="w-[15px]" src={cat?.src} alt="" />
              <p className={selectedCategory === cat?.category ? `text-blue-500` : "text-red-500"}>
                {cat?.category}
              </p>
            </div>
          );
        })}
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
    </div>
  );
};

export default SearchPage;

// ! Was brauchen wir alles?
// - toggleState für Popup
// - Filter Button => Toggle Popup
// - Conditional Rendering

// 1. Popup wird Komponente

// # Cat
// - Event Form
// - Search
// - Popup
// - Edit User Profile
