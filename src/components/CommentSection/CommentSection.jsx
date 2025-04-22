import React, { useState } from "react";
import { useProductStore } from "../../providers/AppProviders";

// ---------------- COMMENT SECTION ----------------
const CommentSection = () => {
  const { name: userName, email: userEmail } = useProductStore();
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    name: userName || "",
    email: userEmail || "",
    comment: "",
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const { name, email, comment } = formData;
    if (comment.trim()) {
      const newComment = {
        id: "",
        name,
        email,
        comment,
        date: new Date(),
      };
      setComments([newComment, ...comments]);
      setFormData({ name: "", email: "", comment: "" });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Add a Comments</h2>

      <form onSubmit={handleCommentSubmit} className="space-y-3 text-2xl ">
        {!userName && (
          <div className=" flex gap-x-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full sm:w-[40%] p-2 border rounded border-gray-300 outline-none"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full sm:w-[40%] p-2 border  border-gray-300 rounded outline-none"
              required
            />
          </div>
        )}

        <textarea
          placeholder="Write a comment..."
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded outline-none "
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Comment
        </button>
      </form>

      <div className="space-y-2">
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-100 p-3 rounded shadow-sm">
            <div className="flex justify-between items-center">
              <p className="font-medium">{c.name}</p>
              <span className="text-sm italic text-gray-500">
                {new Date(c.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{c.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
