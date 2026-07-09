const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../middleware/auth');
const { getStats, getAllProperties, getAllUsers, getAllBookings, getAllReviews } = require('./admin.controller');

router.use(protect, authorize('admin'));

router.get('/stats', getStats);
router.get('/properties', getAllProperties);
router.get('/users', getAllUsers);
router.get('/bookings', getAllBookings);
router.get('/reviews', getAllReviews);

module.exports = router;
