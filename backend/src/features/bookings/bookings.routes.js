const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const { createBookingValidation } = require('./bookings.validation');
const { createBooking, getMyBookings, getBookingById, updateBookingStatus } = require('./bookings.controller');

router.post('/', protect, validate(createBookingValidation), createBooking);
router.get('/', protect, getMyBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;