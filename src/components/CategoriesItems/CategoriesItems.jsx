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
import MobileCategoryList from "../MobileCategoryList/MobileCategoryList";

const CategoriesItems = ({ allData }) => {
  const {
    selectedFeatures,
    selectedBrands,
    selectedCategories,
    selectedCondition,
    selectedRatings,
    selectedPriceRange,
    setReset,
    fetchFilteredProducts,
    filteredProducts,
    navCollections = [],
    setCollectionsId,
    collectionId,
    currentPage,
    mobileSidebarFilter,
    setMobileSidebarFilter,
  } = useProductStore();
  const [allProducts, setAllProducts] = useState([]); // All product data
  const [loading, setLoading] = useState(true);

  const [itemsPerPage, setItemsPerPage] = useState(12); // Default items per page
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchFilteredProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedCategories,
    selectedPriceRange,
    selectedBrands,
    selectedFeatures,
    selectedCondition,
    currentPage,
  ]);

  useEffect(() => {
    setLoading(true);
    if (!allData || allData.length === 0) {
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

  // const filteredProducts = allProducts
  //   .filter((product) => {
  //     // Handle brand filter (assuming product has brand_id)
  //     const matchBrand = selectedBrands?.length
  //       ? selectedBrands.some((brand) => brand.id === product.brand_id)
  //       : true;

  //     // Handle category filter
  //     const matchCategory = selectedCategories
  //       ? product.category_id === selectedCategories.id
  //       : true;

  //     // Handle features filter
  //     const matchFeatures = selectedFeatures?.length
  //       ? selectedFeatures.every((f) => product.features?.includes(f))
  //       : true;

  //     // Handle rating filter (proper null checks)
  //     const matchRating =
  //       selectedRatings !== undefined && selectedRatings !== null
  //         ? Math.floor(Number(product.average_rating)) === selectedRatings
  //         : true;

  //     // Handle price filter (use discount_price if available)
  //     const productPrice = Number(product.discount_price || product.base_price);
  //     const { min = 0, max = Infinity } = selectedPriceRange || {};
  //     const matchPrice = productPrice >= min && productPrice <= max;

  //     // Handle condition filter
  //     const conditions = selectedCondition
  //       ? Array.isArray(selectedCondition)
  //         ? selectedCondition
  //         : [selectedCondition]
  //       : [];
  //     const matchCondition = conditions.length
  //       ? conditions.includes(product.condition)
  //       : true;

  //     return (
  //       matchBrand &&
  //       matchCategory &&
  //       matchFeatures &&
  //       matchRating &&
  //       matchPrice &&
  //       matchCondition
  //     );
  //   })
  //   .sort((a, b) => {
  //     // Sorting logic remains similar but updated for correct properties
  //     const hasPriceFilter =
  //       selectedPriceRange &&
  //       (selectedPriceRange.min !== 0 || selectedPriceRange.max !== Infinity);

  //     const aFullMatch = selectedFeatures?.length
  //       ? selectedFeatures.every((f) => a.features?.includes(f))
  //       : false;
  //     const bFullMatch = selectedFeatures?.length
  //       ? selectedFeatures.every((f) => b.features?.includes(f))
  //       : false;

  //     if (bFullMatch !== aFullMatch) {
  //       return bFullMatch - aFullMatch;
  //     }

  //     const aPrice = Number(a.discount_price || a.base_price);
  //     const bPrice = Number(b.discount_price || b.base_price);

  //     if (hasPriceFilter && bPrice !== aPrice) {
  //       return bPrice - aPrice;
  //     }

  //     const aRating = Number(a.average_rating) || 0;
  //     const bRating = Number(b.average_rating) || 0;

  //     if (bRating !== aRating) {
  //       return bRating - aRating;
  //     }

  //     return bPrice - aPrice;
  //   });
  // Calculate pagination values

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // console.log("Filtering with:", {
  //   selectedBrands,
  //   selectedCategories,
  //   selectedFeatures,
  //   selectedRatings,
  //   selectedCondition,
  //   selectedPriceRange,
  // });

  // const currentProducts = filteredProducts.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );
  // console.log(currentProducts, "currentProducts");
  // Handlers for pagination controls
  // const handlePrevPage = () => {
  //   setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  // };

  // const handleNextPage = () => {
  //   setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  // };

  // // Handler for changing items per page from the dropdown
  // const handleItemsPerPageChange = (value) => {
  //   setItemsPerPage(value);
  //   setCurrentPage(1); // reset to first page when value changes
  //   setShowDropdown(false);
  // };
  // const handleToggleDropdown = () => {
  //   setShowDropdown((prev) => !prev);
  // };
  const isMobile = useIsMobile();

  // //////////change columns
  const [isGridView, setIsGridView] = useState(true);
  const handleGridView = () => {
    if (!isGridView) setIsGridView(true);
  };

  const handleListView = () => {
    if (isGridView) setIsGridView(false);
  };

  const limitWords = (text, maxWords) => {
    const words = text.trim().split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };
  const handleToggle = () => {
    setMobileSidebarFilter(!mobileSidebarFilter);
  };
  return (
    <div className="categoriesitems_content ">
      {isMobile ? (
        <div className="w-full flex  justify-between gap-x-3 items-center text-xl md:text-2xl py-3">
          <div className="  flex  items-center space-x-2">
            {/* <button className=" border py-3 px-2 flex  gap-x-4 items-center  ">
              Sort&nbsp;Newest
              <MdOutlineSort />
            </button> */}
            <button
              className="border py-3 px-2 flex gap-x-4 items-center"
              onClick={handleToggle}
            >
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
          <div className="sub_container flex flex-wrap items-center justify-between   ">
            {/* collections -all list */}
            <div className="flex items-center   border border-gray-300 rounded-lg p-3   max-w-sm bg-white">
              <label className="text-xl font-semibold text-gray-700 whitespace-nowrap">
                Featured:
              </label>

              <div className="relative w-full">
                <select
                  value={collectionId}
                  onChange={(e) => setCollectionsId(e.target.value)}
                  className="w-full appearance-none bg-white rounded-md py-1.5 pl-3   text-xl text-gray-800 outline-none hover:cursor-pointer"
                >
                  {/* Default Option */}
                  <option value="">Select please</option>

                  {/* Dynamic Collections */}
                  {Array.isArray(navCollections) &&
                    [...navCollections]
                      .sort((a, b) => Number(a.id) - Number(b.id))
                      .map((collection, index) => (
                        <option key={index} value={collection.id}>
                          {limitWords(collection.title, 2)}
                        </option>
                      ))}
                </select>

                <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
            {/* end */}
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

      {/* {loading ? (
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
      )} */}
      {loading ? (
        <div className="text-center py-5">Loading...</div>
      ) : filteredProducts?.Products?.data.length > 0 ? (
        <div
          className={`product-list grid grid-cols-1 md:grid-cols-${
            isGridView ? 3 : 1
          } lg:grid-cols-${isGridView ? 4 : 1} gap-4`}
        >
          {filteredProducts?.Products?.data.map((product) => (
            <SingleProductCard
              key={product.id}
              product={product}
              isGridView={isGridView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl py-5 text-gray-500">
          No products match your filters.
        </div>
      )}

      {/* Pagination */}

      <PaginationsBtn />
      {mobileSidebarFilter && <MobileCategoryList />}
    </div>
  );
};

export default CategoriesItems;
