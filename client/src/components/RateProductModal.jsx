import React, { useState } from 'react';
import StarRating from './StarRating';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const RateProductModal = ({ product, onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!rating) {
      alert('Please give a rating before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('review', review);
    if (media) formData.append('media', media);

    try {
      setLoading(true);
      await API.post(`/reviews/${product.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Review submitted successfully!');
      window.dispatchEvent(new Event('review-submitted'));
      navigate('/');
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-2">Rate {product.name}</h2>
        <StarRating rating={rating} setRating={setRating} editable />
        <textarea
          placeholder="Write your Review (optional)"
          className="mt-4 w-full border p-2 rounded"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="mt-4">
          <label className="inline-block bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded cursor-pointer transition duration-200">
            📁 Choose File
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMedia(e.target.files[0])}
              className="hidden"
            />
          </label>

          {media && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Selected: {media.name}
              </span>
              <button
                onClick={() => setMedia(null)}
                type="button"
                className="text-red-600 text-sm underline hover:text-red-800"
              >
                Clear File
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-3 py-1 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-3 py-1 rounded"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateProductModal;
