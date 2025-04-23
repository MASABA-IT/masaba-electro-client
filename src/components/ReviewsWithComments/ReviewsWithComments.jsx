import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import ReviewSection from "../ReviewSection/ReviewSection";
import CommentSection from "../CommentSection/CommentSection";

const ReviewsWithComments = ({ product }) => {
  return (
    <div className="reviewsWithComments col-start-2 col-end-10 space-y-10">
      {product?.reviews?.data?.length > 0 && (
        <ReviewSection product={product} />
      )}
      <CommentSection  product={product}/>
    </div>
  );
};

export default ReviewsWithComments;
