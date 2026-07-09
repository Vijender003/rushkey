import { useNavigate, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/pages/admin/AdminContext';
import {
  HiViewGrid, HiHome, HiPlus, HiCalendar, HiUsers,
  HiStar, HiLogout, HiX,
} from 'react-icons/hi';

const menu = [
  { to: '/admin', icon: HiViewGrid, label: 'Dashboard', end: true },
  { to: '/admin/properties', icon: HiHome, label: 'Properties' },
  { to: '/admin/add-property', icon: HiPlus, label: 'Add Property' },
  { to: '/admin/bookings', icon: HiCalendar, label: 'Bookings' },
  { to: '/admin/tenants', icon: HiUsers, label: 'Tenants' },
  { to: '/admin/reviews', icon: HiStar, label: 'Reviews' },
];

function SidebarContent({ onLogout }) {
  return (
    <>
      <div className="px-5 pt-6 pb-7 flex items-center gap-3 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">S</div>
        <div>
          <h1 className="text-base font-bold text-gray-900 tracking-tight">StayFinder</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto scrollbar-hide">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-gray-100">
        <button onClick={onLogout} className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200">
          <HiLogout className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      <div className="px-5 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">A</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{admin?.name || 'Admin'}</p>
            <p className="text-xs text-gray-400">{admin?.email || 'admin@stayfinder.com'}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AdminSidebar() {
  const { sidebarOpen, setSidebarOpen, logout, admin } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      <motion.aside initial={false} animate={{ x: sidebarOpen ? 0 : -280 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-100 flex flex-col shadow-lg shadow-gray-200/50 lg:translate-x-0 lg:static lg:z-auto">
        <div className="flex items-center justify-between px-4 pt-4 pb-0 lg:hidden">
          <span className="text-sm font-semibold text-gray-900">Menu</span>
          <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"><HiX className="w-5 h-5" /></button>
        </div>
        <SidebarContent onLogout={handleLogout} />
      </motion.aside>
    </>
  );
}
