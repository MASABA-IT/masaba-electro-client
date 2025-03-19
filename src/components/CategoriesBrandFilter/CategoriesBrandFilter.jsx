import React, { useState } from "react";

const CategoriesBrandFilter = () => {
  // Sample demo brands
  const brands = ["Samsung", "Apple", "Sony", "LG", "Huawei", "Nokia"];

  // State to store selected brands
  const [selectedBrands, setSelectedBrands] = useState(brands);

  // Function to remove a single brand from the list
  const removeBrand = (brandToRemove) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.filter((brand) => brand !== brandToRemove)
    );
  };

  // Function to clear all selected brands
  const clearAllFilters = () => {
    setSelectedBrands([]); // Clear all brands
  };

  return (
    <div className="categoriesbrand_filter flex justify-start items-center py-4">
      <div className="flex items-center py-3 px-2 text-2xl gap-x-2">
        {/* Loop through available selected brands and create a button for each */}
        {selectedBrands.map((brand) => (
          <div
            key={brand}
            className="bg-white py-2 px-3 border border-blue-400 rounded-lg group"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>{brand}</span>
            <button
              className="text-gray-500 cursor-pointer group-hover:text-red-400"
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                border: "none",
                borderRadius: "50%",
              }}
              onClick={() => removeBrand(brand)} // Call the removeBrand function
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Clear All Filters button */}
      <button
        onClick={clearAllFilters} // Call the clearAllFilters function
        className="text-2xl"
        style={{
          color: "#007BFF",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: selectedBrands.length === 0 ? "not-allowed" : "pointer",
          opacity: selectedBrands.length === 0 ? 0.5 : 1, // Make button look disabled
        }}
        disabled={selectedBrands.length === 0} // Disable button when no filters are selected
      >
        {selectedBrands.length === 0 ? "All Cleared" : "Clear All Filters"}
      </button>
    </div>
  );
};

export default CategoriesBrandFilter;
