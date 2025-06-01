import React, { useState, useRef, useEffect } from "react";
import { FaRegStar, FaStar, FaTimes, FaUpload } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";

const ReviewModal = ({
  orderDetails,
  userData,

  onReviewSubmit,
  orderId,
}) => {
  // State management
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showProductSelection, setShowProductSelection] = useState(true);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Ref for file input
  const fileInputRef = useRef(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages([...images, ...newImages]);
  };

  // Remove image from preview
  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Submit review form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedReview = reviewText.trim();

    // Validate required fields
    if (!rating || !trimmedReview || !selectedProductId || !orderId) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setIsUploading(true);
      console.log(selectedProductId, orderId, rating, trimmedReview);
      // Prepare form data
      let formData = new FormData();

      formData.append("product_id", selectedProductId);
      formData.append("order_id", orderId);
      formData.append("rating", rating);
      formData.append("review", trimmedReview);

      // Append images properly
      images.forEach((image) => {
        formData.append("images[]", image.file);
      });

      // To debug contents of formData:
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Submit to parent component
      await onReviewSubmit(formData);

      // Reset form on success
      setReviewText("");
      setSelectedProductId(null);
      setImages([]);
      setShowProductSelection(true);
      setIsOpen(false);

      // Success notification
      Swal.fire({
        icon: "success",
        title: "Review Submitted!",
        text: "✅ Thank you for your feedback!",
        confirmButtonText: "Close",
        customClass: {
          confirmButton:
            "bg-orange-400 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded shadow-md",
        },
        buttonsStyling: false,
      });
    } catch (error) {
      // Error notification
      console.error("Review submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message || "❌ Failed to submit review. Please try again.",
        confirmButtonText: "Okay",
        customClass: {
          confirmButton:
            "bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-md",
        },
        buttonsStyling: false,
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Select product to review
  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
    setShowProductSelection(false);
  };

  // Clean up image URLs when component unmounts
  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  return (
    <>
      {/* Review Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex justify-center items-center gap-x-2 text-xl sm:text-2xl border-2 px-2 py-1 bg-green-500 text-white rounded-xl"
      >
        <FaStar className="text-xl sm:text-2xl text-white" />
        <span>Review</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                {showProductSelection
                  ? "Select Product to Review"
                  : "Add Your Review"}
              </h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowProductSelection(true);
                  setSelectedProductId(null);
                  setImages([]);
                }}
                className="text-gray-500 text-2xl transform transition-transform duration-300 ease-out hover:text-red-500 hover:scale-125"
              >
                ✕
              </button>
            </div>

            {/* Product Selection Screen */}
            {showProductSelection ? (
              <div className="space-y-4">
                <p className="text-gray-600 mb-4 text-2xl">
                  Which product would you like to review?
                </p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {orderDetails.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleProductSelect(item.product_id)}
                      className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex justify-between items-center"
                    >
                      <span className="text-lg">
                        Product: {item.product.title}
                      </span>
                      <IoIosArrowForward />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Review Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Being Reviewed */}
                <div className="flex items-center gap-2 text-xl text-gray-600 mb-2">
                  <span>Reviewing Product:</span>
                  <span className="font-medium">
                    {orderDetails.find(
                      (item) => item.product_id === selectedProductId
                    )?.product?.title || `Product ${selectedProductId}`}
                  </span>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 text-yellow-500 text-2xl">
                  {[...Array(5)].map((_, i) => {
                    const star = i;
                    return (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                      >
                        {star <= (hoverRating || rating) ? (
                          <FaStar className="transition-transform hover:scale-110" />
                        ) : (
                          <FaRegStar className="transition-transform hover:scale-110" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Review Text */}
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full border border-gray-300 rounded p-3 h-32 text-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />

                {/* Image Upload Section */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center text-lg gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
                  >
                    <FaUpload />
                    <span>Upload Images</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      multiple
                      accept="image/*"
                    />
                  </button>

                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image.preview}
                            alt={`Preview ${index}`}
                            className="w-full h-36 object-cover rounded border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FaTimes className="text-lg" />
                          </button>
                          <p className="text-sm truncate mt-1">{image.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-between text-lg">
                  <button
                    type="button"
                    onClick={() => setShowProductSelection(true)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    ← Back to products
                  </button>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setShowProductSelection(true);
                        setImages([]);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading}
                      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                        isUploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isUploading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewModal;
