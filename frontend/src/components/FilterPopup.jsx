const FilterPopup = ({ setShowPopup }) => {
  return (
    <>
      <div className="fixed bottom-0 z-20 bg-white w-full h-[80%]">
        <p>Test</p>{" "}
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
