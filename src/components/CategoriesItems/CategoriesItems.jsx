import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoReorderFourSharp } from "react-icons/io5";
import { PiGridFourFill } from "react-icons/pi";
import CategoriesBrandFilter from "../CategoriesBrandFilter/CategoriesBrandFilter";
import SingleProductCard from "../SingleProductCard/SingleProductCard";

const CategoriesItems = () => {
  const [products, setProducts] = useState([]); // State for holding product data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Fetching product data from the API
  useEffect(() => {
    // Simulated API call - replace with actual endpoint
    const fetchProducts = async () => {
      try {
        const response = await fetch("/src/data/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products); // Assuming the API returns a products array
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Stop loading after the API call completes
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if the API call fails
  }

  return (
    <div className="categoriesitems_content">
      {/* 1st */}
      <div className="container border px-4 py-3">
        {/* Display items count and category */}
        <p className="">
          {`${products.length} items in`}{" "}
          <span className="font-semibold">{"Mobile accessory"}</span>
        </p>

        <div className="sub_container">
          {/* Verified only checkbox */}
          <div className="verified-checkbox">
            <input type="checkbox" id="verified" />
            <label htmlFor="verified">Verified only</label>
          </div>

          {/* Features section with down arrow icon */}
          <div className="featured-section border rounded-lg py-3 px-2 border-gray-300">
            <span>Featured</span>
            <IoIosArrowDown className="down-arrow" />
          </div>

          {/* 4 small square boxes, 2 per row */}
          <div className="box-container">
            <button>
              <PiGridFourFill />
            </button>
            <button>
              <IoReorderFourSharp />
            </button>
          </div>
        </div>
      </div>
      {/* 2nd */}
      <CategoriesBrandFilter />
      {/* 3rd */}
      <div className="product-list grid grid-cols-4 gap-4">
        {products.map((product) => (
          <SingleProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesItems;
