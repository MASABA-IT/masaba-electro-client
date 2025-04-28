import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import image1 from "../../assets/imgs/bgImgOne.png";
import image2 from "../../assets/imgs/bgImgOne.png";
import image3 from "../../assets/imgs/bgImgOne.png";

const demoProducts = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    title: "Apple Smartphone",
    price: "$999",
    image: image1,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    title: "Samsung Flagship Phone",
    price: "$849",
    image: image2,
    rating: 4.0,
  },
  {
    id: 3,
    name: "Sony WH-1000XM4",
    title: "Noise Cancelling Headphones",
    price: "$349",
    image: image3,
    rating: 4.8,
  },
  // Add more data for testing
  {
    id: 4,
    name: "Google Pixel 6",
    title: "Google Smartphone",
    price: "$699",
    image: image1,
    rating: 4.2,
  },
  {
    id: 5,
    name: "MacBook Pro 14",
    title: "Apple Laptop",
    price: "$1799",
    image: image2,
    rating: 4.7,
  },
  {
    id: 6,
    name: "AirPods Pro",
    title: "Apple Wireless Earbuds",
    price: "$249",
    image: image3,
    rating: 4.5,
  },
  // Add more than 20 products for pagination testing
  {
    id: 7,
    name: "Sony Xperia 5",
    title: "Flagship Sony Phone",
    price: "$899",
    image: image1,
    rating: 4.4,
  },
  {
    id: 8,
    name: "Samsung Galaxy S23",
    title: "Samsung Flagship Phone",
    price: "$849",
    image: image2,
    rating: 4.0,
  },
  {
    id: 9,
    name: "Sony WH-1000XM4",
    title: "Noise Cancelling Headphones",
    price: "$349",
    image: image3,
    rating: 4.8,
  },
  // Add more data for testing
  {
    id: 10,
    name: "Google Pixel 6",
    title: "Google Smartphone",
    price: "$699",
    image: image1,
    rating: 4.2,
  },
  {
    id: 11,
    name: "MacBook Pro 14",
    title: "Apple Laptop",
    price: "$1799",
    image: image2,
    rating: 4.7,
  },
  {
    id: 12,
    name: "AirPods Pro",
    title: "Apple Wireless Earbuds",
    price: "$249",
    image: image3,
    rating: 4.5,
  },
  // Add more than 20 products for pagination testing
  {
    id: 13,
    name: "Sony Xperia 5",
    title: "Flagship Sony Phone",
    price: "$899",
    image: image1,
    rating: 4.4,
  },
];

const WishlistProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate the start and end index of the products to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = demoProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(demoProducts.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="wishlist_content">
      <h1 className="text-3xl font-bold my-4">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-md transition p-4 flex items-center bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover mb-4"
            />
            <div className="ml-4">
              <h2 className="text-2xl font-semibold mb-1">{product.name}</h2>
              <p className="text-gray-500 text-xl mb-1">{product.title}</p>
              <p className="text-blue-600 font-bold mb-2">{product.price}</p>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-yellow-400 text-xl ${
                      index < Math.floor(product.rating) ? "" : "opacity-30"
                    }`}
                  />
                ))}
                <span className="ml-2 text-xl text-gray-600">
                  {product.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-l-lg"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-4 py-2 text-xl">{`${currentPage} of ${totalPages}`}</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WishlistProducts;
