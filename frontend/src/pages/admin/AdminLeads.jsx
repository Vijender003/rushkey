import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiTrash, HiPhone } from 'react-icons/hi';
import { getLeads, markLeadContacted, deleteLead } from '@/data/adminMockData';
import { getCapturedLeads, markLeadContacted as markCapturedContacted, deleteLead as deleteCapturedLead } from '@/services/leadService';
import { useToast } from '@/components/admin/Toast';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import ConfirmationModal from '@/components/admin/ConfirmationModal';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [filterContacted, setFilterContacted] = useState('All');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      const adminLeads = getLeads();
      const captured = getCapturedLeads().map((l) => ({
        ...l,
        listing: l.pgTitle || l.listing,
        budget: l.budget || '—',
        message: l.message || '',
      }));
      const merged = [...captured, ...adminLeads.filter((a) => !captured.some((c) => c.id === a.id))];
      setLeads(merged);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchesSearch = l.name.toLowerCase().includes(q) || l.listing?.toLowerCase().includes(q) || l.phone.includes(q);
    const matchesStatus =
      filterContacted === 'All' ||
      (filterContacted === 'Contacted' && l.contacted) ||
      (filterContacted === 'New' && !l.contacted);
    return matchesSearch && matchesStatus;
  });

  const handleMarkContacted = (id) => {
    markLeadContacted(id);
    markCapturedContacted(id);
    const updated = leads.map((l) =>
      l.id === id ? { ...l, contacted: !l.contacted } : l
    );
    setLeads(updated);
    const lead = leads.find((l) => l.id === id);
    toast(lead?.contacted ? 'Marked as new' : 'Marked as contacted', 'success');
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteLead(deleteTarget.id);
    deleteCapturedLead(deleteTarget.id);
    setLeads((prev) => prev.filter((l) => l.id !== deleteTarget.id));
    toast('Lead deleted successfully', 'success');
  };

  const columns = [
    {
      key: 'name',
      label: 'Lead',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-gray-900">{row.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <HiPhone className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">{row.phone}</span>
          </div>
          {row.message && (
            <p className="text-xs text-gray-400 mt-1 italic truncate max-w-[220px]">"{row.message}"</p>
          )}
        </div>
      ),
    },
    {
      key: 'listing',
      label: 'PG / Listing',
      render: (row) => <span className="text-sm text-gray-700">{row.listing || row.pgTitle || '—'}</span>,
      hideOnSmall: 'hidden sm:table-cell',
    },
    {
      key: 'budget',
      label: 'Budget',
      hideOnSmall: 'hidden md:table-cell',
    },
    {
      key: 'date',
      label: 'Date',
      hideOnSmall: 'hidden md:table-cell',
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge variant={row.contacted ? 'Contacted' : 'New'} dot>
          {row.contacted ? 'Contacted' : 'New'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); handleMarkContacted(row.id); }}
            className={`p-2 rounded-lg transition-all ${
              row.contacted
                ? 'text-gray-400 hover:text-amber-600 hover:bg-amber-50'
                : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'
            }`}
            title={row.contacted ? 'Mark as new' : 'Mark as contacted'}
          >
            <HiCheckCircle className="w-4 h-4" />
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
      {['All', 'New', 'Contacted'].map((s) => (
        <button
          key={s}
          onClick={() => setFilterContacted(s)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
            filterContacted === s
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <p className="text-sm text-gray-500 mt-0.5">{leads.filter((l) => !l.contacted).length} unread leads</p>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search leads by name, phone, or listing..."
        filters={filters}
        emptyMessage="No leads found matching your filters"
        loading={loading}
      />

      <ConfirmationModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Lead"
        message={`Are you sure you want to delete the lead from "${deleteTarget?.name}"?`}
        confirmLabel="Delete"
        confirmStyle="danger"
      />
    </motion.div>
  );
}
