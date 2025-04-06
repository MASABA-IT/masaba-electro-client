import React from "react";

const ProductDetailsRelated = () => {
  const products = [
    {
      name: "Xiaomi Realme 8",
      originalPrice: "$234",
      discountedPrice: "$199",
      imageUrl: "/src/assets/imgs/imgm-6.webp",
    },
    {
      name: "Samsung Galaxy S21",
      originalPrice: "$999",
      discountedPrice: "$899",
      imageUrl: "/src/assets/imgs/imgm-5.jpeg",
    },
    {
      name: "Apple iPhone 13",
      originalPrice: "$1099",
      discountedPrice: "$999",
      imageUrl: "/src/assets/imgs/imgm-3.webp",
    },
    {
      name: "Xiaomi Realme 8",
      originalPrice: "$234",
      discountedPrice: "$199",
      imageUrl: "/src/assets/imgs/imgm-3.jpg",
    },
    {
      name: "Samsung Galaxy S21",
      originalPrice: "$999",
      discountedPrice: "$899",
      imageUrl: "/src/assets/imgs/imgm-5.jpeg",
    },
    {
      name: "Apple iPhone 13",
      originalPrice: "$1099",
      discountedPrice: "$999",
      imageUrl: "/src/assets/imgs/imgm-6.webp",
    },
    // Add more products as needed
  ];

  return (
    <div className="product-details-related bg-white my-5">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Related Products</h1>
        <div className="product-grid">
          {products.map((product, index) => (
            <div key={index} className="related_product-card">
              <div className="w-[100%] ">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <h2 className="product-name text-2xl">{product.name}</h2>
              <p className="original-price text-xl">{product.originalPrice}</p>
              <p className="discounted-price">{product.discountedPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsRelated;
