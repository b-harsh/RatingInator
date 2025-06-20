  // import { useParams } from "react-router-dom";

  const dummyReviews = [
    {
      user: "Harsh",
      rating: 5,
      text: "Amazing product!",
      media: "https://via.placeholder.com/100",
      date: "2025-06-15",
    },
    {
      user: "Priya",
      rating: 4,
      text: "Value for money!",
      media: null,
      date: "2025-06-12",
    },
  ];

  export default function ProductDetail() {

    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Product Reviews</h1>
        {dummyReviews.map((review, idx) => (
          <div key={idx} className="border-b pb-4 mb-4">
            <div className="flex gap-2 items-center">
              <div className="font-bold">{review.user}</div>
              <div className="text-yellow-400">{'★'.repeat(review.rating)}</div>
              <div className="text-sm text-gray-500">{review.date}</div>
            </div>
            <p className="mt-1">{review.text}</p>
            {review.media && (
              <img src={review.media} alt="Review Media" className="mt-2 w-32 rounded" />
            )}
          </div>
        ))}
      </div>
    );
  }
