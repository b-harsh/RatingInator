const express = require('express');
const router = express.Router();
const multer = require('multer');
const { verifyToken } = require('../middleware/authMiddleware');
const {
  submitReview,
  getProductReviews,
  editReview,
  deleteReview,
} = require('../controllers/reviewController'); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post('/:productId', verifyToken, upload.single('media'), submitReview);
router.get('/:productId', getProductReviews);
router.put('/:reviewId', verifyToken, editReview);
router.delete('/:reviewId', verifyToken, deleteReview);

module.exports = router;
