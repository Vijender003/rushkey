const { body } = require('express-validator');

const createPropertyValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 5, max: 200 }).withMessage('Title must be 5-200 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('type')
    .trim()
    .notEmpty().withMessage('Property type is required')
    .isIn(['pg', 'hostel', 'apartment', 'room']).withMessage('Invalid property type'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('address.street')
    .trim()
    .notEmpty().withMessage('Street address is required'),
  body('address.city')
    .trim()
    .notEmpty().withMessage('City is required'),
  body('address.state')
    .trim()
    .notEmpty().withMessage('State is required'),
  body('address.pincode')
    .trim()
    .notEmpty().withMessage('Pincode is required'),
  body('gender')
    .optional()
    .isIn(['boys', 'girls', 'co-living']).withMessage('Gender must be boys, girls, or co-living'),
  body('capacity')
    .optional()
    .isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('availableBeds')
    .optional()
    .isInt({ min: 0 }).withMessage('Available beds cannot be negative'),
];

const updatePropertyValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 }).withMessage('Title must be 5-200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('type')
    .optional()
    .trim()
    .isIn(['pg', 'hostel', 'apartment', 'room']).withMessage('Invalid property type'),
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('gender')
    .optional()
    .isIn(['boys', 'girls', 'co-living']).withMessage('Gender must be boys, girls, or co-living'),
  body('capacity')
    .optional()
    .isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('availableBeds')
    .optional()
    .isInt({ min: 0 }).withMessage('Available beds cannot be negative'),
];

module.exports = { createPropertyValidation, updatePropertyValidation };