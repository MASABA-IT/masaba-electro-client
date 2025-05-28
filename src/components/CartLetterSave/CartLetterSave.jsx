import React, { useEffect, useState } from "react";
import { IoMdRemoveCircle } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useProductStore } from "../../providers/AppProviders";
import { useNavigate } from "react-router-dom";
import { updateWishlistInLocalStorage } from "../../utils/wishlist";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // ✅ import Swiper styles
import { AiOutlineInfoCircle } from "react-icons/ai";

const CartLetterSave = () => {
  const { showWishlist, BASE_URL } = useProductStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (showWishlist.length > 0) {
  //     setTimeout(() => setIsLoading(false), 800);
  //   }
  // }, []);
  useEffect(() => {
    if (showWishlist.length > 0) {
      setIsLoading(true);
      const timeout = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timeout); // cleanup
    } else {
      setIsLoading(false);
    }
  }, [showWishlist]);
  const skeletonCount = showWishlist.length || 4;

  const handleCardClick = (productId) => {
    navigate(`/categories/product/${productId}`);
  };

  const handleRemoveItem = (e, productId) => {
    e.stopPropagation();
    setIsLoading(true);
    updateWishlistInLocalStorage(productId, "remove");
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div
      className={`cartLetterSave bg-white border-2 rounded-xl `}
      style={{ display: showWishlist.length !== 0 ? "block" : "none" }}
    >
      <h2 className="text-2xl xl:text-3xl p-3 xl:p-6 font-bold">
        Saved for later ({showWishlist.length})
      </h2>

      {isLoading ? (
        <div className="flex gap-4 overflow-x-auto p-4">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div
              key={i}
              className="w-[250px] flex-shrink-0 p-4 rounded-xl animate-pulse border border-gray-200"
            >
              <div className="w-full h-[150px] bg-gray-200 rounded-lg mb-4" />
              <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="flex justify-between">
                <div className="h-10 bg-gray-200 rounded w-5/12" />
                <div className="h-10 bg-gray-200 rounded w-5/12" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="px-4 pb-6"
        >
          {showWishlist.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="p-4 rounded-xl flex flex-col hover:shadow-md transition border h-full bg-white">
                <div className="w-full h-[150px] flex justify-center items-center overflow-hidden rounded-lg mb-4">
                  <img
                    src={`${BASE_URL}/${product.thumbnail}`}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* {product.discount_price &&
                parseFloat(product.discount_price) <
                  parseFloat(product.base_price) ? (
                  <div className="flex justify-start items-center gap-x-2">
                    <p className="text-[1.6rem] font-bold text-red-500 mb-1">
                      ৳&nbsp;{product.discount_price}
                    </p>
                    <p className="text-lg line-through text-gray-400 mb-1">
                      ৳&nbsp;{product.base_price}
                    </p>
                  </div>
                ) : (
                  <p className="text-[1.6rem] font-bold text-[#ad7d3e] mb-1">
                    ৳&nbsp;{product.base_price}
                  </p>
                )} */}
                <p className="text-2xl sm:text-xl text-center   text-gray-600 mb-1">
                  ৳&nbsp;{product.base_price}
                </p>
                <h2 className="text-xl sm:text-2xl font-medium text-gray-600 mb-3 text-center line-clamp-2">
                  {product.title}
                </h2>
                <div className="mt-auto btn_group flex justify-between text-xl">
                  <button
                    onClick={() => handleCardClick(product.id)}
                    className="text-blue-500 font-semibold border-2 px-3 py-1 rounded-lg hover:bg-gray-200 transition flex items-center gap-x-2"
                  >
                    <AiOutlineInfoCircle className="text-2xl mx-4 sm:mx-0" />
                    <span className="hidden sm:block">View Details</span>
                  </button>
                  <button
                    onClick={(e) => handleRemoveItem(e, product.id)}
                    className="text-red-400 font-semibold border-2 px-3 py-1 rounded-lg hover:bg-gray-200 transition flex items-center gap-x-2"
                  >
                    <IoMdRemoveCircle className="text-2xl mx-4 sm:mx-0" />
                    <span className="hidden sm:block">Remove</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CartLetterSave;
