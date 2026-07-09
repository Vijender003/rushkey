import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import { getListings, deleteListing } from '@/data/adminMockData';
import { useToast } from '@/components/admin/Toast';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import ConfirmationModal from '@/components/admin/ConfirmationModal';

export default function AdminListings() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setListings(getListings());
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filtered = listings.filter((l) => {
    const q = search.toLowerCase();
    const matchesSearch = l.title.toLowerCase().includes(q) || l.location.toLowerCase().includes(q);
    const matchesStatus = filterStatus === 'All' || l.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteListing(deleteTarget.id);
    setListings(getListings());
    toast('Listing deleted successfully', 'success');
  };

  const columns = [
    {
      key: 'title',
      label: 'Listing',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0 ring-1 ring-gray-100" />
          <span className="text-sm font-medium text-gray-900 truncate max-w-[220px]">{row.title}</span>
        </div>
      ),
    },
    { key: 'price', label: 'Price', render: (row) => <span className="font-medium text-gray-900">{row.price}</span>, hideOnSmall: 'hidden sm:table-cell' },
    { key: 'location', label: 'Location', hideOnSmall: 'hidden md:table-cell' },
    {
      key: 'status',
      label: 'Status',
      hideOnSmall: 'hidden sm:table-cell',
      render: (row) => <Badge variant={row.status}>{row.status}</Badge>,
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/admin/listings/${row.id}`); }}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Edit"
          >
            <HiPencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setDeleteTarget(row); }}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Delete"
          >
            <HiTrash className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const filters = (
    <>
      {['All', 'Active', 'Inactive', 'Pending'].map((s) => (
        <button
          key={s}
          onClick={() => setFilterStatus(s)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
            filterStatus === s
              ? 'bg-rushkey-500 text-white border-rushkey-500'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          {s}
        </button>
      ))}
    </>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Listings</h2>
          <p className="text-sm text-gray-500 mt-0.5">{listings.length} total listings</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/admin/listings/new')}
          className="flex items-center gap-2 px-4 py-2.5 bg-rushkey-500 hover:bg-rushkey-600 text-white text-sm font-medium rounded-xl shadow-sm shadow-rushkey-200 transition-all"
        >
          <HiPlus className="w-4 h-4" /> Add Listing
        </motion.button>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search listings by title or location..."
        filters={filters}
        emptyMessage="No listings found matching your filters"
        loading={loading}
      />

      <ConfirmationModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Listing"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        confirmStyle="danger"
      />
    </motion.div>
  );
}
