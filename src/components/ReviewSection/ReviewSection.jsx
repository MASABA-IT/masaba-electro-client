import React, { useState } from "react";
import { useProductStore } from "../../providers/AppProviders";
import { FaRegStar, FaStar } from "react-icons/fa";

const ReviewSection = ({ product }) => {
  const { name: userName } = useProductStore();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (userName && rating && reviewText.trim()) {
      console.log("Submit review:", {
        user: userName,
        rating,
        review: reviewText,
        date: new Date(),
      });
      setRating(0);
      setReviewText("");
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 8;

  const totalPages = Math.ceil(product?.reviews?.length / reviewsPerPage);
  const paginatedReviews = product?.reviews?.data?.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div className="space-y-4">
      <div className="text-center relative p-6 max-w-3xl mx-auto rounded-xl   bg-white">
        {/* Title */}
        <h2 className="text-4xl font-extrabold tracking-wide text-yellow-400 uppercase mb-2">
          User Reviews
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl font-medium text-gray-600 mb-4">
          See what others are saying, and share your experience too!
        </p>
        {/* Star Row */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <FaStar className="text-yellow-400 text-5xl animate-ping-slow drop-shadow-lg" />
          <FaStar className="text-yellow-500 text-6xl animate-bounce drop-shadow-xl" />
          <FaStar className="text-yellow-400 text-5xl animate-ping-slow drop-shadow-lg" />
        </div>
        <div className="w-full h-[1rem] bg-yellow-400   my-4"></div>

        {/* Underline Bar */}
      </div>

      {/* Main Container: Flex for PC, Block for Mobile */}
      <div className="flex flex-col   gap-6">
        {/* Review Form */}
        {userName && (
          <div className="lg:w-[40%]  w-full bg-white p-4 rounded  ">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Add Your Review
            </h3>
            <form
              onSubmit={handleReviewSubmit}
              className="space-y-4 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => {
                  const star = i + 1;
                  return (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      {star <= (hoverRating || rating) ? (
                        <FaStar className="w-6 h-6" />
                      ) : (
                        <FaRegStar className="w-6 h-6" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Textarea */}
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                className="w-full border border-gray-300 outline-none rounded p-2 text-2xl"
                required
              />

              {/* Submit */}
              <button
                type="submit"
                className="bg-blue-600 text-2xl text-white px-4 py-2 rounded hover:bg-blue-700 w-fit self-end"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
        {/* Review List */}
        <div className="w-full xl:w-[90%] mx-auto flex-1 space-y-4">
          {paginatedReviews?.map((review, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                {/* User Avatar */}
                <div className="flex-shrink-0 w-10 h-10 p-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold text-lg shadow">
                  {review.user?.name?.charAt(0)}
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">
                      {review.user?.name}
                    </p>
                    <span className="text-xl italic text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 text-yellow-500 mt-1">
                    {[...Array(5)].map((_, i) =>
                      i < review.rating ? (
                        <FaStar key={i} />
                      ) : (
                        <FaRegStar key={i} />
                      )
                    )}
                  </div>

                  {/* Review Text */}
                  <p className="mt-2 text-gray-700 text-xl">{review.review}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 border-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentPage === i + 1
                    ? "bg-yellow-400 text-white border-yellow-400"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
