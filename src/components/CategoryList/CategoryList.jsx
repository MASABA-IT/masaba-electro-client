import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar, FaRegStar } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import { useProductStore } from "../../providers/AppProviders";
import { li } from "framer-motion/client";

const CategoryList = ({
  selectedBrands,
  // selectedFeatures,
  selectedRatings,
  selectedCondition,
  setSelectedCategories,
  setSelectedBrands,
  setSelectedFeatures,
  setSelectedRatings,
  setSelectedCondition,
  setSelectedPriceRange,
  selectedCategories,

  reset,
  setReset,
}) => {
  const { filters } = useProductStore();
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [openCategories, setOpenCategories] = useState({
    Categories: true,
    Brands: true,
    Features: true,
    "Price Range": true,
    Ratings: true,
  });
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState({});

  // Update the selected price range when the slider changes
  useEffect(() => {
    setSelectedPriceRange({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice, setSelectedPriceRange]);

  // Update selected categories
  const handleCategorySelect = (category) => {
    setSelectedCategories([category]);
  };

  // Update selected condition
  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition);
  };
  // console.log("categoryList", allData);
  const toggleCategory = (index, categoryName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const handleMultiSelect = (item, setSelectedItems, selectedItems) => {
    const exists = selectedItems.some((i) => i.id === item.id);

    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSelectRating = (rating) => {
    setSelectedRatings(rating);
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
      setSelectedRatings(null);
      setSelectedCondition(null);
      setSelectedCategories([]);
      setSelectedPriceRange({ min: 0, max: 5000 });
      setMinPrice(100);
      setMaxPrice(1000);
      setReset(false); // Reset the trigger
    }
  }, [reset]);
  console.log("filters", filters);

  return (
    <div className="categories_list mr-8 ">
      <ul>
        {filters.map((filter, index) => (
          <li key={index} className="p-3">
            <button
              onClick={() => toggleCategory(index, filter.name)}
              className="w-full text-left flex justify-between items-center font-semibold text-2xl text-gray-800"
            >
              {filter.name}
              <span
                className={`transform transition-transform ${
                  openCategories[filter.name] ? "rotate-180" : ""
                }`}
              >
                <IoIosArrowDown />
              </span>
            </button>

            {openCategories[filter.name] && (
              <ul className="mt-2 ml-4 space-y-1 text-gray-700 text-lg">
                <div className="w-full">
                  <h3 className="text-xl font-bold mb-2">
                    Select {filter.name}
                  </h3>

                  {/* TYPE: checkbox */}
                  {filter.type === "checkbox" &&
                    (filter.children?.categories || [])
                      .slice(
                        0,
                        showAllCategories[filter.name]
                          ? filter.children.categories.length
                          : 5
                      )
                      .map((item, idx) => (
                        <label
                          key={idx}
                          className="mb-4 text-gray-600 text-2xl flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedBrands.some(
                              (brand) => brand.id === item.id
                            )}
                            onChange={() =>
                              handleMultiSelect(
                                item,
                                setSelectedBrands,
                                selectedBrands
                              )
                            }
                            className="mr-2"
                          />
                          {item[filter.labelKey]}
                        </label>
                      ))}

                  {/* TYPE: radio */}
                  {filter.type === "radio" &&
                    (filter.children?.categories || []).map((item, idx) => (
                      <label
                        key={idx}
                        className="block cursor-pointer text-2xl text-gray-600"
                      >
                        <input
                          type="radio"
                          name={filter.key}
                          value={item}
                          checked={selectedCondition === item}
                          onChange={() => handleConditionSelect(item)}
                          className="mr-2"
                        />
                        {item}
                      </label>
                    ))}

                  {/* TYPE: stars */}
                  {filter.type === "stars" &&
                    (filter.children.categories || []).map((rating, idx) => (
                      <label
                        key={idx}
                        className="mb-4 text-gray-600 text-2xl flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRatings === rating}
                          onChange={() => handleSelectRating(rating)}
                          className="mr-2"
                        />
                        <div className="flex gap-1 text-orange-500 text-2xl">
                          {[...Array(5)].map((_, i) =>
                            i < rating ? (
                              <FaStar key={i} />
                            ) : (
                              <FaRegStar key={i} className="text-gray-300" />
                            )
                          )}
                        </div>
                      </label>
                    ))}

                  {/* TYPE: range */}
                  {filter.type === "range" && (
                    <div className="text-2xl flex flex-col justify-center items-center">
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
                      <div className="flex space-x-2 mt-2 w-full">
                        <div className="w-1/2">
                          <label htmlFor="minPrice" className="block text-xl">
                            Min
                          </label>
                          <input
                            type="number"
                            id="minPrice"
                            value={minPrice}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              if (val >= 0 && val <= maxPrice) setMinPrice(val);
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
                              const val = Number(e.target.value);
                              if (val <= 5000 && val >= minPrice)
                                setMaxPrice(val);
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
                  )}

                  {/* TYPE: list (categories) */}
                  {filter.type === "list" &&
                    (filter.children?.categories || [])
                      .slice(
                        0,
                        showAllCategories[filter.name]
                          ? filter.children.categories.length
                          : 5
                      )
                      .map((cat, idx) => (
                        <label
                          key={idx}
                          className={`py-2 block text-gray-500 cursor-pointer text-2xl ${
                            selectedCategories.includes(cat.id)
                              ? "bg-blue-100 text-blue-600"
                              : ""
                          } hover:text-blue-500 hover:bg-gray-100`}
                          onClick={() => handleCategorySelect(cat.title)}
                        >
                          {cat[filter.labelKey]}
                        </label>
                      ))}

                  {/* See All / See Less */}
                  {filter.children?.categories?.length > 5 && (
                    <button
                      onClick={() => toggleSeeAll(filter.name)}
                      className="text-blue-500 mt-2"
                    >
                      {showAllCategories[filter.name] ? "See Less" : "See All"}
                    </button>
                  )}
                </div>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
/*import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar, FaRegStar } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import { useProductStore } from "../../providers/AppProviders";

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
  alldata,
  allData,
  reset,
  setReset,
}) => {
  const { categories } = useProductStore();
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
  console.log("categoryList", allData);
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
        {alldata.filters?.map((category, index) =>
          category.name === "products" ? null : (
            <li key={index} className="p-3 bg-red-200 ">
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
*/
/* {alldata.filters?.map((category, index) =>
          category.name === "products" ? null : (
            <li key={index} className="p-3  ">
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
                <ul className="mt-2 ml-4 space-y-1 text-gray-700 text-lg  ">
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
        )}*/
