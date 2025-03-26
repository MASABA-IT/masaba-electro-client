import React from "react";
import { FaEye, FaRegHeart, FaRegStar } from "react-icons/fa"; // Eye icon from react-icons
import { Link } from "react-router-dom";

const SingleProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const decimalPart = rating % 1;
    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-orange-400">
          ★
        </span>
      );
    }

    // Add partial star if there's a decimal part
    if (decimalPart > 0) {
      // Calculate the percentage of the star that should be filled
      const fillPercentage = decimalPart * 100;

      stars.push(
        <span key="partial" className="relative inline-block">
          {/* Empty star background */}
          <span className="text-gray-300">★</span>
          {/* Filled portion of the star */}
          <span
            className="text-orange-400 absolute left-0 top-0 overflow-hidden"
            style={{ width: `${fillPercentage}%` }}
          >
            ★
          </span>
        </span>
      );
    }

    // Add empty stars to make up to 5
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return stars;
  };

  // Function to format the views number to smart format (e.g., 1.2k)
  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + "k";
    } else {
      return views.toString();
    }
  };

  return (
    <div className="product-card border rounded-lg overflow-hidden flex flex-row md:flex-col h-72 md:h-full">
      <div
        className="w-[35%] sm:w-[40%]   flex justify-center items-center py-1rem  md:py-[2rem] mx-auto md:w-[80%] md:h-[65%]"
        // style={{ width: "80%", height: "65%" }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="sm:h-[70%] md:h-full w-[90%]"
        />
      </div>

      {/* Info */}
      <div className="product-info relative p-4 md:border-t justify-between my-auto   h-[60%]   md:h-auto">
        <h3 className="text-2xl  text-gray-500 block md:hidden">
          {product.title}
        </h3>
        <div className="price-info mt-2">
          <span className="text-3xl font-bold text-gray-600">
            ${product.discountPrice}
          </span>
          <span className="text-xl line-through text-gray-400 ml-2">
            ${product.price}
          </span>
        </div>
        {/* Rating and Views */}
        <div className="flex gap-x-4 mt-1">
          {/* Rating */}
          <div className="text-3xl flex items-center text-gray-400 ">
            {renderStars(product.rating)}
            {/* <span style={{ fontSize: "14px" }}>{`(${product.rating})`}</span> */}
          </div>

          {/* Views */}
          <div className="text-2xl flex items-center text-gray-500">
            <FaEye className="mr-2" />
            <span>{formatViews(product.views)}</span>
          </div>
        </div>
        <h3 className="text-2xl  text-gray-500 hidden md:block">
          {product.title}
        </h3>
        <p className="text-xl text-gray-500">{product.subtitle}</p>

        <button className="custom-button  absolute right-3 md:right-8  top-4  border-2 p-3 rounded-lg text-2xl group hover:shadow-md">
          <FaRegHeart className="text-blue-400 group-hover:text-red-300 transition-all duration-75 " />
        </button>
      </div>
    </div>
  );
};

export default SingleProductCard;
