import React, { useState } from "react";
import { FaEye, FaRegHeart, FaRegStar } from "react-icons/fa"; // Eye icon from react-icons
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import { useProductStore } from "../../providers/AppProviders";

const SingleProductCard = ({ product, isGridView }) => {
  const { BASE_URL } = useProductStore();

  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + "k";
    } else {
      return views?.toString();
    }
  };
  ////////////////////
  ///// Navigate to the product details page wi th id, category, color, and condition as URL parameters
  // /categories/product/:id

  const handleProductClick = () => {
    navigate(`/categories/product/${product.id}`);
  };
  return (
    <div
      className={` product-card relative border rounded-lg overflow-hidden flex  flex-col cursor-pointer hover:shadow-md duration-100   md:flex-${
        isGridView ? "col" : "row"
      } h-72 ${isGridView ? "md:min-h-[326px] md:h-full" : "md:h-[200px]"}`}
      onClick={handleProductClick}
    >
      <div
        className={`w-[35%] sm:w-[40%]   flex justify-center items-center py-1rem  md:py-[2rem] mx-auto ${
          isGridView
            ? "md:w-[80%] md:h-[231px]"
            : "md:ml-10 md:max-w-[15%] md:h-full  "
        } `}
        // style={{ width: "80%", height: "65%" }}
      >
        <img
          src={`${BASE_URL}/${product?.thumbnail}`}
          alt={product?.title}
          className="sm:h-[70%] md:h-full w-[90%]"
        />
      </div>

      {/* Info */}
      {!isGridView ? (
        // single column
        <div className="product-info relative p-4   justify-between my-auto h-[55%]   md:h-[95%]">
          <h3 className="text-2xl md:text-3xl  text-gray-700 ">
            {product.title}
          </h3>

          <div className="  h-[70%]">
            <div className="price-info md:mt-2">
              <span className="text-xl md:text-3xl font-bold text-gray-600">
                ${product?.discount_price}
              </span>
              <span className="text-xl line-through text-gray-400 ml-2">
                ${product?.base_price}
              </span>
            </div>
            {/* Rating and Views */}
            <div className="flex gap-x-4 mt-1">
              {/* Rating */}
              <div className="text-3xl flex items-center text-gray-400 ">
                <StarRating rating={product?.average_rating} />
              </div>

              {/* Views */}
              <div className="text-2xl flex items-center text-gray-500">
                <FaEye className="mr-2" />
                <span>{formatViews(product?.review_count)}</span>
              </div>
              {/* order */}
              <div className="hidden md:flex gap-x-4 ">
                {product?.orders && (
                  <div className={`text-2xl md:flex gap-x-2 items-center    `}>
                    <p className="text-gray-400">{product?.orders}</p>
                    <p className="text-gray-400">orders</p>
                  </div>
                )}
                {/* delivery_charge */}
                {
                  <div
                    className={`text-2xl flex gap-x-2 items-center  ${
                      !isGridView ? "inline-block" : "hidden"
                    }`}
                  >
                    <p className="text-green-500">
                      {product?.delivery_charge === false
                        ? "Free Shipping"
                        : ""}
                    </p>
                  </div>
                }
              </div>
            </div>
            <p className="text-xl text-gray-500">{product.subtitle}</p>
            <p className="md:block hidden ">
              {product?.description?.length > 100
                ? product.description.slice(0, 150) + "..."
                : product?.description}
            </p>
          </div>
          <button className="mt-2 text-2xl md:block hidden w-[12rem] py-2 px-4 bg-blue-400 hover:bg-blue-500 duration-150 transition-all text-white rounded-lg">
            View Details
          </button>
        </div>
      ) : (
        <div className="product-info relative p-4 md:border-t justify-between my-auto h-[75%] md:h-auto">
          <h3 className=" md:text-2xl text-gray-500 block md:hidden">
            {product.title}
          </h3>
          {/* price */}
          {product?.discount_price ? (
            <div className="price-info mt-2">
              <span className="text-3xl font-bold text-gray-600">
                ৳{parseFloat(product?.discount_price)}
              </span>
              <span className="text-xl line-through text-gray-400 ml-2">
                ৳{parseFloat(product?.base_price)}
              </span>
            </div>
          ) : (
            <span className="text-3xl font-bold text-gray-600">
              ৳{parseFloat(product?.base_price)}
            </span>
          )}
          {/* Rating and Views */}
          <div className="flex gap-x-4 mt-1">
            {/* Rating */}
            <div className="text-3xl flex items-center text-gray-400 ">
              <StarRating rating={product?.average_rating} />
            </div>

            {/* Views */}
            <div className="text-2xl flex items-center text-gray-500">
              <FaEye className="mr-2" />
              <span>{formatViews(product?.review_count)}</span>
            </div>
          </div>
          <h3 className="text-[18px]  text-gray-600 hidden md:block font-sans font-normal">
            {product?.title}
          </h3>
          {/* <p className="text-xl text-gray-500">{product.subtitle}</p> */}
        </div>
      )}
      {/* heart */}
      <button
        className={`custom-button absolute xl:right-3 right-2 md:right-2 ${
          isGridView ? "md:bottom-20  xl:bottom-34 md:right-2" : "top-4"
        } border-2 p-3 rounded-lg text-2xl group hover:shadow-sm`}
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
      >
        <FaRegHeart className={isLiked ? "text-red-500" : "text-blue-400"} />
      </button>
    </div>
  );
};

export default SingleProductCard;
