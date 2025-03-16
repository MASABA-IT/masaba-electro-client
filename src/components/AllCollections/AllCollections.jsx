import React, { useState, useEffect } from "react";

// CollectionItem Component (each item in a collection)
const CollectionItem = ({ item }) => (
  <div key={item.id} className="collection-item relative ">
    <div className="item-info">
      <h4 className="text-xl md:text-3xl">{item.title}</h4>
      <p className="price">
        From <br /> USD {item.price}
      </p>
    </div>
    <div className="item-image absolute right-2 bottom-6">
      <img src={item.imageUrl} alt={item.title} />
    </div>
  </div>
);
const Collection = ({ collection }) => {
  // Group the items into two rows, each containing 4 items
  const rows = [];
  for (let i = 0; i < collection.items.length; i += 4) {
    rows.push(collection.items.slice(i, i + 4));
  }

  return (
    <div key={collection.id} className="collection-section shadow-sm">
      <div
        className="collection-left"
        style={{
          backgroundImage: `url(${collection.bgImg})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-2xl md:text-4xl font-semibold">
          {collection.title}
        </h2>
        <button className="w-60 bg-white px-8 py-4 rounded-lg text-2xl font-semibold text-gray-600 transition duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 hover:scale-105 active:scale-95">
          Source Now
        </button>
      </div>

      <div className="collection-right">
        {/* Render rows */}
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="collection-row">
            {/* Render items in each row */}
            {row.map((item) => (
              <CollectionItem key={item.id} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main AllCollections Component
const AllCollections = () => {
  const [collectionsData, setCollectionsData] = useState([]);

  useEffect(() => {
    // Example data, replace with your actual API data
    setCollectionsData([
      {
        id: 1,
        title: "Home and Outdoor",
        bgImg: "/src/assets/imgs/bgImgOne.png",
        items: [
          {
            id: 1,
            title: "Winter Coat",
            price: 49.99,
            imageUrl: "/src/assets/imgs/item1.png",
          },
          {
            id: 2,
            title: "Snow Boots",
            price: 39.99,
            imageUrl: "/src/assets/imgs/item2.png",
          },
          {
            id: 3,
            title: "Scarf",
            price: 19.99,
            imageUrl: "/src/assets/imgs/item3.png",
          },
          {
            id: 4,
            title: "Gloves",
            price: 14.99,
            imageUrl: "/src/assets/imgs/item4.png",
          },
          {
            id: 5,
            title: "Winter Coat",
            price: 49.99,
            imageUrl: "/src/assets/imgs/item5.png",
          },
          {
            id: 6,
            title: "Snow Boots",
            price: 39.99,
            imageUrl: "/src/assets/imgs/item6.png",
          },
          {
            id: 7,
            title: "Scarf",
            price: 19.99,
            imageUrl: "/src/assets/imgs/item7.png",
          },
          {
            id: 8,
            title: "Gloves",
            price: 14.99,
            imageUrl: "/src/assets/imgs/item8.png",
          },
        ],
      },
      {
        id: 2,
        title: "Consumer electronics and gadgets",
        bgImg: "/src/assets/imgs/bgImgTwo.png",
        items: [
          {
            id: 9,
            title: "Sunglasses",
            price: 29.99,
            imageUrl: "/src/assets/imgs/item9.png",
          },
          {
            id: 10,
            title: "Beach Hat",
            price: 19.99,
            imageUrl: "/src/assets/imgs/item10.png",
          },
          {
            id: 11,
            title: "Flip Flops",
            price: 14.99,
            imageUrl: "/src/assets/imgs/item11.png",
          },
          {
            id: 12,
            title: "Towel",
            price: 24.99,
            imageUrl: "/src/assets/imgs/item12.png",
          },
          {
            id: 13,
            title: "Sunglasses",
            price: 29.99,
            imageUrl: "/src/assets/imgs/item13.png",
          },
          {
            id: 14,
            title: "Beach Hat",
            price: 19.99,
            imageUrl: "/src/assets/imgs/item14.png",
          },
          {
            id: 15,
            title: "Flip Flops",
            price: 14.99,
            imageUrl: "/src/assets/imgs/item15.png",
          },
          {
            id: 16,
            title: "Towel",
            price: 24.99,
            imageUrl: "/src/assets/imgs/item6.png",
          },
        ],
      },
    ]);
  }, []);

  return (
    <div className="all-collections">
      {collectionsData.map((collection) => (
        <Collection key={collection.id} collection={collection} />
      ))}
    </div>
  );
};

export default AllCollections;
