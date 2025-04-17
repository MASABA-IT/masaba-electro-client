import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { TiInfo } from "react-icons/ti";
import { FaStar, FaRegStar } from "react-icons/fa";
const CategoriesBrandFilter = ({
  selectedBrands = [],
  selectedFeatures = [],
  selectedRatings,
  selectedCondition,
  setReset,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const scrollContainerRef = useRef(null);

  // Using refs to track the dragging state and starting positions
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const ratingWords = {
    1: "ONE",
    2: "TWO",
    3: "THREE",
    4: "FOUR",
    5: "FIVE",
  };

  useEffect(() => {
    // Combine all the selected items into one array
    const allSelectedItems = [
      ...selectedBrands.map((brand) => brand.name),

      ...selectedFeatures,
      selectedRatings ? (
        <p className="text-xl">{ratingWords[selectedRatings]}⭐ </p>
      ) : (
        ""
      ),
      selectedCondition ? (
        <p className="text-orange-500">{selectedCondition}</p>
      ) : (
        ""
      ),
    ].filter(Boolean);

    setSelectedItems(allSelectedItems);
  }, [selectedBrands, selectedFeatures, selectedRatings, selectedCondition]);

  // Mouse down event to initialize dragging
  const handleMouseDown = (e) => {
    isDownRef.current = true;
    scrollContainerRef.current.classList.add("active");
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  // Mouse leave event to cancel dragging
  const handleMouseLeave = () => {
    isDownRef.current = false;
    scrollContainerRef.current.classList.remove("active");
  };

  // Mouse up event to stop dragging
  const handleMouseUp = () => {
    isDownRef.current = false;
    scrollContainerRef.current.classList.remove("active");
  };

  // Mouse move event to update scroll position if dragging
  const handleMouseMove = (e) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2; // Adjust multiplier for scrolling speed
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  // Function to remove a single item from the list
  console.log("selectedItems", selectedItems);
  const removeItem = (itemToRemove) => {
    console.log("itemRemove", itemToRemove);
    const updatedItems = selectedItems.filter((item) => item !== itemToRemove);
    setSelectedItems(updatedItems);
    // Update selectedBrands only if the item removed is a brand
    // if (selectedBrands.includes(itemToRemove)) {
    //   setReset(true);
    // }
  };

  // Function to clear all selected filters
  const clearAllFilters = () => {
    setSelectedItems([]);

    setReset(true);
  };

  return (
    <div className="categoriesbrand_filter flex justify-start items-center my-2 ">
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex items-center px-2 py-2 text-2xl gap-x-2 whitespace-nowrap custom-scrollbar overflow-visible ${
          selectedItems.length > 8 ? "cursor-grab" : "cursor-default"
        }`}
        style={{ minHeight: "30px" }}
      >
        {/* Loop through selected items and create a button for each */}
        {selectedItems.map((item) => (
          <div
            key={item}
            className="bg-white py-1 px-2 border border-blue-100 rounded-lg group inline-block relative"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="px-4">{item}</span>
            <button
              className="absolute -right-2 -top-4 z-10 text-red-500  group-hover:text-red-400 scale-95 duration-75  hover:scale-125 ease"
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                border: "none",
                borderRadius: "50%",
              }}
              onClick={() => removeItem(item)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Clear All Filters button */}
      <button
        onClick={clearAllFilters}
        className="text-2xl"
        style={{
          color: selectedItems.length === 0 ? "red" : "#007BFF",
          padding: "5px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: selectedItems.length === 0 ? "not-allowed" : "pointer",
          opacity: selectedItems.length === 0 ? 0.6 : 1,
        }}
        disabled={selectedItems.length === 0}
      >
        {selectedItems.length === 0 ? (
          <span className="flex text-2xl gap-x-2">
            <TiInfo className="text-amber-400 " />
            Please Select Again!
          </span>
        ) : (
          <span>Clear&nbsp;All&nbsp;Filters</span>
        )}
      </button>
    </div>
  );
};

CategoriesBrandFilter.propTypes = {
  selectedBrands: PropTypes.arrayOf(PropTypes.string),
  selectedFeatures: PropTypes.arrayOf(PropTypes.string),
  selectedRatings: PropTypes.string,
  selectedCondition: PropTypes.string,
  updateSelectedBrands: PropTypes.func.isRequired,
};

export default CategoriesBrandFilter;
