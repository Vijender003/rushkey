const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const { uploadImages } = require('../../middleware/upload');
const { createPropertyValidation, updatePropertyValidation } = require('./properties.validation');
const {
  listProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
} = require('./properties.controller');

router.get('/owner/me', protect, authorize('owner', 'admin'), getMyProperties);
router.get('/', listProperties);
router.get('/:id', getPropertyById);
router.post('/', protect, authorize('owner', 'admin'), uploadImages, validate(createPropertyValidation), createProperty);
router.put('/:id', protect, authorize('owner', 'admin'), uploadImages, validate(updatePropertyValidation), updateProperty);
router.delete('/:id', protect, authorize('owner', 'admin'), deleteProperty);

module.exports = router;