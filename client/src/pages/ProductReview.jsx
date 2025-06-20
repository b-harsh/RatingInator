import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import API from '../api';

const ProductReview = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(0);
  const [tags, setTags] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [activeTag, setActiveTag] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest');
  const [productName, setProductName] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('user'))?.username;

  useEffect(() => {
    fetchReviews();
    fetchProductName();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/${productId}`);
      setReviews(res.data.reviews || res.data);
      setTags(res.data.tags || []);
    } catch {
      alert('Failed to load Reviews');
    }
  };

  const fetchProductName = async () => {
    try {
      const res = await API.get(`/products/${productId}`);
      setProductName(res.data.name);
    } catch {
      console.error('Failed to fetch Product Name');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await API.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert('Delete Failed');
    }
  };

  const handleSave = async (id) => {
    try {
      await API.put(`/reviews/${id}`, {
        rating: editRating,
        review: editText,
      });
      const updated = reviews.map((r) =>
        r.id === id ? { ...r, review: editText, rating: editRating } : r
      );
      setReviews(updated);
      setEditId(null);
    } catch {
      alert('Failed to update review');
    }
  };

  const filteredReviews = reviews
    .filter((r) => !ratingFilter || r.rating >= ratingFilter)
    .filter(
      (r) =>
        !activeTag || (r.review && r.review.toLowerCase().includes(activeTag))
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Customer Reviews for {productName}
      </h1>

      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">Filter by Rating:</span>
          {[5, 4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => setRatingFilter((prev) => (prev === r ? null : r))}
              className={`px-2 py-1 rounded text-sm ${
                ratingFilter === r
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {r}★+
            </button>
          ))}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold">Filter by Tag:</span>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setActiveTag((prev) => (prev === tag ? null : tag))
                }
                className={`px-2 py-1 rounded-full text-sm ${
                  activeTag === tag
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="font-semibold">Sort:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>

        {(ratingFilter || activeTag || sortOrder !== 'newest') && (
          <div>
            <button
              onClick={() => {
                setRatingFilter(null);
                setActiveTag(null);
                setSortOrder('newest');
              }}
              className="text-sm text-red-600 underline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {filteredReviews.length === 0 ? (
        <p>No Reviews Yet.</p>
      ) : (
        filteredReviews.map((r) => (
          <div key={r.id} className="border-b py-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold">
                {r.username[0].toUpperCase()}
              </div>
              <p className="font-semibold">{r.username}</p>
              <StarRating rating={r.rating} />
            </div>

            {editId === r.id ? (
              <>
                <textarea
                  className="w-full border p-2 rounded"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="border p-1 w-16 mt-2"
                  value={editRating}
                  onChange={(e) => setEditRating(e.target.value)}
                />
                <div className="mt-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleSave(r.id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-400 text-white px-2 py-1 rounded"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-700">{r.review}</p>
                {r.media_path && (
                  <div className="mt-2">
                    {r.media_path.endsWith('.mp4') ? (
                      <video
                        controls
                        className="w-48 h-32 rounded"
                        src={`http://localhost:5000/${r.media_path}`}
                      />
                    ) : (
                      <img
                        src={`http://localhost:5000/${r.media_path}`}
                        alt="review media"
                        className="w-48 h-32 object-cover border rounded"
                      />
                    )}
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(r.created_at).toLocaleString()}
                </p>
              </>
            )}

            {r.username?.toLowerCase() === currentUser?.toLowerCase() && (
              <div className="flex gap-2 mt-2">
                <button
                  className="text-sm text-blue-600 underline"
                  onClick={() => {
                    setEditId(r.id);
                    setEditText(r.review);
                    setEditRating(r.rating);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-sm text-red-600 underline"
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ProductReview;
