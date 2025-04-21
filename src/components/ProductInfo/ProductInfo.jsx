import React from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { CgComment } from "react-icons/cg";
import { MdOutlineShoppingBasket } from "react-icons/md";
import StarRating from "../StarRating/StarRating";

const ProductInfo = ({ product }) => {
  if (!product) return null;

  return (
    <div className="product_info md:px-4 xl:px-10 py-2 mt-10 md:mt-0 xl:mt-0">
      {/* Stock Status */}
      <p className="flex justify-start items-center text-xl">
        {product?.stocks?.[0]?.quantity > 0 ? (
          <>
            <IoCheckmark className="text-3xl text-green-400" />
            In Stock
          </>
        ) : (
          <>
            <IoClose className="text-3xl text-red-400" />
            Out of Stock
          </>
        )}
      </p>

      {/* Title and Subtitle */}
      <h2 className="text-2xl xl:text-3xl font-medium font-sans ">
        {product?.title && <span>{product.title}</span>}
        {product?.subtitle && (
          <>
            &nbsp;<span>{product.subtitle}</span>
          </>
        )}
        {product?.features?.length > 0 && (
          <div className="mt-2">
            {product.features.map((feature, index) => (
              <span key={index} className="inline-block mr-2">
                {feature}
              </span>
            ))}
          </div>
        )}
      </h2>

      {/* Rating, Reviews, Sold */}
      <div className="text-2xl flex flex-wrap gap-x-4 items-center text-gray-600 mt-2">
        <div className="flex items-center gap-x-1">
          <StarRating rating={product.rating || 0} />
          <span className="text-orange-300">{product.rating || 0}</span>
        </div>

        {product.reviews && (
          <>
            <GoDotFill className="text-gray-300 text-xl" />
            <div className="flex items-center gap-x-1">
              <CgComment />
              <span>{product.reviews.length} Reviews</span>
            </div>
          </>
        )}

        <>
          <GoDotFill className="text-gray-300 text-xl" />
          <div className="flex items-center gap-x-1">
            <MdOutlineShoppingBasket />
            <span>{product.sold || 0} sold</span>
          </div>
        </>
      </div>

      {/* Price / Brand / Material / Warranty */}
      <div className="px-4 py-6 text-[1.6rem] bg-white rounded-2xl mt-6">
        {product?.base_price && (
          <div className="flex justify-between items-center border-b border-gray-100 py-3">
            <span className="text-gray-500 font-medium">Price:</span>
            <span className="text-gray-900 font-semibold">
              ৳ {parseFloat(product.base_price)}
            </span>
          </div>
        )}

        {product?.brand?.name && (
          <div className="flex justify-between items-center border-b border-gray-100 py-3">
            <span className="text-gray-500 font-medium">Brand:</span>
            <span className="text-gray-800">{product.brand.name}</span>
          </div>
        )}

        {product?.material && (
          <div className="flex justify-between items-center border-b border-gray-100 py-3">
            <span className="text-gray-500 font-medium">Material:</span>
            <span className="text-gray-800">{product.material}</span>
          </div>
        )}

        {product?.warranty && (
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-500 font-medium">Warranty:</span>
            <span className="text-gray-800">
              {product.warranty} year(s)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
