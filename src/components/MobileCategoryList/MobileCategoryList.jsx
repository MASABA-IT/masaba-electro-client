import React, { useState, useEffect } from "react";
import { useProductStore } from "../../providers/AppProviders";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import Slider from "@mui/material/Slider";
import { motion, AnimatePresence } from "framer-motion";

const MobileCategoryList = () => {
  const {
    filters,
    setSelectedCategories,
    setSelectedBrands,
    setSelectedFeatures,
    setSelectedCondition,
    setSelectedPriceRange,
    selectedBrands,
    selectedCategories,
    mobileSidebarFilter,
    setMobileSidebarFilter,
  } = useProductStore();

  const navigate = useNavigate();
  const { id } = useParams();

  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [openCategories, setOpenCategories] = useState(() => {
    const initialOpen = {};
    filters.forEach((filter) => {
      // 80% open, 20% closed
      initialOpen[filter.name] = Math.random() > 0.2;
    });
    return initialOpen;
  });
  const [showAllCategories, setShowAllCategories] = useState({});

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(".mobile-sidebar");
      if (sidebar && !sidebar.contains(event.target)) {
        setMobileSidebarFilter(false);
      }
    };

    if (mobileSidebarFilter) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [mobileSidebarFilter]);

  // Update price range on change
  useEffect(() => {
    setSelectedPriceRange({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice]);

  const toggleCategory = (name) => {
    console.log(name, "name");
    setOpenCategories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const toggleSeeAll = (name) => {
    setShowAllCategories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories(category);
    navigate(`/categories/${category.id}`);
    setMobileSidebarFilter(false);
  };

  const handleMultiSelect = (item, setSelectedItems, selectedItems) => {
    const exists = selectedItems.some((i) => i.id === item.id);
    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handlePriceApply = () => {
    setSelectedPriceRange({ min: minPrice, max: maxPrice });
  };

  return (
    <AnimatePresence>
      {mobileSidebarFilter && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="mobile-sidebar fixed top-0 right-0 h-full w-4/5 max-w-md bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setMobileSidebarFilter(false)}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                <IoIosClose />
              </button>
            </div>

            <div className="p-4">
              <ul className="space-y-4 ">
                {[...filters]
                  .sort((a, b) => Number(a.id) - Number(b.id))
                  .map((filter, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b pb-4 last:border-b-0"
                    >
                      <button
                        onClick={() => toggleCategory(filter.name)}
                        className=" w-full flex justify-between items-center text-lg font-semibold text-gray-800 py-2"
                      >
                        {filter.name}
                        <motion.span
                          animate={{
                            rotate: openCategories[filter.name] ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <IoIosArrowDown />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {openCategories[filter.name] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden "
                          >
                            <div className="mt-2 ml-2 text-lg">
                              {/* TYPE: checkbox */}
                              {filter.type === "checkbox" &&
                                (filter.children?.categories || [])
                                  .sort((a, b) => Number(a.id) - Number(b.id))
                                  .slice(
                                    0,
                                    showAllCategories[filter.name]
                                      ? filter.children.categories.length
                                      : 5
                                  )
                                  .map((item, index) => (
                                    <motion.label
                                      key={index}
                                      whileTap={{ scale: 0.98 }}
                                      className="flex items-center space-x-3 my-3 py-1"
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
                                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                      />
                                      <span className="text-gray-700">
                                        {item[filter.labelKey]}
                                      </span>
                                    </motion.label>
                                  ))}

                              {/* TYPE: range */}
                              {filter.type === "range" && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.1 }}
                                  className="mt-4"
                                >
                                  <Slider
                                    value={[Number(minPrice), Number(maxPrice)]}
                                    onChange={(e, newValue) => {
                                      setMinPrice(newValue[0].toString());
                                      setMaxPrice(newValue[1].toString());
                                    }}
                                    min={0}
                                    max={5000}
                                    valueLabelDisplay="auto"
                                    className="py-4"
                                  />
                                  <div className="flex gap-4 mt-2">
                                    <div className="flex-1">
                                      <label className="block text-sm text-gray-600 mb-1">
                                        Min
                                      </label>
                                      <input
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) =>
                                          setMinPrice(e.target.value)
                                        }
                                        className="w-full border p-2 rounded text-gray-700"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <label className="block text-sm text-gray-600 mb-1">
                                        Max
                                      </label>
                                      <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) =>
                                          setMaxPrice(e.target.value)
                                        }
                                        className="w-full border p-2 rounded text-gray-700"
                                      />
                                    </div>
                                  </div>
                                  <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handlePriceApply}
                                    className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                                  >
                                    Apply Price Range
                                  </motion.button>
                                </motion.div>
                              )}

                              {/* TYPE: list */}
                              {filter.type === "list" &&
                                (filter.children?.categories || [])
                                  .sort((a, b) => Number(a.id) - Number(b.id))
                                  .slice(
                                    0,
                                    showAllCategories[filter.name]
                                      ? filter.children.categories.length
                                      : 5
                                  )
                                  .map((cat, index) => {
                                    const isSelected =
                                      selectedCategories?.id === cat?.id ||
                                      parseInt(id) === cat?.id;
                                    return (
                                      <motion.div
                                        key={index}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() =>
                                          handleCategorySelect(cat)
                                        }
                                        className={`px-3 py-3 my-1 rounded-lg cursor-pointer transition-colors ${
                                          isSelected
                                            ? "bg-blue-100 text-blue-600 font-medium"
                                            : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                      >
                                        {cat[filter.labelKey]}
                                      </motion.div>
                                    );
                                  })}

                              {/* See All Button */}
                              {filter.children?.categories?.length > 5 && (
                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => toggleSeeAll(filter.name)}
                                  className="text-blue-600 mt-2 text-sm font-medium hover:text-blue-800 transition-colors"
                                >
                                  {showAllCategories[filter.name]
                                    ? "Show Less"
                                    : "Show More"}
                                </motion.button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  ))}
              </ul>
            </div>

            {/* Sticky footer buttons */}
            <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedFeatures([]);
                  setSelectedCondition(null);
                  setSelectedPriceRange({ min: 0, max: 5000000 });
                  setMinPrice(100);
                  setMaxPrice(50000000);
                }}
                className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium"
              >
                Reset
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setMobileSidebarFilter(false)}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Apply
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileCategoryList;
