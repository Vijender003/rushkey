const Property = require('../../models/Property');
const Booking = require('../../models/Booking');
const User = require('../../models/User');
const Review = require('../../models/Review');
const asyncHandler = require('../../utils/asyncHandler');

const getStats = asyncHandler(async (req, res) => {
  const totalProperties = await Property.countDocuments();
  const activeBookings = await Booking.countDocuments({ status: { $ne: 'cancelled' } });
  const totalBookings = await Booking.countDocuments();

  const revenueResult = await Booking.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);
  const monthlyRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

  const totalCapacity = await Property.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: null, total: { $sum: '$capacity' } } },
  ]);
  const totalBeds = totalCapacity.length > 0 ? totalCapacity[0].total : 0;

  const totalUsers = await User.countDocuments();
  const totalReviews = await Review.countDocuments();
  const pendingProperties = await Property.countDocuments({ isActive: false });

  res.json({
    success: true,
    data: {
      totalProperties,
      activeBookings,
      totalBookings,
      monthlyRevenue,
      totalBeds,
      occupancyRate: totalBeds > 0 ? Math.round((activeBookings / totalBeds) * 100) : 0,
      totalUsers,
      totalReviews,
      pendingProperties,
    },
  });
});

const getAllProperties = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const properties = await Property.find()
    .populate('owner', 'name email phone')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  const total = await Property.countDocuments();

  res.json({
    success: true,
    count: properties.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    properties,
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const users = await User.find().sort('-createdAt').skip(skip).limit(limit);
  const total = await User.countDocuments();

  res.json({
    success: true,
    count: users.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    users,
  });
});

const getAllBookings = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const bookings = await Booking.find()
    .populate('user', 'name email phone')
    .populate('property', 'title price')
    .populate('owner', 'name email')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  const total = await Booking.countDocuments();

  res.json({
    success: true,
    count: bookings.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    bookings,
  });
});

const getAllReviews = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const reviews = await Review.find()
    .populate('user', 'name email avatar')
    .populate('property', 'title')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments();

  res.json({
    success: true,
    count: reviews.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    reviews,
  });
});

module.exports = { getStats, getAllProperties, getAllUsers, getAllBookings, getAllReviews };
