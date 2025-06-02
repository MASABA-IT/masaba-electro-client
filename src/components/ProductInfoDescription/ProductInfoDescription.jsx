import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FaRegStar, FaStar } from "react-icons/fa";
import Specifications from "../Specifications/Specifications";
import AuthorDetails from "../AuthorDetails/AuthorDetails";

const ProductInfoDescription = ({
  description,
  termsAndConditions,
  shipping,
  specifications,
  author,
  // reviews = [],
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
  const hasTermsAndConditions = !!termsAndConditions;
  const hasShipping = !!shipping;
  const hasSpecification = !!specifications;
  const hasAuthor = !!author;
  // const hasReviews = reviews.length > 0;

  const showTabs =
    hasDescription ||
    hasTermsAndConditions ||
    hasShipping ||
    hasSpecification ||
    hasAuthor;

  const tabRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
    5: useRef(null),
    // 6: useRef(null),
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    tabRefs[tabIndex]?.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  console.log("------------------");
  console.log(
    description,
    termsAndConditions,
    shipping,
    specifications,
    author
  );
  return (
    <div className="productInfoSwitch text-2xl mr-4 md:p-6">
      {/* Tabs */}
      {showTabs && (
        <div className="tabs border-b-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {hasDescription && (
            <button
              ref={tabRefs[1]}
              onClick={() => handleTabClick(1)}
              className={`px-4 py-2 ${
                activeTab === 1
                  ? "font-semibold border-b-2 border-stone-500"
                  : ""
              }`}
            >
              Description
            </button>
          )}
          {hasSpecification && (
            <button
              ref={tabRefs[2]}
              onClick={() => handleTabClick(2)}
              className={`px-4 py-2 ${
                activeTab === 2
                  ? "font-semibold border-b-2 border-stone-500"
                  : ""
              }`}
            >
              Specifications
            </button>
          )}
          {hasAuthor && (
            <button
              ref={tabRefs[3]}
              onClick={() => handleTabClick(3)}
              className={`px-4 py-2 ${
                activeTab === 3
                  ? "font-semibold border-b-2 border-stone-500"
                  : ""
              }`}
            >
              Author
            </button>
          )}
          {hasTermsAndConditions && (
            <button
              ref={tabRefs[4]}
              onClick={() => handleTabClick(4)}
              className={`px-4 py-2 ${
                activeTab === 4
                  ? "font-semibold border-b-2 border-stone-500"
                  : ""
              }`}
            >
              Terms & Conditions
            </button>
          )}
          {hasShipping && (
            <button
              ref={tabRefs[5]}
              onClick={() => handleTabClick(5)}
              className={`px-4 py-2 ${
                activeTab === 5
                  ? "font-semibold border-b-2 border-stone-500"
                  : ""
              }`}
            >
              Shipping
            </button>
          )}
          {/* {hasReviews && (
            <button
              ref={tabRefs[6]}
              onClick={() => handleTabClick(6)}
              className={`px-4 py-2 ${
                activeTab === 6
                  ? "font-semibold border-b-2 border-stone-500"
                  : ""
              }`}
            >
              Reviews ({reviews.length})
            </button>
          )} */}
        </div>
      )}

      {/* Content */}
      <div className="  text-base mt-4  ">
        <motion.div
          key={activeTab}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="text-2xl"
        >
          {activeTab === 1 && hasDescription && (
            <div
              className="description-area prose max-w-full"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          {activeTab === 2 && hasSpecification && (
            <Specifications specifications={specifications} />
          )}
          {activeTab === 3 && hasAuthor && <AuthorDetails author={author} />}
          {activeTab === 4 && hasTermsAndConditions && (
            <div
              className="description-area prose max-w-full"
              dangerouslySetInnerHTML={{ __html: termsAndConditions }}
            />
          )}
          {activeTab === 5 && hasShipping && (
            <div
              className="description-area prose max-w-full"
              dangerouslySetInnerHTML={{ __html: shipping }}
            />
          )}
          {/* {activeTab === 6 && hasReviews && (
            <div className="review-section space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white space-y-4 transition duration-300"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-xl text-gray-900">
                      {review?.user?.name}
                    </p>
                    <p className="text-xl text-gray-500 italic">
                      {(() => {
                        const rawDate = review?.created_at;
                        const date = new Date(rawDate);
                        const isValid = !isNaN(date.getTime());
                        const finalDate = isValid ? date : new Date();

                        return finalDate.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });
                      })()}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-yellow-500 text-xl">
                      {[...Array(5)].map((_, i) =>
                        i < review.rating ? (
                          <FaStar key={i} />
                        ) : (
                          <FaRegStar key={i} />
                        )
                      )}
                      <span className="text-gray-500 text-sm ml-2">
                        ({review.rating}/5)
                      </span>
                    </div>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      {review?.review}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500 space-y-1 border-t pt-3 mt-2">
                    {review.location && <p>📍 Location: {review.location}</p>}
                    {review.helpfulVotes !== undefined && (
                      <p>👍 {review.helpfulVotes} people found this helpful</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )} */}
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
