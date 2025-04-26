import React from "react";

const Pagination = ({
  currentPage,
  lastPage,
  onPageChange,
  hasNext,
  hasPrev,
  primaryColor,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={!hasPrev}
        className="px-3 py-1 border rounded text-xl hover:bg-gray-200 disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: lastPage }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 border-2 rounded-md text-xl font-medium transition-all duration-200 ${
            currentPage === i + 1
              ? `${
                  primaryColor === "green"
                    ? "bg-green-400"
                    : `bg-${primaryColor}-400`
                } text-gray-600  border-${primaryColor}-500`
              : `bg-white text-gray-700 border-gray-300 hover:bg-${primaryColor}-100`
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, lastPage))}
        disabled={!hasNext}
        className="px-3 py-1 border rounded text-xl hover:bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
