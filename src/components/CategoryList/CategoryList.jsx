import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar, FaRegStar } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import { useProductStore } from "../../providers/AppProviders";
import { useNavigate, useParams } from "react-router-dom";

const CategoryList = () => {
  const {
    filters,
    setSelectedCategories,
    setSelectedBrands,
    setSelectedFeatures,
    // setSelectedRatings,
    setSelectedCondition,
    setSelectedPriceRange,
    selectedBrands,
    selectedCategories,
    // selectedCondition,
    // selectedRatings,
    // selectedItems,
    reset,
    setReset,
  } = useProductStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [openCategories, setOpenCategories] = useState({
    Categories: true,
    Brands: true,
    Features: true,
    "Price Range": true,
    // Ratings: true,
  });
  // const [expandedCategory, setExpandedCategory] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState({});

  // Update the selected price range when the slider changes
  useEffect(() => {
    setSelectedPriceRange({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice, setSelectedPriceRange]);
  // useEffect(() => {
  //   if (id) {
  //     setSelectedCategories(id);
  //   }
  // }, [id]);
  // Update selected categories
  const handleCategorySelect = (category) => {
    setSelectedCategories(category);
    navigate(`/categories/${category.id}`);
  };

  // Update selected condition
  // const handleConditionSelect = (condition) => {
  //   setSelectedCondition(condition);
  // };
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

  // const handleSelectRating = (rating) => {
  //   setSelectedRatings(rating);
  // };

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
      // setSelectedRatings(null);
      setSelectedCondition(null);
      // setSelectedCategories([]);
      setSelectedPriceRange({ min: 0, max: 5000000 });
      setMinPrice(100);
      setMaxPrice(50000);
      setReset(false);
    }
  }, [reset]);

  return (
    <div className="categories_list mr-8 ">
      <ul className="bg-white">
        {[...filters]
          .sort((a, b) => Number(a.id) - Number(b.id))
          .map((filter, index) => (
            <li key={index} className="p-3 ">
              <button
                onClick={() => toggleCategory(index, filter.name)}
                className="w-full text-left flex justify-between items-center font-semibold text-2xl text-gray-800 "
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
                <ul className="mt-2 ml-4 space-y-1 text-gray-700 text-lg ">
                  <div className="w-full">
                    <h3 className="text-xl font-bold mb-2">
                      Select {filter.name}
                    </h3>

                    {/* TYPE: checkbox */}
                    {filter.type === "checkbox" &&
                      (
                        [...filter.children.categories].sort(
                          (a, b) => Number(a.id) - Number(b.id)
                        ) || []
                      )
                        .slice(
                          0,
                          showAllCategories[filter.name]
                            ? filter.children.categories.length
                            : 5
                        )
                        .map((item, idx) => (
                          <label
                            key={idx}
                            className="mb-4 text-gray-600 text-2xl flex items-center space-x-2 cursor-pointer "
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

                    {/* ---comment----- */}
                    {/* TYPE: range */}

                    {filter.type === "range" && (
                      <div className="text-2xl flex flex-col justify-center items-center">
                        <Slider
                          value={[Number(minPrice), Number(maxPrice)]}
                          onChange={(e, newValue) => {
                            setMinPrice(newValue[0].toString());
                            setMaxPrice(newValue[1].toString());
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
                                const val = e.target.value;
                                if (
                                  val === "" ||
                                  (!isNaN(Number(val)) && Number(val) >= 0)
                                ) {
                                  setMinPrice(val);
                                }
                              }}
                              onBlur={() => {
                                const num = Number(minPrice);
                                if (!isNaN(num) && num <= Number(maxPrice)) {
                                  setMinPrice(num.toString());
                                } else {
                                  setMinPrice("0");
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
                                const val = e.target.value;
                                if (
                                  val === "" ||
                                  (!isNaN(Number(val)) && Number(val) <= 5000)
                                ) {
                                  setMaxPrice(val);
                                }
                              }}
                              onBlur={() => {
                                const num = Number(maxPrice);
                                if (!isNaN(num) && num >= Number(minPrice)) {
                                  setMaxPrice(num.toString());
                                } else {
                                  setMaxPrice("5000"); // default fallback
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
                    )}

                    {/* TYPE: list (categories) */}
                    {filter.type === "list" &&
                      (
                        [...filter.children.categories].sort(
                          (a, b) => Number(a.id) - Number(b.id)
                        ) || []
                      )
                        .slice(
                          0,
                          showAllCategories[filter.name] || parseInt(id) > 5
                            ? filter.children.categories.length
                            : 5
                        )
                        .map((cat, idx) => {
                          let isSelected =
                            selectedCategories?.id === cat?.id ||
                            (!selectedCategories && idx === 0) ||
                            parseInt(id) === cat?.id;
                          return (
                            <label
                              key={idx}
                              className={`py-2 block text-gray-500  cursor-pointer text-2xl   ${
                                isSelected ? "bg-blue-100 text-blue-600" : ""
                              } hover:text-blue-500 hover:bg-gray-100`}
                              onClick={() => handleCategorySelect(cat)}
                            >
                              {cat[filter.labelKey]}
                            </label>
                          );
                        })}

                    {/* See All / See Less */}
                    {filter.children?.categories?.length > 5 && (
                      <button
                        onClick={() => toggleSeeAll(filter.name)}
                        className="text-blue-500 mt-2  "
                      >
                        {(
                          showAllCategories[filter.name] || parseInt(id) > 5
                            ? "Categoires"
                            : null
                        )
                          ? "See Less"
                          : "See All"}
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

/*         
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
          
                    {/* {filter.type === "stars" &&
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
                    ------------------------
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
                                if (val >= 0 && val <= maxPrice)
                                  setMinPrice(val);
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
                    */
