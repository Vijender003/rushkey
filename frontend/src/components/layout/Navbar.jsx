import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiHome, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

const navLinks = [
  { to: '/', label: 'Home', icon: FiHome },
  { to: '/search', label: 'Search', icon: FiSearch },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const bgClass = isHome && !isScrolled
    ? 'bg-transparent'
    : 'bg-white/90 backdrop-blur-md shadow-sm';

  const textClass = isHome && !isScrolled ? 'text-white' : 'text-gray-900';

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className={`flex items-center gap-2 font-bold text-xl ${textClass}`}>
            <span className="text-rushkey-500">Rush</span>
            <span>key</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-rushkey-500'
                    : textClass === 'text-white'
                    ? 'text-white/80 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                    textClass === 'text-white'
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-rushkey-500 text-white flex items-center justify-center text-sm font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate">
                    {user?.name || 'User'}
                  </span>
                  <FiChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FiUser className="w-4 h-4 text-gray-400" />
                        Dashboard
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant={isHome && !isScrolled ? 'ghost' : 'ghost'} size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              textClass === 'text-white' ? 'hover:bg-white/10' : 'hover:bg-gray-100'
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? (
              <FiX className={`w-6 h-6 ${textClass}`} />
            ) : (
              <FiMenu className={`w-6 h-6 ${textClass}`} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-white shadow-2xl z-50 md:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Link to="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setMobileOpen(false)}>
                <span className="text-rushkey-500">Rush</span>key
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                aria-label="Close mobile menu"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="px-4 py-4">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'bg-rushkey-50 text-rushkey-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 p-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-10 h-10 rounded-full bg-rushkey-500 text-white flex items-center justify-center text-sm font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-[180px]">
                        {user?.email || ''}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <FiUser className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)}>
                    <Button variant="primary" fullWidth>
                      Signup
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </nav>
  );
}
