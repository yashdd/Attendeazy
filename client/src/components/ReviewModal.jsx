import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function ReviewModal({ eventId, onClose }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, rating, comment }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Review submitted!");
        onClose();
      } else {
        toast.error(data.message || "Could not submit review");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"  onClick={(e) => e.stopPropagation()}>
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <h3 className="text-xl font-bold mb-4">Leave a Review</h3>

        <label className="block text-sm mb-1">Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={e => setRating(parseInt(e.target.value))}
          className="w-full mb-3 border px-3 py-1 rounded"
        />

        <label className="block text-sm mb-1">Comment (optional):</label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="w-full mb-4 border px-3 py-2 rounded resize-none"
        />

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
