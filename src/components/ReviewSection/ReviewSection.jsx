import React, { useEffect, useState, useCallback } from "react";
import { useProductStore } from "../../providers/AppProviders";
import { FaRegStar, FaStar } from "react-icons/fa";
import Pagination from "../Pagination/Pagination";
import Swal from "sweetalert2";

const ReviewSection = ({ product }) => {
  const { BASE_URL, userData } = useProductStore();
  const [rating, setRating] = useState(4);
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

  // Fetch reviews with useCallback to prevent unnecessary recreations
  const fetchReviews = useCallback(
    async (page = 1) => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/product/view/${product.id}?page=${page}`
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
        Swal.fire({
          icon: "error",
          title: "Failed to load reviews",
          text: "Please try again later",
          confirmButtonText: "Okay",
        });
      }
    },
    [BASE_URL, product.id]
  );

  useEffect(() => {
    if (product?.id) {
      fetchReviews(currentPage);
    }
  }, [product?.id, currentPage, fetchReviews]);

  const submitReview = async ({ productId, rating, reviewText }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          rating,
          review: reviewText,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }

      return await response.json();
    } catch (error) {
      console.error("Review submission error:", error);
      throw error;
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const trimmedReview = reviewText.trim();

    if (!rating || !trimmedReview) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Review",
        text: "Please provide both a rating and review text",
        confirmButtonText: "Got it",
      });
      return;
    }

    try {
      await submitReview({
        productId: product.id,
        rating,
        reviewText: trimmedReview,
      });

      setReviewText("");
      setRating(4);
      fetchReviews(1);

      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your review has been submitted successfully",
        confirmButtonText: "Close",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Failed to submit review. Please try again.",
        confirmButtonText: "Okay",
      });
    }
  };

  // ReviewItem component for better separation of concerns
  const ReviewItem = ({ review }) => {
    const [mainImageIndex, setMainImageIndex] = useState(0);

    return (
      <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full border border-orange-300 bg-orange-200 text-stone-600 flex items-center justify-center font-bold text-lg"
            style={{ textShadow: "0px 2px 3px orange" }}
          >
            {review.user?.name?.charAt(0)}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center flex-wrap sm:flex-row">
                <p className="font-semibold text-gray-800">
                  {review.user?.name}
                </p>
                {review.status === "approved" && (
                  <span className="ml-2 text-lg bg-green-100 text-green-800 px-2 py-1 rounded">
                    Verified Purchase
                  </span>
                )}
              </div>
              <span className="text-xl italic text-gray-500">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="flex gap-1 text-yellow-500 mt-1">
              {[...Array(5)].map((_, i) =>
                i < review.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
              )}
            </div>

            <p className="mt-2 text-gray-700">{review.review}</p>

            {review?.product_review_images?.length > 0 && (
              <div className="mt-4">
                <div className="mb-3 p-1   w-full sm:w-1/4 rounded-lg overflow-hidden">
                  <img
                    src={`${BASE_URL}/${review?.product_review_images[mainImageIndex].image}`}
                    alt={`Review from ${review.user?.name}`}
                    className="w-full   h-64 object-contain bg-white  "
                    loading="lazy"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                  {review?.product_review_images.map((image, imgIndex) => (
                    <button
                      key={imgIndex}
                      onClick={() => setMainImageIndex(imgIndex)}
                      className={`flex-shrink-0 w-16 h-16 m-1 rounded border-2 transition-all ${
                        mainImageIndex === imgIndex
                          ? "border-green-500 scale-105"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      aria-label={`View image ${imgIndex + 1}`}
                    >
                      <img
                        src={`${BASE_URL}/${image.image}`}
                        alt={`Thumbnail ${imgIndex + 1}`}
                        className="w-full h-full object-cover "
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  console.log(reviews, "reviews");
  return (
    <div className="space-y-4">
      <div className="text-center p-6 max-w-3xl mx-auto rounded-xl bg-white">
        <h2 className="text-4xl font-extrabold tracking-wide text-yellow-400 uppercase mb-2">
          User Reviews
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-600 mb-4">
          See what others are saying, and share your experience too!
        </p>
        <div className="relative flex justify-center items-center gap-1 mb-6 py-4">
          <div className="absolute inset-0 bg-yellow-100/20 blur-xl rounded-full -z-10"></div>
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`relative transform transition-all duration-700 ${
                star === 3 ? "scale-125" : "scale-100"
              } hover:scale-150 hover:z-10`}
            >
              <FaStar
                className={`text-${
                  star === 3 ? "5xl" : star % 2 ? "4xl" : "3xl"
                } ${
                  star === 3
                    ? "text-yellow-500 drop-shadow-xl animate-float"
                    : "text-yellow-400/90 drop-shadow-lg animate-pulse-slow"
                } transition-colors duration-300`}
              />
              <div
                className={`absolute inset-0 rounded-full ${
                  star === 3
                    ? "bg-yellow-400/30 animate-glow"
                    : "bg-yellow-300/20"
                } -z-10 blur-md`}
              ></div>
            </div>
          ))}
        </div>
        <div className="w-full h-[.5rem] bg-yellow-400 my-4"></div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Review Form (currently hidden) */}
        <div className="lg:w-[40%] w-full bg-white p-4 rounded hidden">
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
                    aria-label={`Rate ${star} out of 5`}
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
              rows="4"
            />

            <button
              type="submit"
              className="bg-blue-600 text-2xl text-white px-4 py-2 rounded hover:bg-blue-700 w-fit self-end transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="w-full xl:w-[90%] mx-auto flex-1 space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No reviews yet. Be the first to review!
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.last_page > 1 && (
          <Pagination
            currentPage={currentPage}
            lastPage={pagination.last_page}
            hasPrev={!!pagination.prev_page_url}
            hasNext={!!pagination.next_page_url}
            onPageChange={(page) => setCurrentPage(page)}
            primaryColor="yellow"
          />
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
