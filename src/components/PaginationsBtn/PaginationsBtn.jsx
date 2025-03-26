import React, { useEffect, useRef } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PaginationsBtn = ({
  currentPage,
  totalPages,
  itemsPerPage,
  dropdownOptions = [12, 24, 36],
  showDropdown,
  onToggleDropdown,
  onItemsPerPageChange,
  onPrevPage,
  onNextPage,
}) => {
  // Create a ref for the dropdown container
  const containerRef = useRef(null);

  useEffect(() => {
    // This function checks for outside clicks
    const handleClickOutside = (event) => {
      if (
        showDropdown &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onToggleDropdown();
      }
    };

    // Attach event listener on mount
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, onToggleDropdown]);

  return (
    <div className="flex justify-end items-center space-x-4 mt-6 text-xl">
      {/* "Show" Dropdown */}
      <div ref={containerRef} className="relative h-full">
        <button
          onClick={onToggleDropdown}
          className="w-[10rem] h-full flex justify-between items-center border px-4 py-2 rounded-md shadow-sm focus:outline-none transition-all duration-200 hover:shadow-md"
        >
          <span>Show</span>
          <span>{itemsPerPage}</span>
          <FaChevronDown className="transition-transform duration-200 transform" />
        </button>
        {showDropdown && (
          <ul className="absolute z-10 mt-1 w-full border bg-white rounded-md shadow-lg transition-opacity duration-300 animate-fadeIn">
            {dropdownOptions.map((option) => (
              <li key={option}>
                <button
                  onClick={() => onItemsPerPageChange(option)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination Navigation */}
      <nav
        aria-label="Pagination"
        className="flex items-center border px-4 py-2 rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
      >
        <button
          onClick={onPrevPage}
          className="text-xl p-2 flex items-center disabled:opacity-50 transition-transform duration-200 hover:scale-105"
          aria-label="Previous Page"
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>

        <span className="px-4">
          {currentPage} of {totalPages}
        </span>

        <button
          onClick={onNextPage}
          className="text-xl p-2 flex items-center disabled:opacity-50 transition-transform duration-200 hover:scale-105"
          aria-label="Next Page"
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </nav>
    </div>
  );
};

export default PaginationsBtn;
