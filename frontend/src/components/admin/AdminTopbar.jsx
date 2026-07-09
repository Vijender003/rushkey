import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiCog, HiLogout, HiBell, HiChevronDown } from 'react-icons/hi';
import { getAdminSession, adminLogout } from '@/utils/adminAuth';

const pageTitles = {
  '/admin': 'Dashboard',
  '/admin/listings': 'Listings',
  '/admin/listings/new': 'Add Listing',
  '/admin/users': 'Users',
  '/admin/leads': 'Leads',
  '/admin/settings': 'Settings',
};

export default function AdminTopbar({ onMenuToggle }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const session = getAdminSession();

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const currentTitle = Object.entries(pageTitles).find(([path]) =>
    location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path))
  )?.[1] || 'Admin';

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <HiMenu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{currentTitle}</h1>
            <p className="text-xs text-gray-400 hidden sm:block">
              {location.pathname === '/admin' ? 'Overview of your platform' : `Manage ${currentTitle.toLowerCase()}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
            <HiBell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pl-2.5 pr-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rushkey-400 to-orange-400 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                {session?.name?.charAt(0) || 'A'}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {session?.name || 'Admin'}
              </span>
              <HiChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                <div className="px-4 py-2.5 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{session?.name}</p>
                  <p className="text-xs text-gray-500">{session?.email}</p>
                </div>
                <button
                  onClick={() => { navigate('/admin/settings'); setDropdownOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <HiCog className="w-4 h-4" /> Settings
                </button>
                <div className="border-t border-gray-50 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <HiLogout className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
