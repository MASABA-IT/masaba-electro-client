import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useProductStore } from "../../providers/AppProviders";

// CollectionItem Component (each item in a collection)
const CollectionItem = ({ item }) => {
  const { BASE_URL } = useProductStore();
  const [imgLoaded, setImgLoaded] = useState(false); // renamed for clarity

  const hasDiscount =
    item.discount_price &&
    parseFloat(item.discount_price) < parseFloat(item.base_price);

  return (
    <div className="collection-item relative p-4 bg-white rounded shadow min-h-[130px]">
      {/* Always render image to let it load */}
      <img
        src={`${BASE_URL}/${item.thumbnail}`}
        alt={item.title}
        className="hidden"
        onLoad={() => setImgLoaded(true)}
      />

      {!imgLoaded ? (
        // 🔄 Show Pulse Skeleton while waiting for image
        <div className="animate-pulse space-y-3">
          <div className="h-6 bg-gray-300 rounded w-3/4" /> {/* Title */}
          <div className="flex gap-3">
            <div className="h-5 w-20 bg-gray-300 rounded" />{" "}
            {/* Discount price */}
            <div className="h-5 w-16 bg-gray-200 rounded" />{" "}
            {/* Original price */}
          </div>
          <div className="absolute right-2 bottom-6 h-20 w-20 bg-gray-200 rounded" />
        </div>
      ) : (
        // ✅ Real Content after image is loaded
        <>
          <div className="item-info space-y-2">
            <h4 className="text-lg md:text-2xl font-serif">{item.title}</h4>

            {hasDiscount ? (
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <p className="text-red-400 font-bold text-2xl">
                  {parseInt(item.discount_price)}&nbsp;৳
                </p>
                <p className="text-gray-400 line-through text-lg">
                  {parseInt(item.base_price)}&nbsp;৳
                </p>
              </div>
            ) : (
              <p className="text-zinc-600 font-semibold text-2xl font-mono">
                {parseInt(item.base_price)}&nbsp;৳
              </p>
            )}
          </div>

          <div className="item-image absolute right-2 bottom-6 h-20 w-20 overflow-hidden rounded">
            <img
              src={`${BASE_URL}/${item.thumbnail}`}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
        </>
      )}
    </div>
  );
};
const Collection = ({ collection }) => {
  const { BASE_URL } = useProductStore();

  // Group the items into two rows, each containing 4 items
  const rows = [];
  for (let i = 0; i < collection?.limited_products.length; i += 4) {
    rows.push(collection?.limited_products.slice(i, i + 4));
  }

  return (
    <div key={collection.id} className="collection-section shadow-sm ">
      <div className="block md:hidden p-4 bg-white">
        <h2 className="text-xl font-semibold">{collection.title}</h2>
      </div>
      <div
        className="collection-left hidden md:block"
        style={{
          backgroundImage: `url(${BASE_URL}/${collection?.thumbnail})`,
          backgroundSize: "cover", // use cover for full coverage while maintaining aspect ratio
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
        }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold">
          {collection.title}
        </h2>
        <button className="w-60 bg-white px-8 mt-4 py-4 rounded-lg text-2xl font-semibold text-gray-600 transition duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 hover:scale-105 active:scale-95">
          Source Now
        </button>
      </div>

      <div className="collection-right">
        {/* MOBILE FOR 1 ROW */}
        {window.innerWidth < 768 ? (
          <div className="collection-row">
            {collection?.limited_products.map((item) => (
              <CollectionItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          // DESKTOP FOR 4 CARDS
          rows.map((row, rowIndex) => (
            <div key={rowIndex} className="collection-row">
              {row.map((item) => (
                <CollectionItem key={item.id} item={item} />
              ))}
            </div>
          ))
        )}
      </div>

      <button className="w-60  flex justify-center items-center gap-2 md:hidden   px-8 py-4 rounded-lg text-xl font-semibold text-blue-500 transition duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 hover:scale-105 active:scale-95">
        Source Now <FaArrowRight />
      </button>
    </div>
  );
};

// Main AllCollections Component
const AllCollections = () => {
  const { collections, loading } = useProductStore();

  return (
    <div className="all-collections">
      {collections?.collectionWithAllProducts?.map((collection) => (
        <Collection key={collection.id} collection={collection} />
      ))}
    </div>
  );
};

export default AllCollections;
