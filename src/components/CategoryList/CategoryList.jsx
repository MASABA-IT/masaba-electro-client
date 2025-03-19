import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar, FaRegStar } from "react-icons/fa";
import Slider from "@mui/material/Slider";

const CategoryList = ({
  selectedBrands,
  selectedFeatures,
  selectedRatings,
  selectedCondition,
  setSelectedBrands,
  setSelectedFeatures,
  setSelectedRatings,
  setSelectedCondition,
}) => {
  const [openCategories, setOpenCategories] = useState({
    // Open Category, Brands, and Features by default
    Category: true,
    Brands: true,
    Features: true,
  });
  const [categories, setCategories] = useState([]); // Set data from the imported JSON
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/src/data/categories.json"); // Replace with your actual API endpoint
        const data = await response.json();
        console.log("Fetched categories:", data); // Log the response data to check the format
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    };

    fetchCategories();
  }, []);

  // State to track the visibility of extra items
  const [visibleItems, setVisibleItems] = useState({});

  const toggleCategory = (index, categoryName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const handleMultiSelect = (item, setSelectedItems, selectedItems) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Toggle visibility of extra items in categories
  const toggleVisibility = (index) => {
    setVisibleItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="categories_list border-t  mr-8">
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index} className="p-3 border-b-2">
            <button
              onClick={() => toggleCategory(index, category.name)}
              className="w-full text-left flex justify-between items-center font-semibold text-2xl text-gray-800"
            >
              {category.name}
              <span
                className={`transform transition-transform ${
                  openCategories[category.name] ? "rotate-180" : ""
                }`}
              >
                <IoIosArrowDown />
              </span>
            </button>
            {openCategories[category.name] && (
              <ul className="mt-2 ml-4 space-y-1 text-gray-700 text-lg">
                {category.name === "Brands" ||
                category.name === "Features" ||
                category.name === "Ratings" ? (
                  <div className="w-full">
                    <h3 className="text-xl font-bold mb-2">
                      Select {category.name}
                    </h3>
                    {category.children.slice(0, 5).map((item, itemIndex) => (
                      <label
                        key={itemIndex}
                        className="mb-4 text-gray-600 text-2xl flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={
                            category.name === "Brands"
                              ? selectedBrands.includes(item)
                              : category.name === "Features"
                              ? selectedFeatures.includes(item)
                              : selectedRatings.includes(item)
                          }
                          onChange={() =>
                            handleMultiSelect(
                              item,
                              category.name === "Brands"
                                ? setSelectedBrands
                                : category.name === "Features"
                                ? setSelectedFeatures
                                : setSelectedRatings,
                              category.name === "Brands"
                                ? selectedBrands
                                : category.name === "Features"
                                ? selectedFeatures
                                : selectedRatings
                            )
                          }
                          className="mr-2"
                        />
                        {category.name === "Ratings" ? (
                          <div className="flex gap-2 my-1 text-orange-500 text-2xl">
                            {[...Array(5)].map((_, index) =>
                              index < item ? (
                                <FaStar key={index} />
                              ) : (
                                <FaRegStar
                                  key={index}
                                  className="text-gray-300"
                                />
                              )
                            )}
                          </div>
                        ) : (
                          item
                        )}
                      </label>
                    ))}

                    {/* "See All" Button */}
                    {category.children.length > 5 && !visibleItems[index] && (
                      <button
                        onClick={() => toggleVisibility(index)}
                        className="text-blue-500 text-xl mt-2"
                      >
                        See all
                      </button>
                    )}

                    {/* Show extra items */}
                    {visibleItems[index] &&
                      category.children.slice(5).map((item, itemIndex) => (
                        <label
                          key={itemIndex}
                          className="mb-4 text-gray-600 text-2xl flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={
                              category.name === "Brands"
                                ? selectedBrands.includes(item)
                                : category.name === "Features"
                                ? selectedFeatures.includes(item)
                                : selectedRatings.includes(item)
                            }
                            onChange={() =>
                              handleMultiSelect(
                                item,
                                category.name === "Brands"
                                  ? setSelectedBrands
                                  : category.name === "Features"
                                  ? setSelectedFeatures
                                  : setSelectedRatings,
                                category.name === "Brands"
                                  ? selectedBrands
                                  : category.name === "Features"
                                  ? selectedFeatures
                                  : selectedRatings
                              )
                            }
                            className="mr-2"
                          />
                          {category.name === "Ratings" ? (
                            <div className="flex gap-2 my-1 text-orange-500 text-2xl">
                              {[...Array(5)].map((_, index) =>
                                index < item ? (
                                  <FaStar key={index} />
                                ) : (
                                  <FaRegStar
                                    key={index}
                                    className="text-gray-300"
                                  />
                                )
                              )}
                            </div>
                          ) : (
                            item
                          )}
                        </label>
                      ))}
                  </div>
                ) : category.name === "Price Range" ? (
                  <div className="text-2xl flex flex-col justify-center items-center">
                    <h3 className="font-bold mb-2">Select Price Range</h3>

                    {/* Price Slider */}
                    <Slider
                      value={[minPrice, maxPrice]}
                      onChange={(e, newValue) => {
                        setMinPrice(newValue[0]);
                        setMaxPrice(newValue[1]);
                      }}
                      min={0}
                      max={5000}
                      valueLabelDisplay="auto"
                    />

                    {/* Price Inputs */}
                    <div className="flex space-x-2 mt-2">
                      <div className="w-1/2">
                        <label htmlFor="minPrice" className="block text-xl">
                          Min
                        </label>
                        <input
                          type="number"
                          id="minPrice"
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          className="border outline-none p-2 rounded w-full text-gray-400"
                        />
                      </div>
                      <div className="w-1/2">
                        <label htmlFor="maxPrice" className="block text-xl">
                          Max
                        </label>
                        <input
                          type="number"
                          id="maxPrice"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          className="border outline-none p-2 rounded w-full text-gray-400"
                        />
                      </div>
                    </div>

                    <button className="w-full text-center bg-white text-blue-500 border   m-2 p-3 rounded hover:bg-zinc-50">
                      Apply
                    </button>
                  </div>
                ) : category.name === "Condition" ? (
                  <div className="space-y-3">
                    {category.children.map((condition, conditionIndex) => (
                      <label
                        key={conditionIndex}
                        className="block cursor-pointer text-2xl text-gray-600"
                      >
                        <input
                          type="radio"
                          name="condition"
                          value={condition}
                          checked={selectedCondition === condition}
                          onChange={() => setSelectedCondition(condition)}
                          className="mr-2"
                        />
                        {condition}
                      </label>
                    ))}
                  </div>
                ) : category.name === "Category" ? (
                  <div className="mt-4">
                    {category.children.slice(0, 5).map((child, childIndex) => (
                      <label
                        key={childIndex}
                        className="py-2 block text-gray-500 cursor-pointer text-2xl hover:text-blue-500 hover:bg-gray-100"
                      >
                        {child}
                      </label>
                    ))}
                    {/* "See All" Button for Category */}
                    {category.children.length > 5 && !visibleItems[index] && (
                      <button
                        onClick={() => toggleVisibility(index)}
                        className="text-blue-500 text-xl mt-2"
                      >
                        See all
                      </button>
                    )}

                    {/* Show extra items */}
                    {visibleItems[index] &&
                      category.children.slice(5).map((child, childIndex) => (
                        <label
                          key={childIndex}
                          className="py-2 block text-gray-500 cursor-pointer text-2xl hover:text-blue-500 hover:bg-gray-100"
                        >
                          {child}
                        </label>
                      ))}
                  </div>
                ) : null}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
