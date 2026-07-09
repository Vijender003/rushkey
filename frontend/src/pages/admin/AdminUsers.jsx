import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiBan, HiTrash, HiCheck } from 'react-icons/hi';
import { getUsers, toggleBlockUser, deleteUser } from '@/data/adminMockData';
import { useToast } from '@/components/admin/Toast';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import ConfirmationModal from '@/components/admin/ConfirmationModal';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(getUsers());
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleBlock = (id) => {
    toggleBlockUser(id);
    setUsers(getUsers());
    const user = users.find((u) => u.id === id);
    toast(user?.blocked ? 'User unblocked' : 'User blocked', 'success');
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteUser(deleteTarget.id);
    setUsers(getUsers());
    toast('User deleted successfully', 'success');
  };

  const columns = [
    {
      key: 'name',
      label: 'User',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rushkey-400 to-orange-400 flex items-center justify-center text-white text-xs font-semibold shadow-sm shrink-0">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'phone', label: 'Phone', hideOnSmall: 'hidden sm:table-cell' },
    { key: 'joined', label: 'Joined', hideOnSmall: 'hidden md:table-cell' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge variant={row.blocked ? 'Blocked' : 'Active'} dot>
          {row.blocked ? 'Blocked' : 'Active'}
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
            onClick={(e) => { e.stopPropagation(); handleToggleBlock(row.id); }}
            className={`p-2 rounded-lg transition-all ${
              row.blocked
                ? 'text-emerald-500 hover:bg-emerald-50'
                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
            }`}
            title={row.blocked ? 'Unblock' : 'Block'}
          >
            {row.blocked ? <HiCheck className="w-4 h-4" /> : <HiBan className="w-4 h-4" />}
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

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500 mt-0.5">{users.length} registered users</p>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search users by name or email..."
        emptyMessage="No users found"
        loading={loading}
      />

      <ConfirmationModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        confirmStyle="danger"
      />
    </motion.div>
  );
}
