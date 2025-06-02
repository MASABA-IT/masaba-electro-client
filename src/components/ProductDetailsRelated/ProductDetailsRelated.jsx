import React from "react";
import { useProductStore } from "../../providers/AppProviders";

const ProductDetailsRelated = ({ relatedProducts }) => {
  const { BASE_URL } = useProductStore();

  const handleViewsDataClick = (id) => {
    window.location.href = `/categories/product/${id}`;
  };

  return (
    <div className="bg-white my-5 md:my-8 lg:my-10">
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8">
          Related Products
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {relatedProducts?.map((product, index) => (
            <div
              key={index}
              className="border border-gray-200  rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer relative"
              onClick={() => handleViewsDataClick(product?.id)}
            >
              <div className="p-10 sm:p-4  overflow-hidden">
                <img
                  src={`${BASE_URL}/${product.thumbnail}`}
                  alt={product.name}
                  className="w-full h-[85px] sm:h-[120px] object-contain p-2 hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-3 ">
                <h2 className="text-2xl font-bold text-gray-800 line-clamp-2 h-[2.8em]">
                  {product.title}
                </h2>

                <div className="mt-2 space-y-1 ">
                  {product.discount_price ? (
                    <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-x-4 ">
                      <div className="flex items-center gap-2">
                        <p className="text-2xl sm:text-xl font-bold text-red-600">
                          ৳ {parseFloat(product.discount_price).toFixed(2)}
                        </p>
                      </div>{" "}
                      <p className="text-xl text-gray-500 line-through">
                        ৳ {parseFloat(product.base_price).toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-center text-2xl font-bold text-gray-800">
                      ৳ {parseFloat(product.base_price).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
              {product.discount_price &&
                product.base_price > product.discount_price && (
                  <span className="absolute top-4 right-4 text-xl bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                    {Math.round(
                      ((product.base_price - product.discount_price) /
                        product.base_price) *
                        100
                    )}
                    % off
                  </span>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsRelated;
