import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FaRegStar, FaStar } from "react-icons/fa";
const ProductInfoDescription = ({
  description,
  reviews = [],
  productData = [],
  items = [],
}) => {
  const [activeTab, setActiveTab] = useState(1);

  const contentVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
  };

  const hasDescription = !!description;
  const hasReviews = reviews.length > 0;

  const showTabs = hasDescription || hasReviews;

  return (
    <div className="productInfoSwitch text-2xl mr-4 md:p-6 bg-white">
      {/* Tabs */}
      {showTabs && (
        <div className="tabs border-b-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {hasDescription && (
            <button
              onClick={() => setActiveTab(1)}
              className={`px-4 py-2 ${
                activeTab === 1
                  ? "font-semibold border-b-2 border-stone-500"
                  : ""
              }`}
            >
              Description
            </button>
          )}
          {hasReviews && (
            <button
              onClick={() => setActiveTab(2)}
              className={`px-4 py-2 ${
                activeTab === 2
                  ? "font-semibold border-b-2 border-stone-500"
                  : ""
              }`}
            >
              Reviews
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="content text-base mt-4">
        <motion.div
          key={activeTab}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {activeTab === 1 && hasDescription && (
            <div
              className="description-area prose max-w-full"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {activeTab === 2 && hasReviews && (
            <div className="review-section space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md text-2xl shadow-sm bg-gray-50 space-y-2"
                >
                  {/* Header: Name (Left) + Date (Right) */}
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl text-gray-800">
                      {review.name}
                    </p>
                    <p className="text-xl italic text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  {/* Rating (Stars) */}

                  <p className="flex items-center gap-1 text-yellow-500 text-base">
                    {[...Array(5)].map((_, i) =>
                      i < review.rating ? (
                        <FaStar key={i} />
                      ) : (
                        <FaRegStar key={i} />
                      )
                    )}
                  </p>
                  {/* Comment */}
                  <p className="text-gray-700">{review.comment}</p>
                  {/* Optional: Location and Helpful Votes */}
                  <div className="text-sm text-gray-500 space-y-1">
                    {review.location && <p>Location: {review.location}</p>}
                    {review.helpfulVotes !== undefined && (
                      <p>👍 {review.helpfulVotes} people found this helpful</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Product Table */}
      {productData?.length > 0 && (
        <div className="table-section text-base mt-6">
          {productData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-2 border-b text-gray-700"
            >
              <div className="font-medium">{item.label}</div>
              <div>{item.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Feature List */}
      {items?.length > 0 && (
        <div className="right-click mt-6">
          <ul className="list-container space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <IoCheckmarkOutline className="text-gray-400 text-xl" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductInfoDescription;
