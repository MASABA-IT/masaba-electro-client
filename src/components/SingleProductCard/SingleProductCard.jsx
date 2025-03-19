import React from "react";
import { FaEye, FaRegHeart } from "react-icons/fa"; // Eye icon from react-icons
import { Link } from "react-router-dom";

const SingleProductCard = ({ product }) => {
  // Function to render stars based on the rating (handling half stars)
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-orange-400">
          ★
        </span>
      );
    }

    // Add half star if needed
    if (halfStar) {
      stars.push(
        <span key="half" className="text-gray-300">
          ★
        </span>
      );
    }

    // Add empty stars to make up to 5
    for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
      stars.push(
        <span key={i} className="text-gray-300">
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
    <div className="product-card border rounded-lg overflow-hidden flex flex-col">
      {/* Image */}
      <div
        className="flex justify-center items-center p-[1rem] mx-auto"
        style={{ width: "80%", height: "60%" }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-[90%]"
        />
      </div>

      {/* Info */}
      <div className="product-info relative p-4 border-t">
        <div className="price-info mt-2">
          <span className="text-3xl font-bold text-gray-600">
            ${product.discountPrice}
          </span>
          <span className="text-xl line-through text-gray-400 ml-2">
            ${product.price}
          </span>
        </div>
        {/* Rating and Views */}
        <div className="flex gap-x-3 mt-1">
          {/* Rating */}
          <div className="text-3xl flex items-center">
            {renderStars(product.rating)}
          </div>

          {/* Views */}
          <div className="text-2xl flex items-center text-gray-500">
            <FaEye className="mr-2" />
            <span>{formatViews(product.views)}</span>
          </div>
        </div>
        <h3 className="text-2xl  text-gray-500">{product.title}</h3>
        <p className="text-xl text-gray-500">{product.subtitle}</p>

        <button className="absolute right-8 top-4 border-2 p-3 rounded-lg text-2xl group hover:shadow-md">
          <FaRegHeart className="text-blue-400 group-hover:text-red-300 transition-all duration-75 " />
        </button>
      </div>
    </div>
  );
};

export default SingleProductCard;
