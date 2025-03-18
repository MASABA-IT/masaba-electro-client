import React, { useEffect, useState } from "react";

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
  const [visibleItems, setVisibleItems] = useState([]);

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleItems((prev) => [...prev, entry.target.id]);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1, // 10% of the item should be visible
    });

    const items = document.querySelectorAll(".item-card");
    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="home_recommendedItems w-full rounded-lg">
      <h2 className="mb-4">Recommended Items</h2>

      <div className="grid">
        {recommendedItems.map((item) => (
          <div
            key={item.id}
            id={`item-${item.id}`}
            className={`item-card ${
              visibleItems.includes(`item-${item.id}`) ? "fade-in" : ""
            }`}
          >
            <div>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full object-cover rounded-md"
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
