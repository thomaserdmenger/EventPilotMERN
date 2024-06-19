import CurrentLocation from "../components/CurrentLocation";
import SearchLocation from "../components/SearchLocation";

const SearchPage = () => {
  return (
    <div className="h-svh">
      <div className="pb-[4.375rem]">
        <h1>Search</h1>
        <CurrentLocation />
        <SearchLocation />
      </div>
    </div>
  );
};

export default SearchPage;
