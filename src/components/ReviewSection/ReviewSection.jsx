import React, { useEffect, useState } from "react";
import { useProductStore } from "../../providers/AppProviders";
import { FaRegStar, FaStar } from "react-icons/fa";
import Pagination from "../Pagination/Pagination";

const ReviewSection = ({ product }) => {
  const { name: userName, BASE_URL } = useProductStore();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
  });

  const fetchReviews = async (page = 1) => {
    try {
      const res = await fetch(
        ` ${BASE_URL}/api/product/view/${product.id}?page=${page}`
      );
      const data = await res.json();
      setReviews(data.productArray.reviews.data);
      setPagination({
        current_page: data.productArray.reviews.current_page,
        last_page: data.productArray.reviews.last_page,
        next_page_url: data.productArray.reviews.next_page_url,
        prev_page_url: data.productArray.reviews.prev_page_url,
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (product?.id) {
      fetchReviews(currentPage);
    }
  }, [product?.id, currentPage]);

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

  return (
    <div className="space-y-4">
      <div className="text-center p-6 max-w-3xl mx-auto rounded-xl bg-white">
        <h2 className="text-4xl font-extrabold tracking-wide text-yellow-400 uppercase mb-2">
          User Reviews
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-600 mb-4">
          See what others are saying, and share your experience too!
        </p>
        <div className="flex justify-center items-center gap-4 mb-4">
          <FaStar className="text-yellow-400 text-5xl animate-ping-slow drop-shadow-lg" />
          <FaStar className="text-yellow-500 text-6xl animate-bounce drop-shadow-xl" />
          <FaStar className="text-yellow-400 text-5xl animate-ping-slow drop-shadow-lg" />
        </div>
        <div className="w-full h-[1rem] bg-yellow-400 my-4"></div>
      </div>

      <div className="flex flex-col gap-6">
        {userName && (
          <div className="lg:w-[40%] w-full bg-white p-4 rounded">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Add Your Review
            </h3>
            <form
              onSubmit={handleReviewSubmit}
              className="space-y-4 flex flex-col"
            >
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

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                className="w-full border border-gray-300 outline-none rounded p-2 text-2xl"
                required
              />

              <button
                type="submit"
                className="bg-blue-600 text-2xl text-white px-4 py-2 rounded hover:bg-blue-700 w-fit self-end"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        <div className="w-full xl:w-[90%] mx-auto flex-1 space-y-4">
          {reviews?.map((review, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold text-lg shadow">
                  {review.user?.name?.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">
                      {review.user?.name}
                    </p>
                    <span className="text-xl italic text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-1 text-yellow-500 mt-1">
                    {[...Array(5)].map((_, i) =>
                      i < review.rating ? (
                        <FaStar key={i} />
                      ) : (
                        <FaRegStar key={i} />
                      )
                    )}
                  </div>
                  <p className="mt-2 text-gray-700 text-xl">{review.review}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination-------- */}

        {pagination.last_page > 1 && (
          <Pagination
            currentPage={currentPage}
            lastPage={pagination.last_page}
            hasPrev={!!pagination.prev_page_url}
            hasNext={!!pagination.next_page_url}
            onPageChange={(page) => setCurrentPage(page)}
            primaryColor = "yellow" 
          />
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
