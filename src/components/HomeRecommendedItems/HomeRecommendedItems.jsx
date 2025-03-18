import React from "react";

const recommendedItems = [
  {
    id: 1,
    title: "T-shirts with multiple colors, for men",
    price: "$199.99",
    imageUrl: "/src/assets/imgs/reItem1.png",
  },
  {
    id: 2,
    title: "Jeans shorts for men blue color",
    price: "$129.99",
    imageUrl: "/src/assets/imgs/reItem2.png",
  },
  {
    id: 3,
    title: "Brown winter coat medium size",
    price: "$49.99",
    imageUrl: "/src/assets/imgs/reItem3.png",
  },
  {
    id: 4,
    title: "Jeans bag for travel for men",
    price: "$89.99",
    imageUrl: "/src/assets/imgs/reItem4.png",
  },
  {
    id: 5,
    title: "Leather wallet",
    price: "$79.99",
    imageUrl: "/src/assets/imgs/reItem5.png",
  },
  {
    id: 6,
    title: "Canon camera black, 100x zoom",
    price: "$39.99",
    imageUrl: "/src/assets/imgs/reItem6.png",
  },
  {
    id: 7,
    title: "Headset for gaming with mic",
    price: "$29.99",
    imageUrl: "/src/assets/imgs/reItem7.png",
  },
  {
    id: 8,
    title: "Smartwatch silver color modern",
    price: "$59.99",
    imageUrl: "/src/assets/imgs/reItem8.png",
  },
  {
    id: 9,
    title: "Blue wallet for men leather metarfial",
    price: "$149.99",
    imageUrl: "/src/assets/imgs/reItem9.png",
  },
  {
    id: 10,
    title: "Jeans bag for travel for men",
    price: "$99.99",
    imageUrl: "/src/assets/imgs/reItem10.png",
  },
];

const HomeRecommendedItems = () => {
  return (
    <div className="home_recommendedItems w-full rounded-lg  ">
      <h2 className="    mb-4">Recommended Items</h2>

      <div className="grid  ">
        {recommendedItems.map((item, index) => (
          <div
            key={item.id}
            className="item-card  "
            style={{
              animation: `fadeIn 0.5s ease ${index * 0.1}s forwards`,
              opacity: 0,
            }}
          >
            <div>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full   object-cover rounded-md"
              />
            </div>
            <p>{item.price}</p>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeRecommendedItems;
