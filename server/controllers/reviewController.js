const db = require('../db');

function extractTags(reviews) {
  const wordCount = {};
  const stopWords = [
    'the',
    'is',
    'it',
    'and',
    'was',
    'to',
    'i',
    'a',
    'of',
    'this',
    'in',
    'for',
  ];

  reviews.forEach(({ review }) => {
    if (!review) return;
    const words = review.toLowerCase().split(/\W+/);
    words.forEach((word) => {
      if (!stopWords.includes(word) && word.length > 2) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
  });
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}

exports.submitReview = async (req, res) => {
  try {
    const user_id = req.user.id;
    const product_id = req.params.productId;
    const { rating, review } = req.body;
    const media_path = req.file ? req.file.path : null;

    const [existing] = await db.query(
      'SELECT * FROM reviews WHERE user_id = ? AND product_id = ?',
      [user_id, product_id]
    );

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ message: 'You have already reviewed this product' });
    }

    await db.query(
      'INSERT INTO reviews (user_id, product_id, rating, review, media_path) VALUES (?, ?, ?, ?, ?)',
      [user_id, product_id, rating, review, media_path]
    );

    res.json({ message: 'Review submitted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error submitting review', error: err.message });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const productId = req.params.productId;

    const [rows] = await db.query(
      `SELECT r.*, u.username 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.product_id = ? 
       ORDER BY r.created_at DESC`,
      [productId]
    );

    const tags = extractTags(rows);
    res.json({ reviews: rows, tags });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching reviews', error: err.message });
  }
};

exports.editReview = async (req, res) => {
  const user_id = req.user.id;
  const reviewId = req.params.reviewId;
  const { rating, review } = req.body;

  try {
    const [rows] = await db.query(
      'Select * from Reviews where id = ? and user_id = ?',
      [reviewId, user_id]
    );
    if (rows.length === 0) {
      return res.status(403).json({ message: 'Not authorized ' });
    }

    await db.query('Update reviews set rating = ? , review = ? where id =?', [
      rating,
      review,
      reviewId,
    ]);
    res.json({ message: 'Review updated successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error editing review', error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  const user_id = req.user.id;
  const reviewId = req.params.reviewId;

  try {
    const [rows] = await db.query(
      'Select * from reviews where id= ? and user_id = ?',
      [reviewId, user_id]
    );
    if (rows.length === 0) {
      return res
        .status(403)
        .json({ message: 'Not authorized to delete this review' });
    }

    await db.query('Delete from reviews where id = ?', [reviewId]);
    res.json({ message: 'Review Deleted Successfully ' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting Review', error: err.message });
  }
};
