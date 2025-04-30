import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoReorderFourSharp } from "react-icons/io5";
import { PiGridFourFill } from "react-icons/pi";
import CategoriesBrandFilter from "../CategoriesBrandFilter/CategoriesBrandFilter";
import SingleProductCard from "../SingleProductCard/SingleProductCard";
import PaginationsBtn from "../PaginationsBtn/PaginationsBtn";
import { useIsMobile } from "../../hooks/useIsMobile";
import { MdOutlineSort } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import { iconButtonClasses } from "@mui/material";
import { useProductStore } from "../../providers/AppProviders";

const CategoriesItems = ({ allData }) => {
  const {
    selectedFeatures,
    selectedBrands,
    selectedCategories,
    selectedCondition,
    selectedRatings,
    selectedPriceRange,
    setReset,
  } = useProductStore();
  const [allProducts, setAllProducts] = useState([]); // All product data
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // Default items per page
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!allData || allData.length === 0) {
      console.error("Categories data is empty or undefined.");
      setLoading(false);
      return;
    }

    if (allData) {
      setAllProducts(allData || []);
    } else {
      console.warn("Products category not found in the provided data.");
      setAllProducts([]);
    }
    setLoading(false);
  }, [allData]);

  // Filtering the products based on selected filters
  const filteredProducts = allProducts
    .filter((product) => {
      const brands = selectedBrands || [];
      const categories = selectedCategories || [];
      const features = selectedFeatures || [];
      const ratings = selectedRatings || [];
      const conditions = selectedCondition
        ? Array.isArray(selectedCondition)
          ? selectedCondition
          : [selectedCondition]
        : [];
      const priceRange = selectedPriceRange || { min: 0, max: Infinity };

      const matchBrand = brands.length ? brands.includes(product.brand) : true;
      const matchCategory = categories.length
        ? categories.includes(product.category)
        : true;

      const fullFeatureMatch = features.length
        ? features.every((f) => product.features.includes(f))
        : true;

      const partialFeatureMatch = features.length
        ? features.some((f) => product.features.includes(f))
        : true;

      const matchPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      const matchRating = ratings.length
        ? ratings.includes(Math.floor(product.rating))
        : true;

      const matchCondition = conditions.length
        ? conditions.includes(product.condition)
        : true;

      return (
        matchBrand &&
        matchCategory &&
        (fullFeatureMatch || partialFeatureMatch) &&
        matchPrice &&
        matchRating &&
        matchCondition
      );
    })
    .sort((a, b) => {
      const hasPriceFilter =
        selectedPriceRange &&
        (selectedPriceRange.min !== 0 || selectedPriceRange.max !== Infinity);

      const aFullMatch = selectedFeatures.length
        ? selectedFeatures.every((f) => a.features.includes(f))
        : false;
      const bFullMatch = selectedFeatures.length
        ? selectedFeatures.every((f) => b.features.includes(f))
        : false;

      if (bFullMatch !== aFullMatch) {
        return bFullMatch - aFullMatch;
      }

      if (hasPriceFilter && b.price !== a.price) {
        return b.price - a.price;
      }

      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }

      return b.price - a.price;
    });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handlers for pagination controls
  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  // Handler for changing items per page from the dropdown
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // reset to first page when value changes
    setShowDropdown(false);
  };
  const handleToggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  const isMobile = useIsMobile();

  // //////////change columns
  const [isGridView, setIsGridView] = useState(true);
  const handleGridView = () => {
    if (!isGridView) setIsGridView(true);
  };

  const handleListView = () => {
    if (isGridView) setIsGridView(false);
  };

  return (
    <div className="categoriesitems_content ">
      {isMobile ? (
        <div className="w-full flex  justify-between gap-x-3 items-center text-xl md:text-2xl py-3">
          <div className="  flex  items-center space-x-2">
            <button className=" border py-3 px-2 flex  gap-x-4 items-center  ">
              Sort&nbsp;Newest
              <MdOutlineSort />
            </button>
            <button className=" border py-3 px-2 flex gap-x-4 items-center  ">
              Filter&nbsp;<span>{`(${3})`}</span>
              <CiFilter />
            </button>
          </div>
          <div className="sub_container flex flex-wrap items-center justify-between  ">
            <div className="box-container flex items-center space-x-2">
              <button className="">
                <PiGridFourFill />
              </button>
              <button className="bg-[#f0f0f0]">
                <IoReorderFourSharp />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container border px-4 py-3">
          {!selectedCategories?.length > 0 ? (
            <p>{`Now All ${allProducts?.length} items`}</p>
          ) : (
            <div className="flex justify-center items-center gap-x-2">
              <p>{`${allProducts.length} items in `}</p>
              <p className="font-semibold">{selectedCategories}</p>
              <button
                className="text-xl rounded-md shadow-md text-gray-50 py-2 px-2 bg-red-300 hover:bg-red-400 transition-all"
                onClick={() => setReset(true)}
              >
                Clear
              </button>
            </div>
          )}
          <div className="sub_container flex flex-wrap items-center justify-between ">
            <div className="verified-checkbox">
              <input type="checkbox" id="verified" />
              <label htmlFor="verified">Verified only</label>
            </div>

            <div className="featured-section border rounded-lg py-3 px-2 border-gray-300 flex items-center">
              <span>Featured</span>
              <IoIosArrowDown className="ml-1" />
            </div>

            <div className="box-container flex items-center space-x-2">
              <button
                className={`p-2 rounded ${
                  isGridView
                    ? "bg-blue-500 text-sky-50 rounded-lg"
                    : "bg-gray-100"
                }`}
                onClick={handleGridView}
              >
                <PiGridFourFill />
              </button>
              <button
                className={`p-2 rounded ${
                  !isGridView
                    ? "bg-blue-500 text-sky-50 rounded-lg"
                    : "bg-gray-100"
                }`}
                onClick={handleListView}
              >
                <IoReorderFourSharp />
              </button>
            </div>
          </div>
        </div>
      )}

      <CategoriesBrandFilter />

      {loading ? (
        <div className="text-center py-5">Loading...</div>
      ) : allData?.length > 0 ? (
        <div
          className={`product-list grid  grid-cols-1 md:grid-cols-${
            isGridView ? 3 : 1
          } lg:grid-cols-${isGridView ? 4 : 1} gap-4  `}  
        >
          {allData?.map((product) => (
            <SingleProductCard
              key={product.id}
              product={product}
              isGridView={isGridView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl py-5 text-gray-500">
          No products available.
        </div>
      )}

      {/* Pagination */}
      {allData?.length > 0 ? (
        <PaginationsBtn
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          showDropdown={showDropdown}
          onToggleDropdown={handleToggleDropdown}
          onItemsPerPageChange={handleItemsPerPageChange}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CategoriesItems;
