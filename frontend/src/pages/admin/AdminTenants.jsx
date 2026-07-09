import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSearch, HiX, HiHome } from 'react-icons/hi';
import { getAdminUsers } from '@/services/tenantService';

export default function AdminTenants() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminUsers()
      .then(({ data }) => setUsers(data.users || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter((t) => t.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tenants</h1>
          <p className="text-gray-400 text-sm mt-1">Manage all registered tenants</p>
        </div>
      </div>

      <div className="relative mb-6 max-w-md">
        <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tenants..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Name</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Phone</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Email</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Role</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">No tenants found.</td></tr>
              )}
              {filtered.map((t) => (
                <tr key={t._id} onClick={() => setSelected(t)} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <td className="px-6 py-3.5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      {t.name?.split(' ').map((n) => n[0]).join('').toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{t.name}</span>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-gray-500">{t.phone || 'N/A'}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-500">{t.email}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-500 capitalize">{t.role}</td>
                  <td className="px-6 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${t.isVerified ? 'bg-success-50 text-success-600' : 'bg-gray-100 text-gray-500'}`}>
                      {t.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/20" onClick={() => setSelected(null)} />
            <motion.div initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 300 }} className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl border-l border-gray-100 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Tenant Profile</h2>
                <button onClick={() => setSelected(null)} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"><HiX className="w-5 h-5" /></button>
              </div>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                  {selected.name?.split(' ').map((n) => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{selected.name}</h3>
                  <p className="text-sm text-gray-400">{selected.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{selected.phone || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Role</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">{selected.role}</p>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Status</p>
                  <p className="text-sm font-medium text-gray-900">{selected.isVerified ? 'Verified' : 'Unverified'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">Member Since</p>
                  <p className="text-sm font-medium text-gray-900">{new Date(selected.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
