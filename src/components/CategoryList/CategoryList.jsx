import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar, FaRegStar } from "react-icons/fa";
import Slider from "@mui/material/Slider";

const CategoryList = ({
  selectedBrands,
  selectedFeatures,
  selectedRatings,
  selectedCondition,
  setSelectedCategories,
  setSelectedBrands,
  setSelectedFeatures,
  setSelectedRatings,
  setSelectedCondition,
  setSelectedPriceRange,
  selectedCategories,
  allData,
  reset,
  setReset,
}) => {
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [openCategories, setOpenCategories] = useState({
    Category: true,
    Brands: true,
    Features: true,
  });
  const [expandedCategory, setExpandedCategory] = useState(null); // To track which category has expanded
  const [showAllCategories, setShowAllCategories] = useState({}); // Track "See All" for each category

  // Update the selected price range when the slider changes
  useEffect(() => {
    setSelectedPriceRange({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice, setSelectedPriceRange]);

  // Update selected categories
  const handleCategorySelect = (category) => {
    setSelectedCategories([category]); // Replace the previous category with the new one
  };

  // Update selected condition
  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition); // Replace the condition with the new one
  };

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

  const handlePriceApply = () => {
    setSelectedPriceRange({ min: minPrice, max: maxPrice });
  };

  // Toggle "See All" functionality
  const toggleSeeAll = (categoryName) => {
    setShowAllCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };
  useEffect(() => {
    if (reset) {
      setSelectedBrands([]);
      setSelectedFeatures([]);
      setSelectedRatings([]);
      setSelectedCondition(null);
      setSelectedCategories([]);
      setSelectedPriceRange({ min: 0, max: 5000 });
      setMinPrice(100);
      setMaxPrice(1000);
      setReset(false); // Reset the trigger
    }
  }, [reset]);
  return (
    <div className="categories_list mr-8 ">
      <ul className="space-y-2">
        {allData.filters?.map((category, index) =>
          category.name === "products" ? null : (
            <li key={index} className="p-3 ">
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
                      {category.children
                        .slice(
                          0,
                          showAllCategories[category.name]
                            ? category.children.length
                            : 5
                        )
                        .map((item, itemIndex) => (
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
                      {/* See All button */}
                      {category.children.length > 5 &&
                        !showAllCategories[category.name] && (
                          <button
                            onClick={() => toggleSeeAll(category.name)}
                            className="text-blue-500 mt-2"
                          >
                            See All
                          </button>
                        )}
                      {showAllCategories[category.name] && (
                        <button
                          onClick={() => toggleSeeAll(category.name)}
                          className="text-blue-500 mt-2"
                        >
                          See Less
                        </button>
                      )}
                    </div>
                  ) : category.name === "Price Range" ? (
                    <div className="text-2xl flex flex-col justify-center items-center">
                      <h3 className="font-bold mb-2">Select Price Range</h3>
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
                      <div className="flex space-x-2 mt-2">
                        <div className="w-1/2">
                          <label htmlFor="minPrice" className="block text-xl">
                            Min
                          </label>
                          <input
                            type="number"
                            id="minPrice"
                            value={minPrice}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              if (value >= 0 && value <= maxPrice) {
                                setMinPrice(value);
                              }
                            }}
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
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              if (value <= 5000 && value >= minPrice) {
                                setMaxPrice(value);
                              }
                            }}
                            className="border outline-none p-2 rounded w-full text-gray-400"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handlePriceApply}
                        className="w-full text-center bg-white text-blue-500 border m-2 p-3 rounded hover:bg-zinc-50"
                      >
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
                            onChange={() => handleConditionSelect(condition)}
                            className="mr-2"
                          />
                          {condition}
                        </label>
                      ))}
                    </div>
                  ) : category.name === "Category" ? (
                    <div className="mt-4">
                      {category.children
                        .slice(
                          0,
                          showAllCategories[category.name]
                            ? category.children.length
                            : 5
                        )
                        .map((child, childIndex) => (
                          <label
                            key={childIndex}
                            className={`py-2 block text-gray-500 cursor-pointer text-2xl ${
                              selectedCategories.includes(child)
                                ? "bg-blue-100 text-blue-600"
                                : ""
                            } hover:text-blue-500 hover:bg-gray-100`}
                            onClick={() => handleCategorySelect(child)}
                          >
                            {child}
                          </label>
                        ))}
                      {/* See All button */}
                      {category.children.length > 5 &&
                        !showAllCategories[category.name] && (
                          <button
                            onClick={() => toggleSeeAll(category.name)}
                            className="text-blue-500 mt-2"
                          >
                            See All
                          </button>
                        )}
                      {showAllCategories[category.name] && (
                        <button
                          onClick={() => toggleSeeAll(category.name)}
                          className="text-blue-500 mt-2"
                        >
                          See Less
                        </button>
                      )}
                    </div>
                  ) : null}
                </ul>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
