import React, { useState, useEffect, useRef } from "react";
import PropTypes, { number } from "prop-types";
import { TiInfo } from "react-icons/ti";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useProductStore } from "../../providers/AppProviders";
const CategoriesBrandFilter = () => {
  const {
    selectedBrands,
    selectedFeatures,
    selectedCondition,
    selectedRatings,
    setReset,
    selectedItems,
    setSelectedItems,
    setSelectedBrands,
    setSelectedFeatures,
    setSelectedCondition,
    setSelectedRatings,
  } = useProductStore();

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
      ...selectedBrands.map((brand) => brand),

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

  const removeItem = (itemToRemove) => {
    console.log("remove-item", itemToRemove);

    // Remove from selectedItems
    const updatedItems = selectedItems.filter(
      (item) => item.id !== itemToRemove.id
    );
    setSelectedItems(updatedItems);

    // If the item exists in selectedBrands, remove it
    const isBrand = selectedBrands.some((b) => b.id === itemToRemove.id);
    if (isBrand) {
      setSelectedBrands(selectedBrands.filter((b) => b.id !== itemToRemove.id));
      return;
    }

    // If the item exists in selectedFeatures, remove it
    const isFeature = selectedFeatures.some((f) => f.id === itemToRemove.id);
    if (isFeature) {
      setSelectedFeatures(
        selectedFeatures.filter((f) => f.id !== itemToRemove.id)
      );
      return;
    }

    //If it's a rating (React element), remove it by clearing the rating
    if (Array.isArray(itemToRemove.props?.children)) {
      setSelectedRatings(null);
      return;
    }

    // If it's a condition
    if (
      typeof itemToRemove === "object" &&
      itemToRemove?.props?.className?.includes("text-orange-500")
    ) {
      setSelectedCondition(null);
      return;
    }
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
            key={item.id || item}
            className="bg-white py-1 px-2 border border-blue-100 rounded-lg group inline-block relative"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="px-4">{item.name ? item.name : item}</span>
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
          <></>
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
