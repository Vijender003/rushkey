import { motion } from 'framer-motion';

const variants = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Inactive: 'bg-gray-100 text-gray-600 border-gray-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  'Few Rooms Left': 'bg-orange-50 text-orange-700 border-orange-200',
  SoldOut: 'bg-red-50 text-red-700 border-red-200',
  Available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Blocked: 'bg-red-50 text-red-700 border-red-200',
  Contacted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  New: 'bg-amber-50 text-amber-700 border-amber-200',
  Unread: 'bg-blue-50 text-blue-700 border-blue-200',
};

export default function Badge({ children, variant = 'Active', dot }) {
  const color = variants[variant] || variants.Active;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${color}`}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </motion.span>
  );
}
