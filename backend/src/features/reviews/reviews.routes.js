const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const { createReviewValidation } = require('./reviews.validation');
const { getPropertyReviews, createReview, deleteReview } = require('./reviews.controller');

router.get('/property/:propertyId', getPropertyReviews);
router.post('/', protect, validate(createReviewValidation), createReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
