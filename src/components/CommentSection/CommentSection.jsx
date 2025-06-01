import React, { useEffect, useState } from "react";
import { useProductStore } from "../../providers/AppProviders";
import { FaCircleUser } from "react-icons/fa6";
import Pagination from "../Pagination/Pagination";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CommentSection = ({ product }) => {
  const { BASE_URL, postComment, userData } = useProductStore();
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

  // Reply state
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [replyData, setReplyData] = useState({
    productId: "",
    comment: "",
    phoneNumber: "",
    username: "",
    email: "",
    parentId: "",
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

    // Prevent empty comment submission
    if (!comment.trim()) {
      alert("Please write a comment.");
      return;
    }

    // Prepare payload conditionally based on login status
    const payload = {
      product_id: product.id,
      comment,
      phone_number,
      username: userData ? userData.user.name : username,
      email: userData ? userData.user.email : email,
      user_id: userData ? userData.user.userId : null,
    };
    console.log(payload, "payload");
    try {
      await postComment(payload);

      // Reset form only for guest users (logged-in users keep name/email readonly)
      setFormData({
        username: userData ? userData.user.name : "",
        email: userData ? userData.user.email : "",
        phone_number: "",
        comment: "",
      });

      setCurrentPage(1);
      fetchComments(1);
    } catch (error) {
      alert("Failed to submit comment: " + error.message);
    }
  };

  // const handleCommentSubmit = async (e) => {
  //   e.preventDefault();
  //   const { username, email, comment, phone_number } = formData;

  //   if (comment.trim()) {
  //     try {
  //       await postComment({
  //         product_id: product.id,
  //         comment,
  //         phone_number,
  //         username,
  //         email,
  //         user_id: userData.user.userId,
  //       });

  //       setFormData({
  //         product_id: null,
  //         username: "",
  //         email: "",
  //         phone_number: "",
  //         comment: "",
  //       });

  //       setCurrentPage(1);
  //       fetchComments(1);
  //     } catch (error) {
  //       alert("Failed to submit comment: " + error.message);
  //     }
  //   }
  // };

  const handleReplyClick = (commentData) => {
    const baseFormData = {
      productId: product.id,
      comment: "",
      phoneNumber: userData?.profile?.data?.phone_number || "",
      username: userData?.profile?.data?.name || "",
      email: userData?.profile?.data?.email || "",
      parentId: commentData.id,
    };

    if (!userData?.token) {
      setReplyData(baseFormData);
      setShowModal(true);
    } else {
      setReplyData({
        ...baseFormData,
        user_id: userData?.id,
      });
      setReplyingTo(commentData.id);
    }
  };

  const handleSendReply = async () => {
    if (!replyData.comment.trim()) {
      alert("Please enter a reply");
      return;
    }

    try {
      const replyPayload = {
        product_id: replyData.productId,
        comment: replyData.comment,
        phone_number: replyData.phoneNumber,
        username: replyData.username,
        email: replyData.email,
        parent_id: replyData.parentId,
      };

      if (userData?.token) {
        replyPayload.user_id = userData.user.userId;
      }
      console.log(replyPayload, "now -reply-");
      await postComment(replyPayload);

      // Reset states
      setReplyingTo(null);
      setReplyText("");
      setShowModal(false);
      setReplyData({
        productId: "",
        comment: "",
        phoneNumber: "",
        username: "",
        email: "",
        parentId: "",
      });

      // Refresh comments
      fetchComments(currentPage);
    } catch (error) {
      console.error("Error posting reply:", error);
      alert("Failed to post reply: " + error.message);
    }
  };

  const handleCancel = () => {
    setReplyingTo(null);
    setReplyText("");
    setShowModal(false);
    setReplyData({
      productId: "",
      comment: "",
      phoneNumber: "",
      username: "",
      email: "",
      parentId: "",
    });
  };
  console.log(replyData, "replyData");
  useEffect(() => {
    if (product?.id) {
      fetchComments(currentPage);
    }
  }, [product?.id, currentPage]);
  console.log(comments);
  const [expandedComments, setExpandedComments] = useState({});
  const [visibleReplies, setVisibleReplies] = useState({});

  // Toggle main comment replies visibility
  const toggleReplies = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // Show more replies for a specific comment
  const showMoreReplies = (commentId, allReplies) => {
    setVisibleReplies((prev) => {
      const currentVisible = prev[commentId] || 2; // Default show 2 replies
      const newVisible = Math.min(currentVisible + 3, allReplies.length); // Show 3 more or all
      return { ...prev, [commentId]: newVisible };
    });
  };

  const renderComment = (comment, depth = 0) => {
    const isAdmin = comment.is_admin === 1;
    const isReply = depth > 0;
    const showAllReplies = expandedComments[comment.id] || depth > 0; // Always show replies when nested
    const replyCount = comment.replies?.length || 0;
    const visibleReplyCount =
      visibleReplies[comment.id] || (depth > 0 ? replyCount : 2); // Show 2 by default for top-level

    return (
      <div
        key={comment.id}
        className={`bg-gray-50 p-4 rounded shadow-sm transition-all duration-200 ${
          isReply ? "ml-6 mt-3" : ""
        }`}
        style={{ marginLeft: `${depth * 2}px` }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <FaCircleUser
              className={`w-10 h-10 ${
                isAdmin ? "text-green-600" : "text-gray-400"
              }`}
            />
          </div>
          <div className="flex-1 min-w-0  ">
            <div className="flex justify-between items-baseline flex-wrap gap-2">
              <p className="font-bold text-xl text-gray-800 truncate">
                {comment.username}
                {isAdmin && (
                  <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    Admin
                  </span>
                )}
              </p>
              <span className="text-xl text-gray-500 whitespace-nowrap">
                {new Date(comment.created_at).toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col">
              <p className="text-gray-600 text-xl mt-1 break-words">
                {comment.comment}
              </p>

              {replyingTo === comment.id ? (
                <div className="mt-2 ml-4  space-y-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => {
                      setReplyText(e.target.value);
                      setReplyData({ ...replyData, comment: e.target.value });
                    }}
                    className="border border-gray-300 rounded p-2 w-full text-xl"
                    placeholder="Write your reply..."
                  />
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSendReply}
                      className="text-gray-600 font-medium text-xl"
                    >
                      Send
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-red-500 text-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  className={`text-xl ml-auto text-gray-500 cursor-pointer hover:underline ${
                    userData?.user?.userId === comment?.user_id ? "hidden" : ""
                  }`}
                  onClick={() => handleReplyClick(comment)}
                >
                  Reply
                </p>
              )}
            </div>
          </div>
        </div>

        {replyCount > 0 && (
          <div className="mt-4 space-y-3">
            {/* View replies toggle for top-level comments */}
            {depth === 0 && replyCount > 0 && !showAllReplies && (
              <button
                onClick={() => toggleReplies(comment.id)}
                className="text-blue-600 text-lg font-medium hover:underline "
              >
                View {replyCount} {replyCount === 1 ? "reply" : "replies"}
              </button>
            )}

            {/* Show replies if expanded or nested */}
            {showAllReplies && (
              <>
                {/* Show first few replies */}
                {comment.replies
                  .slice(0, visibleReplyCount)
                  .map((reply) => renderComment(reply, depth + 1))}

                {/* Show "View more replies" if there are more */}
                {visibleReplyCount < replyCount && (
                  <button
                    onClick={() => showMoreReplies(comment.id, comment.replies)}
                    className="text-blue-600 text-lg font-medium hover:underline ml-6"
                  >
                    View more replies ({replyCount - visibleReplyCount} more)
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  };
  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        username: userData.user?.name || "",
        email: userData.user?.email || "",
        phone_number: userData.profile?.data?.phone_number || "",
      }));
    }
  }, [userData]);

  return (
    <div className="w-full space-y-4 xl:px-4">
      <h3 className="text-3xl font-semibold text-gray-800 mb-2">
        Leave a Comment
      </h3>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Form - Fixed height container */}
        <div className="bg-white p-8 rounded-xl border shadow-sm border-gray-200">
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="text-gray-700 text-2xl mb-1 block">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.username || userData?.user?.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      username: e.target.value || userData?.user?.name,
                    })
                  }
                  placeholder={`${
                    userData ? `${userData.user.name}` : "John Doe"
                  } `}
                  readOnly={!!userData}
                  className={`w-full p-4 text-xl rounded-lg border border-gray-300 bg-gray-50 ${
                    userData
                      ? "bg-zinc-200"
                      : "focus:ring-2 focus:ring-green-500"
                  } outline-none transition`}
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
                  value={formData.email || userData?.user?.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value || userData?.user?.email,
                    })
                  }
                  placeholder={`${
                    userData ? `${userData.user.email}` : "you@example.com"
                  } `}
                  readOnly={!!userData}
                  className={`w-full p-4 text-xl rounded-lg border border-gray-300 bg-gray-50 ${
                    userData
                      ? "bg-zinc-200"
                      : "focus:ring-2 focus:ring-green-500"
                  } outline-none transition`}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="md:col-span-2">
                <label className="text-gray-700 text-2xl mb-1 block">
                  Phone Number (optional)
                </label>
                <div className="w-[98%] sm:w-[96%] md:w-full">
                  <PhoneInput
                    country={"bd"}
                    value={
                      formData.phone_number ||
                      userData?.profile?.data?.phone_number
                    }
                    onChange={(phone) =>
                      setFormData({
                        ...formData,
                        phone_number:
                          phone || userData?.profile?.data?.phone_number,
                      })
                    }
                    inputStyle={{
                      width: "100%",
                      fontSize: "1.1rem",
                      borderRadius: "0.5rem",
                      backgroundColor: "#f9fafb",
                      border: "1px solid #d1d5db",
                    }}
                    containerStyle={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>

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
                className="bg-green-600 hover:bg-green-700 outline-none text-white text-xl sm:text-2xl font-medium px-6 py-2 sm:py-3 rounded-xl shadow-md transition duration-300 w-auto md:w-fit"
              >
                Submit Comment
              </button>
            </div>
          </form>
        </div>

        {/* Comments Section - Fixed height container with scroll */}
        <div className="bg-white p-6 rounded-xl border shadow-sm border-gray-200 flex flex-col">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Comments ({comments.length || 0})
          </h3>

          <div className="flex-1 overflow-y-auto space-y-4 h-auto lg:max-h-[400px] lg:min-[100px] ">
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
              comments.map((comment) => renderComment(comment))
            ) : (
              <p className="text-gray-500 text-xl text-center py-8">
                No comments yet. Be the first to comment!
              </p>
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
              primaryColor="green"
            />
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Reply to Comment</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={replyData.username}
              onChange={(e) =>
                setReplyData({ ...replyData, username: e.target.value })
              }
              className="w-full border p-2 rounded text-xl"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={replyData.email}
              onChange={(e) =>
                setReplyData({ ...replyData, email: e.target.value })
              }
              className="w-full border p-2 rounded text-xl"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={replyData.phoneNumber}
              onChange={(e) =>
                setReplyData({ ...replyData, phoneNumber: e.target.value })
              }
              className="w-full border p-2 rounded text-xl"
            />
            <textarea
              placeholder="Write your reply..."
              value={replyData.comment}
              onChange={(e) =>
                setReplyData({ ...replyData, comment: e.target.value })
              }
              className="w-full border p-2 rounded text-xl"
              required
            />
            <div className="flex justify-end space-x-4">
              <button onClick={handleCancel} className="text-red-500 text-lg">
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                className="bg-blue-600 text-lg text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
