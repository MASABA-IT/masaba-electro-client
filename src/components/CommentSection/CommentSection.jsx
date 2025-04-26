import React, { useEffect, useState } from "react";
import { useProductStore } from "../../providers/AppProviders";
import { FaCircleUser } from "react-icons/fa6";
import Pagination from "../Pagination/Pagination";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CommentSection = ({ product }) => {
  const { BASE_URL, postComment } = useProductStore();
  const [allComments, setAllComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
  });
  const [formData, setFormData] = useState({
    product_id: null,
    username: "",
    email: "",
    phone_number: "",
    comment: "",
  });

  const fetchComments = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/product/view/${product.id}?page=${page}`
      );
      const data = await res.json();
      setComments(data.productArray.comments.data);
      setPagination({
        current_page: data.productArray.comments.current_page,
        last_page: data.productArray.comments.last_page,
        next_page_url: data.productArray.comments.next_page_url,
        prev_page_url: data.productArray.comments.prev_page_url,
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const { username, email, comment, phone_number } = formData;
    console.log(comment.trim());
    if (comment.trim()) {
      try {
        console.log(formData);
        const result = await postComment({
          product_id: product.id,
          comment,
          phone_number,
          username,
          email,
        });
        console.log("Comment posted successfully:", result);
        setFormData({
          product_id: null,
          username: "",
          email: "",
          phone_number: "",
          comment: "",
        });

        setCurrentPage(1);
        fetchComments(1);
      } catch (error) {
        alert("Failed to submit comment: " + error.message);
      }
    }
  };

  useEffect(() => {
    if (product?.id) {
      fetchComments(currentPage);
    }
  }, [product?.id, currentPage]);

  return (
    <div className="w-full space-y-4 xl:px-4">
      <h3 className="text-3xl font-semibold text-gray-800 mb-2">
        Leave a Comment
      </h3>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Form - Fixed height container */}
        <div className="bg-white p-8 rounded-xl border shadow-sm border-gray-200">
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            {
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="text-gray-700 text-2xl mb-1 block">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    placeholder="John Doe"
                    className="w-full p-4 text-xl rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-gray-700 text-2xl mb-1 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@example.com"
                    className="w-full p-4 text-xl rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="md:col-span-2">
                  <label className="text-gray-700 text-2xl mb-1 block">
                    Phone Number (optional)
                  </label>

                  {/* Responsive container controls actual width */}
                  <div className="w-[98%] sm:w-[96%] md:w-full">
                    <PhoneInput
                      country={"bd"}
                      value={formData.phoneNumber}
                      onChange={(phone) =>
                        setFormData({ ...formData, phone_number: phone })
                      }
                      inputStyle={{
                        width: "100%",
                        padding: "1rem",
                        fontSize: "1.1rem",
                        borderRadius: "0.5rem",
                        backgroundColor: "#f9fafb",
                        border: "1px solid #d1d5db",
                      }}
                      containerStyle={{ width: "100%" }} // this matches parent div's width!
                    />
                  </div>
                </div>
              </div>
            }

            {/* Comment */}
            <div>
              <label className="text-gray-700 text-2xl mb-1 block">
                Your Comment
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                placeholder="Write your thoughts here..."
                className="w-full p-5 text-xl rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none min-h-[150px] transition"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 outline-none text-white text-2xl font-medium px-6 py-3 rounded-xl shadow-md transition duration-300 w-full md:w-fit"
              >
                Submit Comment
              </button>
            </div>
          </form>
        </div>

        {/* Comments Section - Fixed height container with scroll */}
        <div className=" bg-white p-6 rounded-xl border shadow-sm border-gray-200 flex flex-col">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Comments ({comments.length || 0})
          </h3>

          <div className="flex-1 overflow-y-auto space-y-4 h-auto lg:min-h-[400px]">
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-6 border border-gray-200 rounded-xl bg-white shadow-sm"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="flex-1 space-y-3 py-1">
                      <div className="h-6 bg-gray-200 rounded w-1/3" />
                      <div className="h-6 bg-gray-200 rounded w-full" />
                      <div className="h-6 bg-gray-200 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : comments.length > 0 ? (
              comments.map((c) => (
                <div
                  key={c.id}
                  className="bg-gray-50 p-4 rounded shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <FaCircleUser className="w-10 h-10 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline flex-wrap gap-2">
                        <p className="font-medium text-xl text-gray-700 truncate">
                          {c.username}
                        </p>
                        <span className="text-xl text-gray-500 whitespace-nowrap">
                          {new Date(c.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-lg mt-1 break-words">
                        {c.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-xl text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>

          {/* Pagination - Fixed at bottom */}
          {pagination.last_page > 1 && (
            <Pagination
              currentPage={currentPage}
              lastPage={pagination.last_page}
              hasPrev={!!pagination.prev_page_url}
              hasNext={!!pagination.next_page_url}
              onPageChange={(page) => setCurrentPage(page)}
              primaryColor="green"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
