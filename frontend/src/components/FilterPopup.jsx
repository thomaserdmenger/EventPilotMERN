import { categories } from "../constants/categories";

const FilterPopup = ({
  showPopup,
  setShowPopup,
  selectedCategory,
  setSelectedCategory,
  setFilteredEvents,
  localCity,
  setLocalCity,
  handleCategories,
}) => {
  return (
    <>
      <div className="fixed bottom-0 z-20 bg-white w-full h-[80%]">
        <p>Test</p>
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

        <button
          className="bg-purple-1 p-2 text-white"
          onClick={() => setShowPopup(false)}
        >
          Apply
        </button>
      </div>
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
