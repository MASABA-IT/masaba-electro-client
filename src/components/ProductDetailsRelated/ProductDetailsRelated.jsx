import React from "react";
import { useProductStore } from "../../providers/AppProviders";

const ProductDetailsRelated = ({ relatedProducts }) => {
  console.log(relatedProducts);
  const { BASE_URL } = useProductStore();
  const handleViewsDataClick = (id) => {
    window.location.href = `/categories/product/${id}`;
  };
  return (
    <div className="product-details-related bg-white my-5">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Related Products</h1>
        <div className="product-grid">
          {relatedProducts?.map((product, index) => (
            <div
              key={index}
              className="related_product-card cursor-pointer"
              onClick={() => handleViewsDataClick(product?.id)}
            >
              <div className="w-[100%] ">
                <img
                  src={`${BASE_URL}/${product.thumbnail}`}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <h2 className="product-name text-2xl">{product.title}</h2>
              <div className="space-y-1 min-h-[3.5rem] flex flex-col justify-start pl-4">
                {product.discount_price ? (
                  <>
                    <p className="text-sm line-through text-gray-500">
                      ৳ {parseFloat(product.base_price).toFixed(2)}
                    </p>
                    <p className="text-md font-bold text-red-600">
                      ৳ {parseFloat(product.discount_price).toFixed(2)}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm invisible">
                      ৳ {parseFloat(product.base_price).toFixed(2)}
                    </p>
                    <p className="text-md font-bold text-gray-800">
                      ৳ {parseFloat(product.base_price).toFixed(2)}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsRelated;
