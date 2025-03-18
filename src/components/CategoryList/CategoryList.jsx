import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const categories = [
  {
    name: "Category",
    children: [
      "Mobile Accessory",
      "Electronics",
      "Smart Phones",
      "Modern Tech",
      "See All",
    ],
  },
  {
    name: "Brands",
    children: ["Samsung", "Apple", "Huawei", "Pocco", "Lenevo", "See All"],
  },
  {
    name: "Features",
    children: [
      "Metalic",
      "Plastic Cover",
      "8GB Ram",
      "Super Power",
      "Large Memory",
      "See All",
    ],
  },
  {
    name: "Price Range",
    children: ["$0 - $100", "$100 - $500", "$500 - $1000", "$1000+"],
  },
  {
    name: "Condition",
    children: ["New", "Refurbished", "Used"],
  },
  {
    name: "Ratings",
    children: [5, 4, 3, 2, 1],
  },
];

const CategoryList = () => {
  const [openCategories, setOpenCategories] = useState({});
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const toggleCategory = (index) => {
    setOpenCategories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleMultiSelect = (item, setSelectedItems, selectedItems) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSingleSelect = (item, setSelectedItem) => {
    setSelectedItem(item);
  };

  const applyPriceRange = () => {
    alert(`Price Range Applied: ${minPrice} - ${maxPrice}`);
  };

  return (
    <div className="categories_list rounded-lg">
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index} className="p-3 border-b-2">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(index)}
              className="w-full text-left flex justify-between items-center font-semibold text-xl text-gray-800"
            >
              {category.name}
              <span
                className={`transform transition-transform ${
                  openCategories[index] ? "rotate-180" : ""
                }`}
              >
                <IoIosArrowDown />
              </span>
            </button>

            {/* Child List */}
            {openCategories[index] && (
              <ul className="mt-2 ml-4 space-y-1 text-gray-700 text-lg">
                {category.name === "Brands" ||
                category.name === "Features" ||
                category.name === "Ratings" ? (
                  <div className="flex justify-between">
                    {/* Left: Select List */}
                    <div className="w-1/2 border-r pr-4">
                      <h3 className="text-lg font-bold mb-2">
                        Select {category.name}
                      </h3>
                      {category.children.map((item, itemIndex) => (
                        <label key={itemIndex} className="block">
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
                          {item}
                        </label>
                      ))}
                    </div>

                    {/* Right: Selected List */}
                    <div className="w-1/2 pl-4">
                      <h3 className="text-lg font-bold mb-2">
                        Selected {category.name}
                      </h3>
                      {(category.name === "Brands"
                        ? selectedBrands
                        : category.name === "Features"
                        ? selectedFeatures
                        : selectedRatings
                      ).length > 0 ? (
                        (category.name === "Brands"
                          ? selectedBrands
                          : category.name === "Features"
                          ? selectedFeatures
                          : selectedRatings
                        ).map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex justify-between items-center bg-gray-200 p-2 rounded mb-1"
                          >
                            <span>{item}</span>
                            <button
                              onClick={() =>
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
                              className="text-red-500 font-bold"
                            >
                              X
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">
                          No {category.name.toLowerCase()} selected
                        </p>
                      )}
                    </div>
                  </div>
                ) : category.name === "Price Range" ? (
                  <div>
                    {/* First: Selectable Price Range */}
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        Select Price Range
                      </h3>
                      {category.children.map((range, rangeIndex) => (
                        <button
                          key={rangeIndex}
                          onClick={() => setSelectedPriceRange(range)}
                          className={`block w-full text-left py-1 px-2 rounded ${
                            selectedPriceRange === range
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-200"
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>

                    {/* Second: Custom Price Input */}
                    <div className="mt-4">
                      <h3 className="text-lg font-bold mb-2">Custom Price</h3>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="border p-2 rounded w-1/2"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="border p-2 rounded w-1/2"
                        />
                      </div>
                    </div>

                    {/* Third: Apply Button */}
                    <button
                      onClick={applyPriceRange}
                      className="mt-2 bg-green-500 text-white py-1 px-3 rounded"
                    >
                      Apply
                    </button>
                  </div>
                ) : category.name === "Condition" ? (
                  category.children.map((condition, conditionIndex) => (
                    <label
                      key={conditionIndex}
                      className="block cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="condition"
                        value={condition}
                        checked={selectedCondition === condition}
                        onChange={() =>
                          handleSingleSelect(condition, setSelectedCondition)
                        }
                        className="mr-2"
                      />
                      {condition}
                    </label>
                  ))
                ) : (
                  category.children.map((rating, ratingIndex) => (
                    <button
                      key={ratingIndex}
                      onClick={() =>
                        handleMultiSelect(
                          rating,
                          setSelectedRatings,
                          selectedRatings
                        )
                      }
                      className="block w-full text-left py-1 px-2 rounded hover:bg-gray-200"
                    >
                      ⭐ {rating}
                    </button>
                  ))
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
