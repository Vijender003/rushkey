const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Property is required'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'confirmed', 'cancelled', 'completed'],
        message: 'Status must be pending, confirmed, cancelled, or completed',
      },
      default: 'pending',
    },
    moveInDate: {
      type: Date,
      required: [true, 'Move-in date is required'],
    },
    moveOutDate: {
      type: Date,
    },
    guests: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [1, 'At least one guest is required'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price cannot be negative'],
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['unpaid', 'partial', 'paid'],
        message: 'Payment status must be unpaid, partial, or paid',
      },
      default: 'unpaid',
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ status: 1 });
bookingSchema.index({ user: 1 });
bookingSchema.index({ property: 1 });
bookingSchema.index({ owner: 1 });

module.exports = mongoose.model('Booking', bookingSchema);