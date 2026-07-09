const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Property owner is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
    },
    type: {
      type: String,
      required: [true, 'Property type is required'],
      enum: {
        values: ['pg', 'hostel', 'apartment', 'room'],
        message: 'Type must be pg, hostel, apartment, or room',
      },
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    priceLabel: {
      type: String,
      default: '/month',
      trim: true,
    },
    address: {
      street: { type: String, required: [true, 'Street address is required'], trim: true },
      city: { type: String, required: [true, 'City is required'], trim: true },
      state: { type: String, required: [true, 'State is required'], trim: true },
      pincode: { type: String, required: [true, 'Pincode is required'], trim: true },
      landmark: { type: String, default: '', trim: true },
      coordinates: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 },
      },
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    amenities: {
      type: [String],
      default: [],
    },
    rules: {
      type: [String],
      default: [],
    },
    gender: {
      type: String,
      enum: {
        values: ['boys', 'girls', 'co-living'],
        message: 'Gender must be boys, girls, or co-living',
      },
      default: 'co-living',
    },
    capacity: {
      type: Number,
      default: 1,
      min: [1, 'Capacity must be at least 1'],
    },
    availableBeds: {
      type: Number,
      default: 1,
      min: [0, 'Available beds cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5'],
    },
    numReviews: {
      type: Number,
      default: 0,
      min: [0, 'Number of reviews cannot be negative'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

propertySchema.index({ 'address.city': 1 });
propertySchema.index({ type: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ gender: 1 });
propertySchema.index({ isActive: 1 });
propertySchema.index({ rating: -1 });

module.exports = mongoose.model('Property', propertySchema);