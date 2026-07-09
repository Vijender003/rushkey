const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
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
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [500, 'Comment cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ user: 1, property: 1 }, { unique: true });
reviewSchema.index({ property: 1 });

reviewSchema.statics.calcAverageRating = async function (propertyId) {
  const result = await this.aggregate([
    { $match: { property: propertyId } },
    {
      $group: {
        _id: '$property',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await mongoose.model('Property').findByIdAndUpdate(propertyId, {
      rating: result.length > 0 ? Math.round(result[0].averageRating * 10) / 10 : 0,
      numReviews: result.length > 0 ? result[0].numReviews : 0,
    });
  } catch (err) {
    console.error('Error updating property rating:', err.message);
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.property);
});

reviewSchema.post('findOneAndDelete', function (doc) {
  if (doc) {
    doc.constructor.calcAverageRating(doc.property);
  }
});

module.exports = mongoose.model('Review', reviewSchema);