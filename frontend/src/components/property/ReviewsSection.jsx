import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiStar, FiThumbsUp } from 'react-icons/fi';

function RatingBar({ label, value, total }) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-sm text-gray-600 w-10 text-right">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="h-full bg-rushkey-500 rounded-full"
        />
      </div>
      <span className="text-xs text-gray-500 w-6">{value}</span>
    </div>
  );
}

export default function ReviewsSection({ reviews = [], isAuthenticated, onSubmitReview, reviewLoading }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / totalReviews)
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating || 0) === star).length,
  }));

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmitReview?.({ rating, comment });
    setComment('');
    setRating(5);
    setShowForm(false);
  }

  return (
    <section ref={ref} className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Reviews
          {totalReviews > 0 && <span className="text-gray-400 font-normal ml-1">({totalReviews})</span>}
        </h2>
      </motion.div>

      {totalReviews > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-6 mt-4 mb-6 bg-gray-50 rounded-2xl p-5 border border-gray-100"
        >
          <div className="text-center sm:text-left shrink-0">
            <div className="text-4xl font-extrabold text-gray-900">{avgRating.toFixed(1)}</div>
            <div className="flex items-center gap-0.5 mt-1 justify-center sm:justify-start">
              {[1, 2, 3, 4, 5].map((s) => (
                <FiStar key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>
          </div>
          <div className="flex-1 space-y-1.5 min-w-0">
            {ratingCounts.map(({ star, count }) => (
              <RatingBar key={star} label={star} value={count} total={totalReviews} />
            ))}
          </div>
        </motion.div>
      )}

      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-6"
        >
          {showForm ? (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Write a Review</h3>
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} type="button" onClick={() => setRating(s)} className="p-0.5">
                    <FiStar className={`w-6 h-6 transition-all ${
                      s <= rating ? 'fill-yellow-400 text-yellow-400 scale-110' : 'text-gray-300 hover:text-gray-400'
                    }`} />
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience about this property..."
                rows={3}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-rushkey-300 focus:ring-1 focus:ring-rushkey-200 resize-none mb-3"
              />
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={reviewLoading || !comment.trim()}
                  className="px-5 py-2.5 bg-rushkey-500 hover:bg-rushkey-600 text-white font-semibold text-sm rounded-xl transition-colors shadow-lg shadow-rushkey-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {reviewLoading ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setComment(''); setRating(5); }}
                  className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 text-rushkey-500 hover:text-rushkey-600 font-semibold text-sm transition-colors"
            >
              <FiThumbsUp className="w-4 h-4" />
              Write a Review
            </button>
          )}
        </motion.div>
      )}

      {totalReviews === 0 ? (
        <p className="text-gray-400 text-sm py-8 text-center">No reviews yet. Be the first to share your experience.</p>
      ) : (
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          className="space-y-3"
        >
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
              }}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rushkey-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {review.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.user?.name || 'Anonymous'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FiStar key={s} className={`w-3.5 h-3.5 ${s <= (review.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
