import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiViewGrid,
  HiHome,
  HiPlus,
  HiUsers,
  HiPhone,
  HiCog,
  HiLogout,
  HiX,
  HiChevronDown,
} from 'react-icons/hi';
import { useState } from 'react';
import { adminLogout } from '@/utils/adminAuth';

const navGroups = [
  {
    label: 'Main',
    items: [
      { to: '/admin', icon: HiViewGrid, label: 'Dashboard', end: true },
    ],
  },
  {
    label: 'Management',
    items: [
      { to: '/admin/listings', icon: HiHome, label: 'Listings' },
      { to: '/admin/listings/new', icon: HiPlus, label: 'Add Listing' },
      { to: '/admin/users', icon: HiUsers, label: 'Users' },
      { to: '/admin/leads', icon: HiPhone, label: 'Leads' },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/admin/settings', icon: HiCog, label: 'Settings' },
    ],
  },
];

function NavGroup({ group, onClose }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="mb-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-widest"
      >
        {group.label}
        <HiChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden space-y-0.5"
          >
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-rushkey-50 to-orange-50 text-rushkey-600 shadow-sm border border-rushkey-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                  }`
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminSidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 h-16 shrink-0 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rushkey-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-rushkey-200">
            R
          </div>
          <div>
            <span className="font-semibold text-gray-900">Rushkey</span>
            <p className="text-[10px] text-gray-400 leading-tight">Admin Panel</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <HiX className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 overflow-y-auto scrollbar-thin">
        {navGroups.map((group) => (
          <NavGroup key={group.label} group={group} onClose={onClose} />
        ))}
      </nav>

      <div className="px-3 pb-4 shrink-0 border-t border-gray-100 pt-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-150 group"
        >
          <div className="p-1 rounded-lg group-hover:bg-red-100 transition-colors">
            <HiLogout className="w-5 h-5 shrink-0" />
          </div>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200 z-30 shadow-sm">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
