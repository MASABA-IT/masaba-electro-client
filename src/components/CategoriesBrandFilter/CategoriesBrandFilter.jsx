import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
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
    searchCategories,
  } = useProductStore();

  const scrollContainerRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  const ratingWords = {
    1: "ONE",
    2: "TWO",
    3: "THREE",
    4: "FOUR",
    5: "FIVE",
  };

  useEffect(() => {
    // Check if mobile view
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const allSelectedItems = [
      ...selectedBrands.map((brand) => brand),
      ...selectedFeatures,
      selectedRatings && (
        <p key={`rating-${selectedRatings}`} className="text-xl">
          {ratingWords[selectedRatings]}⭐
        </p>
      ),
      selectedCondition && (
        <p key={`condition-${selectedCondition}`} className="text-orange-500">
          {selectedCondition}
        </p>
      ),
    ].filter(Boolean);

    setSelectedItems(allSelectedItems);
  }, [selectedBrands, selectedFeatures, selectedRatings, selectedCondition]);

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    isDownRef.current = true;
    startXRef.current =
      e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDownRef.current || !isMobile) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchEnd = () => {
    isDownRef.current = false;
  };

  // Mouse event handlers for desktop
  const handleMouseDown = (e) => {
    if (isMobile) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDownRef.current || isMobile) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
  };

  const removeItem = (itemToRemove) => {
    // Remove from selectedItems
    const updatedItems = selectedItems.filter(
      (item) => item.id !== itemToRemove.id
    );
    setSelectedItems(updatedItems);

    // Check which category the item belongs to and remove it
    if (selectedBrands.some((b) => b.id === itemToRemove.id)) {
      setSelectedBrands(selectedBrands.filter((b) => b.id !== itemToRemove.id));
    } else if (selectedFeatures.some((f) => f.id === itemToRemove.id)) {
      setSelectedFeatures(
        selectedFeatures.filter((f) => f.id !== itemToRemove.id)
      );
    } else if (Array.isArray(itemToRemove.props?.children)) {
      setSelectedRatings(null);
    } else if (
      typeof itemToRemove === "object" &&
      itemToRemove?.props?.className?.includes("text-orange-500")
    ) {
      setSelectedCondition(null);
    }
  };

  const clearAllFilters = () => {
    setSelectedItems([]);
    setReset(true);
  };

  return (
    <div className="categoriesbrand_filter flex flex-col md:flex-row justify-start items-start md:items-center my-2 overflow-hidden">
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`flex items-center px-2 py-2 text-base md:text-2xl gap-x-2 overflow-x-auto w-full md:w-auto ${
          selectedItems.length > 3 ? "cursor-grab" : "cursor-default"
        }`}
        style={{ WebkitOverflowScrolling: "touch" }} // For smooth scrolling on iOS
      >
        {selectedItems.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-white py-1 px-2 border border-blue-100 rounded-lg group inline-flex items-center relative mr-2"
          >
            <span className="px-2 md:px-4 truncate max-w-xs">
              {item.name ? item.name : item}
            </span>
            <button
              className="absolute -right-2 -top-2 z-10 text-red-500 bg-white rounded-full w-5 h-5 flex items-center justify-center text-2xl sm:text-3xl group-hover:text-red-400 hover:scale-110 transition-transform"
              onClick={() => removeItem(item)}
              aria-label={`Remove ${item.name || item}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <button
          onClick={clearAllFilters}
          className="text-base md:text-xl text-blue-600 hover:text-blue-800 ml-0 md:ml-2 mt-2 md:mt-0 px-3 py-1 whitespace-nowrap transition-colors"
        >
          Clear All Filters
        </button>
      )}
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
