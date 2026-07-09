const { body } = require('express-validator');

const createBookingValidation = [
  body('property')
    .notEmpty().withMessage('Property ID is required')
    .isMongoId().withMessage('Invalid property ID'),
  body('moveInDate')
    .notEmpty().withMessage('Move-in date is required')
    .isISO8601().withMessage('Move-in date must be a valid date'),
  body('moveOutDate')
    .optional()
    .isISO8601().withMessage('Move-out date must be a valid date'),
  body('guests')
    .notEmpty().withMessage('Number of guests is required')
    .isInt({ min: 1 }).withMessage('At least one guest is required'),
  body('totalPrice')
    .notEmpty().withMessage('Total price is required')
    .isFloat({ min: 0 }).withMessage('Total price must be a positive number'),
];

module.exports = { createBookingValidation };