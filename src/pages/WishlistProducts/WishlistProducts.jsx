import React, { useState, useEffect } from "react";
import { FaMinusCircle } from "react-icons/fa";
import { useProductStore } from "../../providers/AppProviders";
import { updateWishlistInLocalStorage } from "../../utils/wishlist";
import { useNavigate } from "react-router-dom";

const WishlistProducts = () => {
  const { showWishlist, BASE_URL, syncWishlistFromLocalStorage } =
    useProductStore();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const itemsPerPage = 9;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setInitialLoad(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!initialLoad && showWishlist.length === 0) {
      setLoading(false);
    }
  }, [showWishlist, initialLoad]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = showWishlist.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(showWishlist.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleCardClick = (productId) => {
    navigate(`/categories/product/${productId}`);
  };

  const handleRemoveItem = async (e, productId) => {
    e.stopPropagation();
    setLoading(true);
    updateWishlistInLocalStorage(productId, "remove");
    await syncWishlistFromLocalStorage();
    // Reset to page 1 if the current page would be empty after removal
    if (currentProducts.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    setTimeout(() => setLoading(false), 300); // Brief loading for removal
  };

  const renderSkeleton = (numSkeletons) => {
    return Array.from({ length: numSkeletons }).map((_, index) => (
      <div
        key={index}
        className="border rounded-lg shadow p-4 bg-white animate-pulse flex items-center space-x-4"
      >
        <div className="w-32 h-32 bg-gray-200 rounded" />
        <div className="flex-1 space-y-3 py-1">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-5 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    ));
  };

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold text-gray-600">
        Your wishlist is empty
      </h2>
      <p className="text-gray-500 mt-2">
        You haven't added any products to your wishlist yet.
      </p>
    </div>
  );

  const skeletonCount =
    initialLoad || loading || showWishlist.length < itemsPerPage
      ? showWishlist.length
      : itemsPerPage;

  return (
    <div className="wishlist_content">
      <h1 className="text-3xl font-bold my-4 text-gray-700">My Wishlist</h1>

      {initialLoad ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderSkeleton(skeletonCount)}
        </div>
      ) : showWishlist.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? renderSkeleton(skeletonCount)
              : currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg overflow-hidden shadow hover:shadow-md transition p-4 flex items-center bg-white relative cursor-pointer"
                    onClick={() => handleCardClick(product.id)}
                  >
                    <button
                      className="absolute right-4 top-4 p-4"
                      onClick={(e) => handleRemoveItem(e, product.id)}
                    >
                      <FaMinusCircle
                        className="text-3xl text-orange-400 hover:text-orange-500"
                        title="Remove"
                      />
                    </button>
                    <img
                      src={`${BASE_URL}/${product.thumbnail}`}
                      alt={product.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover mb-4"
                    />
                    <div className="ml-4">
                      <h2 className="text-xl sm:text-2xl font-semibold mb-1">
                        {product.title}
                      </h2>
                      <p className="text-blue-400 font-bold mb-2 text-xl sm:text-2xl">
                        Price: ৳
                        {product.discount_price ? (
                          <>
                            {parseFloat(product.discount_price)}
                            <span className="text-xl line-through text-gray-400 ml-2">
                              ৳{parseFloat(product.base_price)}
                            </span>
                          </>
                        ) : (
                          parseFloat(product.base_price)
                        )}
                      </p>
                      <p className="text-xl text-gray-600">
                        Quantity:{" "}
                        {product.quantity > 0 ? (
                          <span className="text-green-600 font-semibold">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            Out of Stock
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-l-lg disabled:bg-blue-300"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="px-4 py-2 text-xl">{`${currentPage} of ${totalPages}`}</span>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-r-lg disabled:bg-blue-300"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WishlistProducts;
