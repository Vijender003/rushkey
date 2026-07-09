import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiStar, FiNavigation, FiMinus, FiPlus } from 'react-icons/fi';

// TODO: Replace with real property coordinates from props
const mockPins = [
  { id: '1', top: '22%', left: '28%', price: '₹8,500', title: 'Starlight Executive PG', rating: 4.8 },
  { id: '2', top: '38%', left: '55%', price: '₹12,000', title: 'Urban Nest Studio', rating: 4.9 },
  { id: '3', top: '55%', left: '18%', price: '₹6,500', title: 'Campus Inn Hostel', rating: 4.7 },
  { id: '4', top: '48%', left: '72%', price: '₹15,000', title: 'Skyline Premium PG', rating: 4.9 },
  { id: '5', top: '68%', left: '45%', price: '₹9,000', title: 'Green Valley PG', rating: 4.6 },
  { id: '6', top: '30%', left: '80%', price: '₹7,500', title: 'Lake View Hostel', rating: 4.5 },
];

function MapPin({ pin, isActive, isHovered, onClick }) {
  const highlighted = isActive || isHovered;

  return (
    <div
      onClick={onClick}
      style={{ top: pin.top, left: pin.left }}
      className={`absolute cursor-pointer group z-10 transition-all duration-300 ${
        highlighted ? 'scale-125 z-20' : ''
      }`}
    >
      <div className="relative flex flex-col items-center">
        <AnimatePresence>
          {highlighted && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.8 }}
              className="absolute bottom-full mb-2 bg-white rounded-xl shadow-2xl border border-gray-100 px-3 py-2 min-w-[130px]"
            >
              <p className="text-gray-900 font-bold text-xs">{pin.title}</p>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-rushkey-500 font-bold text-xs">{pin.price}<span className="text-gray-400 font-normal">/mo</span></span>
                <span className="flex items-center gap-0.5 text-xs text-gray-500">
                  <FiStar className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {pin.rating}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{
            scale: highlighted ? [1, 1.3, 1] : 1,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`relative w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all ${
            highlighted
              ? 'bg-rushkey-500 text-white shadow-rushkey-500/40'
              : 'bg-white text-rushkey-500 border-2 border-rushkey-200 hover:border-rushkey-500'
          }`}
        >
          <FiMapPin className="w-4 h-4" />
        </motion.div>

        {highlighted && (
          <motion.span
            layoutId="pinRing"
            className="absolute -inset-2 rounded-full border-2 border-rushkey-500/40"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          />
        )}

        <span
          className={`absolute -inset-4 rounded-full animate-ping ${
            highlighted ? 'bg-rushkey-500/20' : 'bg-rushkey-500/5'
          }`}
        />
      </div>
    </div>
  );
}

export default function MapWidget({ hoveredId, activePin, onPinClick }) {
  const [zoomLevel] = useState(65);

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-full bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 rounded-2xl overflow-hidden shadow-sm">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background: `radial-gradient(circle at 28% 22%, rgba(255,90,31,0.8) 0%, transparent 40%),
                      radial-gradient(circle at 55% 38%, rgba(147,51,234,0.6) 0%, transparent 40%),
                      radial-gradient(circle at 72% 48%, rgba(59,130,246,0.5) 0%, transparent 40%),
                      radial-gradient(circle at 45% 68%, rgba(16,185,129,0.4) 0%, transparent 40%)`,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '3% 2%', '-1% -2%', '0% 0%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 400 300" preserveAspectRatio="none">
        <path d="M0,150 Q100,100 200,150 T400,150" fill="none" stroke="white" strokeWidth="1" />
        <path d="M0,200 Q80,160 180,200 T400,190" fill="none" stroke="white" strokeWidth="0.5" />
        <path d="M0,100 Q120,70 220,110 T400,100" fill="none" stroke="white" strokeWidth="0.5" />
        <circle cx="80" cy="180" r="2" fill="white" opacity="0.3" />
        <circle cx="200" cy="120" r="1.5" fill="white" opacity="0.2" />
        <circle cx="320" cy="200" r="2.5" fill="white" opacity="0.25" />
        <circle cx="150" cy="80" r="1.5" fill="white" opacity="0.2" />
        <circle cx="280" cy="160" r="2" fill="white" opacity="0.3" />
      </svg>

      <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5 shadow-sm">
        <FiNavigation className="w-3.5 h-3.5 text-white/70" />
        <span className="text-white/70 text-xs font-medium">Bangalore</span>
      </div>

      <div className="absolute top-3 right-3 flex flex-col gap-1.5">
        <button className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
          <FiPlus className="w-4 h-4 text-white/70" />
        </button>
        <button className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
          <FiMinus className="w-4 h-4 text-white/70" />
        </button>
      </div>

      {mockPins.map((pin) => (
        <MapPin
          key={pin.id}
          pin={pin}
          isActive={activePin === pin.id}
          isHovered={hoveredId === pin.id}
          onClick={() => onPinClick?.(pin.id)}
        />
      ))}

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/25 text-xs">
        <span>© Rushkey Maps</span>
        <div className="flex items-center gap-3">
          <span>Satellite</span>
          <span className="text-white/50">•</span>
          <span className="text-white/50">Streets</span>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 flex items-center gap-1">
        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-rushkey-500/50 rounded-full"
            animate={{ width: [`${zoomLevel}%`, `${zoomLevel + 10}%`, `${zoomLevel}%`] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
}
