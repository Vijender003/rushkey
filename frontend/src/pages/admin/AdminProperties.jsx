import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiViewGrid, HiViewList, HiSearch, HiPencil, HiTrash, HiPlus } from 'react-icons/hi';
import { getAdminProperties, deleteProperty } from '@/services/propertyService';

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAdminProperties()
      .then(({ data }) => setProperties(data.properties || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = properties.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.address?.city?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete property');
    }
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Properties</h1>
          <p className="text-gray-400 text-sm mt-1">{filtered.length} listings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
              <HiViewGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
              <HiViewList className="w-4 h-4" />
            </button>
          </div>
          <button onClick={() => navigate('/admin/add-property')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm">
            <HiPlus className="w-4 h-4" />
            Add Property
          </button>
        </div>
      </div>

      <div className="relative mb-6 max-w-md">
        <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search properties..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div key="grid" variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <motion.div key={p._id} variants={item} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card-hover transition-shadow duration-300">
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    {p.images?.[0]?.url ? (
                      <img src={p.images[0].url} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">No image</div>
                    )}
                    <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      p.isActive ? 'bg-success-50 text-success-600' : 'bg-warning-50 text-warning-600'
                    }`}>
                      {p.isActive ? 'Active' : 'Pending'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900">{p.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{p.address?.city || 'N/A'}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-bold text-gray-900">₹{p.price?.toLocaleString() || 0}</span>
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 transition-colors"><HiPencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(p._id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><HiTrash className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Property</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3.5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                          {p.images?.[0]?.url ? <img src={p.images[0].url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px]">N/A</div>}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{p.title}</span>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-gray-500">{p.address?.city || 'N/A'}</td>
                      <td className="px-6 py-3.5 text-sm font-medium text-gray-900">₹{p.price?.toLocaleString() || 0}</td>
                      <td className="px-6 py-3.5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.isActive ? 'bg-success-50 text-success-600' : 'bg-warning-50 text-warning-600'}`}>{p.isActive ? 'Active' : 'Pending'}</span>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 transition-colors"><HiPencil className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(p._id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><HiTrash className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
