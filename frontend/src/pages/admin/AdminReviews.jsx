import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiTrash } from 'react-icons/hi';
import { getAdminReviews, deleteReview } from '@/services/reviewService';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminReviews()
      .then(({ data }) => setReviews(data.reviews || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete review');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reviews</h1>
        <p className="text-gray-400 text-sm mt-1">Monitor user feedback and ratings</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.length === 0 && (
            <div className="text-center py-12 text-sm text-gray-400">No reviews yet.</div>
          )}
          {reviews.map((r) => (
            <div key={r._id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-card-hover transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                    {r.user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{r.user?.name || 'Anonymous'}</h4>
                    <p className="text-xs text-gray-400">{r.property?.title || 'N/A'} · {new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(r._id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-0.5 mt-3 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <HiStar key={s} className={`w-4 h-4 ${s <= (r.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                ))}
              </div>
              {r.comment && <p className="text-sm text-gray-600">&ldquo;{r.comment}&rdquo;</p>}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
