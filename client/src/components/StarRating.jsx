export default function StarRating({ rating, setRating, editable = false }) {
  return (
    <div className="flex items-center gap-1 text-2xl cursor-pointer">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
          onClick={() => editable && setRating(i + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
