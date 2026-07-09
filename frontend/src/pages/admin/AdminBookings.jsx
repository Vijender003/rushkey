import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiCheck, HiX } from 'react-icons/hi';
import { getAdminBookings, updateBookingStatus } from '@/services/bookingService';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminBookings()
      .then(({ data }) => setBookings(data.bookings || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = bookings.filter((b) =>
    b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.property?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Bookings</h1>
          <p className="text-gray-400 text-sm mt-1">Manage all tenant bookings</p>
        </div>
      </div>

      <div className="relative mb-6 max-w-md">
        <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bookings..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Tenant</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Property</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Payment</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-400">No bookings found.</td></tr>
                )}
                {filtered.map((b) => (
                  <tr key={b._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-medium text-gray-900">{b.user?.name || 'N/A'}</td>
                    <td className="px-6 py-3.5 text-sm text-gray-500">{b.property?.title || 'N/A'}</td>
                    <td className="px-6 py-3.5 text-sm text-gray-500">{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-3.5 text-sm font-medium text-gray-900">₹{b.totalPrice?.toLocaleString() || 0}</td>
                    <td className="px-6 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        b.status === 'confirmed' ? 'bg-success-50 text-success-600' :
                        b.status === 'pending' ? 'bg-warning-50 text-warning-600' :
                        'bg-error-50 text-error-600'
                      }`}>{b.status?.charAt(0).toUpperCase() + b.status?.slice(1)}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        b.paymentStatus === 'paid' ? 'bg-success-50 text-success-600' :
                        b.paymentStatus === 'pending' || !b.paymentStatus ? 'bg-warning-50 text-warning-600' :
                        'bg-gray-100 text-gray-500'
                      }`}>{b.paymentStatus ? b.paymentStatus.charAt(0).toUpperCase() + b.paymentStatus.slice(1) : 'Pending'}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex gap-1">
                        {b.status === 'pending' && (
                          <>
                            <button onClick={() => handleStatusUpdate(b._id, 'confirmed')} className="p-1.5 rounded-lg text-success-500 hover:bg-success-50 transition-colors"><HiCheck className="w-4 h-4" /></button>
                            <button onClick={() => handleStatusUpdate(b._id, 'cancelled')} className="p-1.5 rounded-lg text-error-500 hover:bg-error-50 transition-colors"><HiX className="w-4 h-4" /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
