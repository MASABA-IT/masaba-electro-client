import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useProductStore } from "../../providers/AppProviders";

const PaginationsBtn = () => {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    filteredProducts,
  } = useProductStore();

  const hasProducts =
    Array.isArray(filteredProducts?.Products?.data) &&
    filteredProducts.Products?.data.length > 0;

  // console.log(
  //   filteredProducts,
  //   "filteredProducts",
  //   filteredProducts.Products?.data,
  //   hasProducts
  // );
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const renderPageNumbers = () => {
    const maxVisiblePages = 10;
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first 5 pages
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }

      // Add ellipsis if current page is far from start
      if (currentPage > 5 + 2) {
        pages.push("...");
      }

      // Add some pages around current page
      const start = Math.max(6, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      // Add ellipsis if current page is far from end
      if (currentPage < totalPages - 5) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span key={`ellipsis-${index}`} className="px-2 py-1">
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded-md border font-medium transition-all duration-300 ${
            currentPage === page
              ? "border-blue-600 bg-blue-50 text-blue-600 shadow"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div
      className={`text-2xl   flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-4 border-t border-gray-200 ${
        hasProducts ? "flex" : "hidden"
      }`}
    >
      {/* Left: Prev & Next with page numbers */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="p-2 rounded-md border border-gray-300 text-gray-700 disabled:opacity-30 hover:bg-blue-50 transition-colors"
          aria-label="Previous page"
        >
          <FaChevronLeft size={14} />
        </button>

        <div className="flex gap-1 flex-wrap">{renderPageNumbers()}</div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border border-gray-300 text-gray-700 disabled:opacity-30 hover:bg-blue-50 transition-colors"
          aria-label="Next page"
        >
          <FaChevronRight size={14} />
        </button>
      </div>

      {/* Right: Page x of y */}
      <div className="text-gray-600">
        Page <span className="font-medium">{currentPage}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </div>
    </div>
  );
};

export default PaginationsBtn;
