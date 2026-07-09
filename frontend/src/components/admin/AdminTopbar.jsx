import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/pages/admin/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSearch, HiBell, HiMenu } from 'react-icons/hi';

export default function AdminTopbar() {
  const { setSidebarOpen, logout, admin } = useAdmin();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const notifications = [
    { id: 1, text: 'New booking from Ananya Sharma', time: '2 min ago', unread: true },
    { id: 2, text: 'Payment received — ₹8,500', time: '1 hour ago', unread: true },
    { id: 3, text: 'New review on Starlight PG', time: '3 hours ago', unread: false },
    { id: 4, text: 'Property "Urban Nest" marked as pending', time: '1 day ago', unread: false },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-gray-100">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <HiMenu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search properties, tenants, bookings..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 border-0 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative" ref={notifRef}>
            <button onClick={() => setNotifOpen((p) => !p)} className="relative p-2.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <HiBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white" />
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }} className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    <button className="text-xs text-indigo-500 font-medium hover:text-indigo-600">Mark all read</button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${n.unread ? 'bg-indigo-50/50' : ''}`}>
                        <p className="text-sm text-gray-700">{n.text}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileOpen((p) => !p)} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm hover:shadow-md hover:shadow-indigo-200/50 transition-shadow">A</button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }} className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{admin?.name || 'Admin'}</p>
                    <p className="text-xs text-gray-400">{admin?.email || 'admin@stayfinder.com'}</p>
                  </div>
                  <div className="p-2">
                    <button onClick={() => { navigate('/admin/settings'); setProfileOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">Settings</button>
                    <button onClick={() => { logout(); navigate('/admin/login'); }} className="w-full text-left px-3 py-2 rounded-xl text-sm text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors">Logout</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
