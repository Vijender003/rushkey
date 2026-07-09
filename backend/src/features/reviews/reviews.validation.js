const { body } = require('express-validator');

const createReviewValidation = [
  body('property').isMongoId().withMessage('Invalid property ID'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required')
    .isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters'),
];

module.exports = { createReviewValidation };
