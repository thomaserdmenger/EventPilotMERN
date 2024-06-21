import { useEffect, useState } from "react";
import CurrentLocation from "../components/CurrentLocation";
import SearchLocation from "../components/SearchLocation";
import { backendUrl } from "../api/api";
import EventCardSmall from "../components/EventCardSmall";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [eventsData, setEventsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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

  return (
    <div className="flex flex-col items-center justify-start h-svh">
      <div className="pb-[4.375rem]">{/* <CurrentLocation /> */}</div>
      <input
        onChange={handleSearch}
        value={searchText}
        className="border-[1px] p-2 mb-8"
        type="text"
        placeholder="Search"
      />
      <div className="px-8">
        {filteredData.length > 0
          ? filteredData?.map((item) => {
              return <EventCardSmall key={item?._id} event={item} />;
            })
          : eventsData?.map((item) => {
              return <EventCardSmall key={item?._id} event={item} />;
            })}
      </div>
    </div>
  );
};

export default SearchPage;

// ! Was brauchen wir alles?
// - Upcoming Events fetchen => State für upcomming Events
// - Filten nach Event Name
// - Render in Small Cards
