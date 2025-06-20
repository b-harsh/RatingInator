import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import { useNavigate } from 'react-router-dom';
import RateProductModal from './RateProductModal';
import API from '../api';

export default function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    const checkIfRated = async () => {
      try {
        const res = await API.get(`/reviews/${product.id}`);
        const userReview = res.data.reviews?.find(
          (r) => r.username === username
        );
        if (userReview) {
          setHasRated(true);
        }
      } catch (err) {
        console.error('Error checking user rating', err);
      }
    };

    checkIfRated();
  }, [product.id, username]);

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <img
        src={product.image || product.img}
        alt={product.name}
        className="w-full max-h-48 object-contain rounded bg-white mx-auto"
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-800 font-medium">₹{product.price}</p>
      <StarRating rating={product.average_rating || 0} />

      <div className="mt-2 flex gap-2">
        <button
          onClick={() => setShowModal(true)}
          disabled={hasRated}
          className={`px-3 py-1 rounded ${
            hasRated
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {hasRated ? 'Already Rated' : 'Rate Now'}
        </button>
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          Reviews and Ratings
        </button>
      </div>

      {showModal && (
        <RateProductModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
