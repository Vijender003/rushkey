import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiHome, FiSearch, FiUser, FiLogOut, FiGrid } from 'react-icons/fi';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

const navLinks = [
  { to: '/', label: 'Home', icon: FiHome },
  { to: '/search', label: 'Explore', icon: FiSearch },
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
    function handleScroll() { setIsScrolled(window.scrollY > 50); }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdownOpen(false); }, [location.pathname]);
  useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [mobileOpen]);

  const scrolled = isScrolled || !isHome;
  const bgClass = scrolled
    ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100/50'
    : 'bg-transparent';
  const textClass = scrolled ? 'text-gray-900' : 'text-white';

  function handleLogout() { logout(); navigate('/'); }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className={`flex items-center gap-1.5 font-bold text-xl transition-colors ${textClass}`}>
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
                    : scrolled
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-white/80 hover:text-white'
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
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-colors ${
                    scrolled
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rushkey-500 to-rushkey-600 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate">{user?.name || 'User'}</span>
                  <FiChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5"
                    >
                      <Link to="/dashboard" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <FiUser className="w-4 h-4 text-gray-400" /> Dashboard
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <FiLogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login"><Button variant={scrolled ? 'ghost' : 'white-glass'} size="sm">Login</Button></Link>
                <Link to="/signup"><Button variant="primary" size="sm">Sign Up</Button></Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <FiX className={`w-6 h-6 ${textClass}`} /> : <FiMenu className={`w-6 h-6 ${textClass}`} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <Link to="/" className="flex items-center gap-1.5 font-bold text-lg" onClick={() => setMobileOpen(false)}>
                  <span className="text-rushkey-500">Rush</span>key
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100" aria-label="Close">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'bg-rushkey-50 text-rushkey-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <link.icon className="w-5 h-5" /> {link.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-100 p-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rushkey-500 to-rushkey-600 text-white flex items-center justify-center text-sm font-semibold">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[180px]">{user?.email || ''}</p>
                      </div>
                    </div>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                      <FiGrid className="w-5 h-5" /> Dashboard
                    </Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                      <FiLogOut className="w-5 h-5" /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" fullWidth>Login</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>
                      <Button variant="primary" fullWidth>Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
