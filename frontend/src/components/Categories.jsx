import { categories } from "../constants/categories";

const Categories = ({ categoriesArray, setCategoriesArray }) => {
  // check if clicked category is already part of array -> return boolean
  const checkCategoriesArray = (category) => {
    return categoriesArray?.some((item) => category === item);
  };

  // depending on checked click: either add or delete category from array -> return updated array
  const handleCatArray = (category) => {
    const isClicked = checkCategoriesArray(category);
    if (isClicked) {
      // wenn true: filtern und state neu setzen
      const filteredArray = categoriesArray.filter((item) => item !== category);
      return setCategoriesArray(filteredArray);
    } else if (!isClicked) {
      // wenn false: spread und speichern
      return setCategoriesArray([...categoriesArray, category]);
    }
  };
  return (
    <div className="border border-[#7254EE] rounded-[16px] p-4 relative">
      <h3 className="absolute top-[-10px] text-[#7254EE] text-[12px] bg-white px-1 ml-[-7px] font-roboto-regular">
        Categories
      </h3>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {categories?.map((singleCategory) => (
          <p
            onClick={() => handleCatArray(singleCategory)}
            className={`min-w-20 text-center py-1 px-2 text-sm rounded-[1rem] border-purple-2 border font-roboto-regular cursor-pointer ${
              checkCategoriesArray(singleCategory)
                ? "text-white bg-purple-2 "
                : "  text-gray-300"
            }`}
            key={singleCategory}
            name={singleCategory}
          >
            {singleCategory}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Categories;
