const Booking = require('../../models/Booking');
const Property = require('../../models/Property');
const asyncHandler = require('../../utils/asyncHandler');
const createError = require('../../utils/ApiError');

const createBooking = asyncHandler(async (req, res) => {
  const { property: propertyId, moveInDate, moveOutDate, guests, totalPrice } = req.body;

  const property = await Property.findById(propertyId);
  if (!property) {
    throw createError('Property not found.', 404);
  }

  if (!property.isActive) {
    throw createError('This property is no longer active.', 400);
  }

  if (property.availableBeds < guests) {
    throw createError('Not enough available beds for this request.', 400);
  }

  const booking = await Booking.create({
    user: req.user._id,
    property: propertyId,
    owner: property.owner,
    moveInDate,
    moveOutDate,
    guests,
    totalPrice,
  });

  res.status(201).json({
    success: true,
    booking,
  });
});

const getMyBookings = asyncHandler(async (req, res) => {
  let bookings;

  if (req.user.role === 'owner') {
    bookings = await Booking.find({ owner: req.user._id })
      .populate('user', 'name email phone')
      .populate('property', 'title price address.city')
      .sort('-createdAt');
  } else {
    bookings = await Booking.find({ user: req.user._id })
      .populate('property', 'title price address.city images')
      .populate('owner', 'name phone')
      .sort('-createdAt');
  }

  res.status(200).json({
    success: true,
    count: bookings.length,
    bookings,
  });
});

const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name email phone')
    .populate('property', 'title price address images')
    .populate('owner', 'name phone');

  if (!booking) {
    throw createError('Booking not found.', 404);
  }

  if (
    booking.user._id.toString() !== req.user._id.toString() &&
    booking.owner._id.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    throw createError('Not authorized to view this booking.', 403);
  }

  res.status(200).json({
    success: true,
    booking,
  });
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw createError('Booking not found.', 404);
  }

  const isOwner = booking.owner.toString() === req.user._id.toString();
  const isUser = booking.user.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isUser && !isAdmin) {
    throw createError('Not authorized to update this booking.', 403);
  }

  const validTransitions = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['completed', 'cancelled'],
  };

  if (isUser && !isOwner) {
    if (booking.status === 'pending' && status === 'cancelled') {
      booking.status = status;
    } else {
      throw createError('You can only cancel a pending booking.', 400);
    }
  } else if (isOwner || isAdmin) {
    if (!validTransitions[booking.status] || !validTransitions[booking.status].includes(status)) {
      throw createError(`Cannot change status from ${booking.status} to ${status}.`, 400);
    }
    booking.status = status;
  }

  await booking.save();

  res.status(200).json({
    success: true,
    booking,
  });
});

module.exports = { createBooking, getMyBookings, getBookingById, updateBookingStatus };