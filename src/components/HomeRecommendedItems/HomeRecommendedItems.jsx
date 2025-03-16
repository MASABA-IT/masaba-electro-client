import React from "react";

const recommendedItems = [
  { id: 1, title: "Smart Watch", price: "$199.99", imageUrl: "/src/assets/imgs/reItem1.png" },
  { id: 2, title: "Wireless Headphones", price: "$129.99", imageUrl: "/src/assets/imgs/reItem2.png" },
  { id: 3, title: "Gaming Mouse", price: "$49.99", imageUrl: "/src/assets/imgs/reItem3.png" },
  { id: 4, title: "Mechanical Keyboard", price: "$89.99", imageUrl: "/src/assets/imgs/reItem4.png" },
  { id: 5, title: "Bluetooth Speaker", price: "$79.99", imageUrl: "/src/assets/imgs/reItem5.png" },
  { id: 6, title: "Laptop Stand", price: "$39.99", imageUrl: "/src/assets/imgs/reItem6.png" },
  { id: 7, title: "Smartphone Tripod", price: "$29.99", imageUrl: "/src/assets/imgs/reItem7.png" },
  { id: 8, title: "USB-C Hub", price: "$59.99", imageUrl: "/src/assets/imgs/reItem8.png" },
  { id: 9, title: "Portable SSD", price: "$149.99", imageUrl: "/src/assets/imgs/reItem9.png" },
  { id: 10, title: "Noise-Canceling Earbuds", price: "$99.99", imageUrl: "/src/assets/imgs/reItem10.png" },
];

const HomeRecommendedItems = () => {
  return (
    <div className="home_recommendedItems w-full p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Recommended Items
      </h2>

      <div className="grid grid-cols-5 gap-4">
        {recommendedItems.map((item, index) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            style={{
              animation: `fadeIn 0.5s ease ${index * 0.1}s forwards`,
              opacity: 0,
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full   object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
            <p className="text-blue-600 font-bold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeRecommendedItems;
