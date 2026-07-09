import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  FiSearch,
  FiMapPin,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi';

const floatingCards = [
  {
    id: 1,
    price: '₹8,500/mo',
    title: 'Starlight PG',
    rating: 4.8,
    color: 'from-rose-400 to-orange-300',
    x: '15%',
    y: '25%',
    delay: 0,
  },
  {
    id: 2,
    price: '₹12,000/mo',
    title: 'Urban Nest',
    rating: 4.9,
    color: 'from-blue-400 to-cyan-300',
    x: '75%',
    y: '20%',
    delay: 1.5,
  },
  {
    id: 3,
    price: '₹6,500/mo',
    title: 'Campus Inn',
    rating: 4.7,
    color: 'from-purple-400 to-pink-300',
    x: '10%',
    y: '60%',
    delay: 3,
  },
];

const headlineWords = ['Move', 'In', 'Before', 'You', 'Even', 'Blink'];

function MagneticButton({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 15 });
  const springY = useSpring(y, { stiffness: 300, damping: 15 });

  function handleMouse(e) {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );
    const maxDist = 200;
    if (dist > maxDist) {
      x.set(0); y.set(0);
      return;
    }
    const strength = 12;
    const deltaX = (e.clientX - centerX) / (rect.width / 2) * strength;
    const deltaY = (e.clientY - centerY) / (rect.height / 2) * strength;
    x.set(deltaX);
    y.set(deltaY);
  }

  function handleLeave() {
    x.set(0); y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

function Orb({ size, color1, color2, duration, x, y }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1}, ${color2})`,
      }}
      animate={{
        x: [x, x + 80, x - 40, x + 60, x],
        y: [y, y - 60, y + 80, y - 30, y],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

function FloatingCard({ card, index }) {
  return (
    <motion.div
      className="absolute hidden lg:block pointer-events-none"
      style={{ left: card.x, top: card.y }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + index * 0.3, duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
        className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-3 pr-5 shadow-2xl"
      >
        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
          <FiTrendingUp className="w-5 h-5" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{card.title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-white/80 text-xs font-medium">{card.price}</span>
            <span className="flex items-center gap-0.5 text-yellow-300 text-xs">
              <FiStar className="w-3 h-3 fill-yellow-300" />
              {card.rating}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroSearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [suggestions] = useState([
    'Bangalore',
    'Mumbai',
    'Delhi',
    'Pune',
    'Hyderabad',
    'Chennai',
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filtered = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?city=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <motion.div
        animate={{
          scale: focused ? 1.02 : 1,
          boxShadow: focused
            ? '0 8px 40px rgba(255, 90, 31, 0.25)'
            : '0 4px 20px rgba(0, 0, 0, 0.15)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-2xl border border-white/25 pl-5 pr-2 py-2"
      >
        <FiMapPin className="w-5 h-5 text-white/60 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            setFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => {
            setFocused(false);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          placeholder="Search by city, locality, or PG name..."
          className="flex-1 bg-transparent text-white placeholder-white/50 text-base outline-none py-2.5 min-w-0"
        />
        <MagneticButton>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-rushkey-500 hover:bg-rushkey-600 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg shadow-rushkey-500/30"
          >
            <FiSearch className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </motion.button>
        </MagneticButton>
      </motion.div>

      <AnimatePresence>
        {showSuggestions && query && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full mt-2 left-0 right-0 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden origin-top"
          >
            {filtered.map((city) => (
              <button
                key={city}
                type="button"
                onMouseDown={() => {
                  setQuery(city);
                  setShowSuggestions(false);
                }}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-gray-700 hover:bg-rushkey-50 hover:text-rushkey-600 transition-colors text-left text-sm font-medium"
              >
                <FiMapPin className="w-4 h-4 text-gray-400" />
                {city}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center gap-4 mt-4 text-white/50 text-xs">
        <span className="text-white/40">Popular:</span>
        {['Bangalore', 'Mumbai', 'Pune'].map((city) => (
          <button
            key={city}
            type="button"
            onMouseDown={() => {
              setQuery(city);
            }}
            className="hover:text-white transition-colors"
          >
            {city}
          </button>
        ))}
      </div>
    </form>
  );
}

function AnimatedLogo() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6"
    >
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rushkey-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-rushkey-500" />
      </span>
      <span className="text-white/80 text-xs font-medium tracking-wide uppercase">
        Instant Moving — No Brokerage
      </span>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />

      <Orb size={600} color1="rgba(255, 90, 31, 0.25)" color2="transparent" duration={20} x={100} y={-200} />
      <Orb size={450} color1="rgba(147, 51, 234, 0.15)" color2="transparent" duration={25} x={700} y={100} />
      <Orb size={350} color1="rgba(59, 130, 246, 0.12)" color2="transparent" duration={18} x={-50} y={400} />
      <Orb size={500} color1="rgba(255, 90, 31, 0.15)" color2="transparent" duration={22} x={500} y={500} />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {floatingCards.map((card, i) => (
        <FloatingCard key={card.id} card={card} index={i} />
      ))}

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <AnimatedLogo />

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 60, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          >
            Find verified PGs instantly. No brokers. No friction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' }}
          >
            <HeroSearchBar />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-20" />
    </section>
  );
}
