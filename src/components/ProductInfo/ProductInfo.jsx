import React, { useState } from "react";
import { IoCheckmark, IoClose, IoCloseSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { CgComment } from "react-icons/cg";
import { MdOutlineShoppingBasket } from "react-icons/md";
import StarRating from "../StarRating/StarRating";
import { useProductStore } from "../../providers/AppProviders";
function getAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const approvedReviews = reviews.filter((r) => r.status === "approved");
  if (approvedReviews.length === 0) return 0;
  const total = approvedReviews.reduce((sum, r) => sum + r.rating, 0);
  return total / approvedReviews.length;
}

const ProductInfo = ({ product }) => {
  const { BASE_URL } = useProductStore();
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  if (!product) return null;

  const categoryBook =
    product?.category?.title?.trim()?.toLowerCase() === "book";

  const reviews = product.reviews?.data || [];

  // Calculate average rating from approved reviews
  const avgRating = getAverageRating(reviews);

  return (
    <div className="product_info md:px-4 xl:px-10 py-2 mt-10 md:mt-0 xl:mt-0">
      {/* Stock Status */}
      <p className="flex justify-start items-center text-xl">
        {product?.stocks?.[0]?.quantity > 0 ? (
          <>
            <IoCheckmark className="text-3xl text-green-400" />
            In Stock
          </>
        ) : (
          <>
            <IoClose className="text-3xl text-red-400" />
            Out of Stock
          </>
        )}
      </p>

      {/* Title and Subtitle */}
      <h2 className="text-2xl xl:text-3xl font-medium font-sans ">
        {product?.title && <span>{product.title}</span>}
        {product?.subtitle && (
          <>
            &nbsp;<span>{product.subtitle}</span>
          </>
        )}
        {product?.features?.length > 0 && (
          <div className="mt-2">
            {product.features.map((feature, index) => (
              <span key={index} className="inline-block mr-2">
                {feature}
              </span>
            ))}
          </div>
        )}
      </h2>

      {/* Rating, Reviews, Sold */}
      <div className="text-2xl flex flex-wrap gap-x-4 items-center text-gray-600 mt-2">
        <div className="flex items-center gap-x-1">
          <StarRating rating={avgRating} />
          <span className="text-orange-300">{avgRating.toFixed(1)}</span>
        </div>

        {reviews.length > 0 && (
          <>
            <GoDotFill className="text-gray-300 text-xl" />
            <div className="flex items-center gap-x-1">
              <CgComment />
              <span>{reviews.length} Reviews</span>
            </div>
          </>
        )}

        <>
          <GoDotFill className="text-gray-300 text-xl" />
          <div className="flex items-center gap-x-1">
            <MdOutlineShoppingBasket />
            <span>{product.sold || 0} sold</span>
          </div>
        </>
      </div>
      {categoryBook && product?.pdf_file && (
        <div className="mt-4 flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2">
          <p className="text-xl sm:text-2xl">
            এই বই সম্পর্কে আরেকটু ধারণা পাবার জন্য{" "}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            একটু পড়ুন
          </button>
        </div>
      )}

      {/* PDF Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "90%",
              width: "800px",
              height: "90vh",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                fontSize: "3rem",
                color: "red",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                cursor: "pointer",
                transform: hovered ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              <IoCloseSharp />
            </button>

            <iframe
              src={`${BASE_URL}/${product?.pdf_file}#toolbar=0&navpanes=0&scrollbar=0`}
              title="PDF Preview"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}

      {/* Price / Brand / Material / Warranty */}
      <div className="px-4 py-6 text-[1.6rem] bg-white rounded-2xl mt-6">
        {product?.base_price && (
          <div
            className={`flex ${
              !categoryBook ? "justify-between" : "justify-start gap-x-4"
            } items-center ${
              !categoryBook ? "border-b" : "border-t"
            } border-gray-100 py-3`}
          >
            <span className="text-gray-500 font-medium">Price:</span>
            <span className="text-gray-900 font-semibold">
              ৳ {parseFloat(product.base_price)}
            </span>
          </div>
        )}

        {product?.brand?.name && !categoryBook && (
          <div className="flex justify-between items-center border-b border-gray-100 py-3">
            <span className="text-gray-500 font-medium">Brand:</span>
            <span className="text-gray-800">{product.brand.name}</span>
          </div>
        )}

        {product?.material && !categoryBook && (
          <div className="flex justify-between items-center border-b border-gray-100 py-3">
            <span className="text-gray-500 font-medium">Material:</span>
            <span className="text-gray-800">{product.material}</span>
          </div>
        )}

        {product?.warranty && !categoryBook && (
          <div className="flex justify-between items-center py-3   ">
            <span className="text-gray-500 font-medium">Warranty:</span>
            <span className="text-gray-800">{product.warranty} year(s)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
