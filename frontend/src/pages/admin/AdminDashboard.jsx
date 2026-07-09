import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiCalendar, HiCurrencyDollar, HiUserGroup, HiArrowRight } from 'react-icons/hi';
import { getAdminStats } from '@/services/analyticsService';
import { getAdminBookings } from '@/services/bookingService';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      getAdminStats(),
      getAdminBookings({ limit: 5 }),
    ])
      .then(([statsRes, bookingsRes]) => {
        setStats(statsRes.data.data);
        setRecentBookings(bookingsRes.data.bookings || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats ? [
    { label: 'Total Properties', value: String(stats.totalProperties), change: `${stats.pendingProperties} pending`, icon: HiHome, bg: 'bg-indigo-50' },
    { label: 'Active Bookings', value: String(stats.activeBookings), change: `${stats.totalBookings} total`, icon: HiCalendar, bg: 'bg-emerald-50' },
    { label: 'Monthly Revenue', value: `₹${(stats.monthlyRevenue || 0).toLocaleString()}`, change: 'From paid bookings', icon: HiCurrencyDollar, bg: 'bg-amber-50' },
    { label: 'Occupancy Rate', value: `${stats.occupancyRate || 0}%`, change: `${stats.totalUsers} users`, icon: HiUserGroup, bg: 'bg-violet-50' },
  ] : [];

  const quickActions = [
    { label: 'Add Property', path: '/admin/add-property', icon: HiHome, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'View Bookings', path: '/admin/bookings', icon: HiCalendar, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Messages', path: '/admin/messages', icon: HiUserGroup, color: 'text-amber-600 bg-amber-50' },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back, Admin. Here&apos;s your overview.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-card-hover transition-shadow duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-gray-700" />
              </div>
              <span className="text-xs text-success-500 font-medium">{s.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div variants={item} className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-gray-900">Revenue Trend</h2>
            <span className="text-xs text-gray-400">Monthly revenue: ₹{(stats?.monthlyRevenue || 0).toLocaleString()}</span>
          </div>
          <div className="h-48 flex items-end gap-2">
            {[40, 55, 45, 70, 60, 80, 75].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }} className="w-full max-w-[32px] rounded-lg bg-gradient-to-t from-indigo-500 to-indigo-400" />
                <span className="text-[10px] text-gray-400">M{i + 1}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((a) => (
              <button key={a.label} onClick={() => navigate(a.path)} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group text-left">
                <div className={`w-9 h-9 rounded-xl ${a.color} flex items-center justify-center`}>
                  <a.icon className="w-4 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700 flex-1">{a.label}</span>
                <HiArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={item} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Recent Bookings</h3>
          <button onClick={() => navigate('/admin/bookings')} className="text-xs text-indigo-500 font-medium hover:text-indigo-600 transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Tenant</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Property</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">No bookings yet.</td></tr>
              )}
              {recentBookings.map((b, i) => (
                <tr key={b._id || i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3.5 text-sm font-medium text-gray-900">{b.user?.name || 'N/A'}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-500">{b.property?.title || 'N/A'}</td>
                  <td className="px-6 py-3.5 text-sm font-medium text-gray-900">₹{b.totalPrice?.toLocaleString() || 0}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-500">{new Date(b.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      b.status === 'confirmed' ? 'bg-success-50 text-success-600' :
                      b.status === 'pending' ? 'bg-warning-50 text-warning-600' :
                      'bg-error-50 text-error-600'
                    }`}>
                      {b.status?.charAt(0).toUpperCase() + b.status?.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
