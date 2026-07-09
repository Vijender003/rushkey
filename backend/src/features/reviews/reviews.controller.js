const Review = require('../../models/Review');
const Booking = require('../../models/Booking');
const asyncHandler = require('../../utils/asyncHandler');
const createError = require('../../utils/ApiError');

const getPropertyReviews = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const reviews = await Review.find({ property: req.params.propertyId })
    .populate('user', 'name avatar')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments({ property: req.params.propertyId });

  res.status(200).json({
    success: true,
    count: reviews.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    reviews,
  });
});

const createReview = asyncHandler(async (req, res) => {
  const { property, booking, rating, comment } = req.body;

  const existingReview = await Review.findOne({
    user: req.user._id,
    property,
  });
  if (existingReview) {
    throw createError('You have already reviewed this property.', 400);
  }

  if (booking) {
    const existingBooking = await Booking.findOne({
      _id: booking,
      user: req.user._id,
      property,
    });
    if (!existingBooking) {
      throw createError('Booking not found or does not belong to you.', 404);
    }
    if (existingBooking.status !== 'completed') {
      throw createError('You can only review after the booking is completed.', 400);
    }
  }

  const review = await Review.create({
    user: req.user._id,
    property,
    booking,
    rating,
    comment,
  });

  res.status(201).json({
    success: true,
    review,
  });
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw createError('Review not found.', 404);
  }

  if (
    review.user.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    throw createError('Not authorized to delete this review.', 403);
  }

  await Review.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Review deleted successfully.',
  });
});

module.exports = { getPropertyReviews, createReview, deleteReview };