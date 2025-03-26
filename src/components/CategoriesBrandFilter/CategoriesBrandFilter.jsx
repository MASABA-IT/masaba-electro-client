import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { TiInfo } from "react-icons/ti";

const CategoriesBrandFilter = ({
  selectedBrands = [],
  selectedFeatures = [],
  selectedRatings = [],
  selectedCondition,
  setReset,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const scrollContainerRef = useRef(null);

  // Using refs to track the dragging state and starting positions
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    // Combine all the selected items into one array
    const allSelectedItems = [
      ...selectedBrands,
      ...selectedFeatures,
      ...selectedRatings.map((rating) => `Rating: ${rating}`),
      selectedCondition ? `Condition: ${selectedCondition}` : "",
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
    const updatedItems = selectedItems.filter((item) => item !== itemToRemove);
    setSelectedItems(updatedItems);
    // Update selectedBrands only if the item removed is a brand
    if (selectedBrands.includes(itemToRemove)) {
      setReset(true);
    }
  };

  // Function to clear all selected filters
  const clearAllFilters = () => {
    setSelectedItems([]);

    setReset(true);
  };

  return (
    <div className="categoriesbrand_filter flex justify-start items-center py-4">
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex items-center px-2 text-2xl gap-x-2 whitespace-nowrap custom-scrollbar ${
          selectedItems.length > 8 ? "cursor-grab" : "cursor-default"
        }`}
        style={{ minHeight: "30px" }}
      >
        {/* Loop through selected items and create a button for each */}
        {selectedItems.map((item) => (
          <div
            key={item}
            className="bg-white py-2 px-3 border border-blue-400 rounded-lg group inline-block"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>{item}</span>
            <button
              className="text-gray-500   group-hover:text-red-400"
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
          padding: "10px 20px",
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
  selectedRatings: PropTypes.arrayOf(PropTypes.number),
  selectedCondition: PropTypes.string,
  updateSelectedBrands: PropTypes.func.isRequired,
};

export default CategoriesBrandFilter;
