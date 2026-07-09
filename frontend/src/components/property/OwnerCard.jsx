import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FiPhone, FiMessageCircle, FiCalendar, FiShield, FiClock, FiHome } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

function MagneticButton({ children, className = '', onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 12 });
  const sy = useSpring(y, { stiffness: 250, damping: 12 });

  function handleMouse(e) {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2) * 8;
    const dy = (e.clientY - cy) / (rect.height / 2) * 8;
    x.set(dx);
    y.set(dy);
  }

  function handleLeave() {
    x.set(0); y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function OwnerCard({ property, onContact, onSchedule }) {
  const { owner, price, type, gender, capacity } = property;

  const ownerName = owner?.name || 'Property Owner';
  const ownerPhone = owner?.phone || '+91 XXXXX XXXXX';
  const avatarLetter = ownerName.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
      className="bg-white/90 backdrop-blur-xl border border-gray-200/80 rounded-3xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rushkey-500 to-orange-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-rushkey-500/20">
            {avatarLetter}
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-gray-900 text-lg truncate">{ownerName}</h3>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
            <FiShield className="w-3.5 h-3.5 text-green-500" />
            <span>Verified Owner</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-5">
        <span className="text-3xl font-extrabold text-gray-900">₹{price?.toLocaleString('en-IN')}</span>
        <span className="text-gray-500 text-sm font-medium">/month</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="bg-gray-50 rounded-xl px-3 py-2.5 text-center">
          <p className="text-xs text-gray-500">Type</p>
          <p className="text-sm font-semibold text-gray-800 capitalize">{type || 'PG'}</p>
        </div>
        <div className="bg-gray-50 rounded-xl px-3 py-2.5 text-center">
          <p className="text-xs text-gray-500">Gender</p>
          <p className="text-sm font-semibold text-gray-800 capitalize">{gender || 'Any'}</p>
        </div>
        {capacity && (
          <div className="bg-gray-50 rounded-xl px-3 py-2.5 text-center">
            <p className="text-xs text-gray-500">Capacity</p>
            <p className="text-sm font-semibold text-gray-800">{capacity} persons</p>
          </div>
        )}
        <div className="bg-gray-50 rounded-xl px-3 py-2.5 text-center">
          <p className="text-xs text-gray-500">Available</p>
          <p className="text-sm font-semibold text-gray-800 flex items-center justify-center gap-1">
            <FiClock className="w-3 h-3 text-green-500" />
            Now
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        <MagneticButton
          onClick={onContact}
          className="w-full flex items-center justify-center gap-2.5 bg-rushkey-500 hover:bg-rushkey-600 text-white font-bold py-3.5 rounded-2xl transition-colors shadow-lg shadow-rushkey-500/25"
        >
          <FiPhone className="w-4 h-4" />
          Contact Now
        </MagneticButton>

        <MagneticButton
          onClick={onSchedule}
          className="w-full flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-2xl transition-colors shadow-lg shadow-emerald-500/20"
        >
          <FaWhatsapp className="w-4 h-4" />
          WhatsApp
        </MagneticButton>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={onSchedule}
          className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-rushkey-500 transition-colors py-2"
        >
          <FiCalendar className="w-4 h-4" />
          Schedule a Visit
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
        <FiShield className="w-3 h-3" />
        <span>Your information is safe with us</span>
      </div>
    </motion.div>
  );
}
