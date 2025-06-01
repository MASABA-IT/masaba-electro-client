import React, { useEffect, useState } from "react";
import { useProductStore } from "../../providers/AppProviders";
import { useNavigate } from "react-router-dom";

const HomeRecommendedItems = () => {
  const navigate = useNavigate();
  const { recommendedViewsData, BASE_URL } = useProductStore();

  const [visibleItems, setVisibleItems] = useState([]);
  // const [loading, setLoading] = useState(true);
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
  }, [recommendedViewsData]);
  const handleProductClick = (itemId) => {
    navigate(`/categories/product/${itemId}`);
  };

  return (
    <div
      className="home_recommendedItems w-full rounded-lg"
      style={{ display: recommendedViewsData.length !== 0 ? "block" : "none" }}
    >
      <h2 className="mb-4 text-2xl sm:text-3xl">Recommended Items</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendedViewsData.map((item) => (
          <div
            key={item.id}
            id={`item-${item.id}`}
            className={`item-card bg-white rounded-lg overflow-hidden shadow-md  hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
              visibleItems.includes(`item-${item.id}`) ? "fade-in" : ""
            }`}
            onClick={() => handleProductClick(item.id)}
          >
            <div className="aspect-w-1 aspect-h-1 flex justify-center items-center">
              <img
                src={`${BASE_URL}/${item.thumbnail}`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <div className="mt-2 text-xl font-semibold text-green-600">
                {item.discount_price ? (
                  <>
                    <span className="text-orange-400 text-2xl">
                      ৳ {parseFloat(item.discount_price).toFixed(2)}
                    </span>
                    <span className="text-gray-500 line-through ml-2 text-lg">
                      ৳ {parseFloat(item.base_price).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span>৳ {parseFloat(item.base_price).toFixed(2)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeRecommendedItems;
