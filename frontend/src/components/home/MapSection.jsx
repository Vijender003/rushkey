import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMapPin, FiStar, FiNavigation } from 'react-icons/fi';

const locations = [
  {
    id: 1,
    title: 'Starlight Executive PG',
    price: '₹8,500',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
    top: '25%',
    left: '30%',
  },
  {
    id: 2,
    title: 'Urban Nest Studio',
    price: '₹12,000',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
    top: '45%',
    left: '55%',
  },
  {
    id: 3,
    title: 'Campus Inn Hostel',
    price: '₹6,500',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&q=80',
    top: '60%',
    left: '20%',
  },
  {
    id: 4,
    title: 'Skyline Premium PG',
    price: '₹15,000',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
    top: '35%',
    left: '70%',
  },
];

function PulsingPin({ active, onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`absolute cursor-pointer group z-10 transition-all duration-300 ${
        active ? 'scale-125 z-20' : ''
      }`}
    >
      <div className="relative">
        <span className={`absolute -inset-3 rounded-full animate-ping ${
          active ? 'bg-rushkey-500/30' : 'bg-rushkey-500/10'
        }`} />
        <div className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${
          active ? 'bg-rushkey-500 text-white' : 'bg-white text-rushkey-500 border-2 border-rushkey-500/30'
        }`}>
          <FiMapPin className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default function MapSection() {
  const [activeId, setActiveId] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const listRef = useRef(null);

  function scrollToList(id) {
    setActiveId(id);
    const el = listRef.current?.querySelector(`[data-id="${id}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <section ref={ref} className="bg-white px-4 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <span className="text-rushkey-500 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Explore by Map
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Find rooms near you
          </h2>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">
            See exactly where each property is located. Explore neighborhoods with confidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-6 rounded-3xl bg-gray-50 overflow-hidden shadow-sm border border-gray-100"
        >
          <div
            ref={listRef}
            className="w-full lg:w-[380px] xl:w-[420px] shrink-0 overflow-y-auto max-h-[500px] lg:max-h-[600px] p-4 space-y-3 scrollbar-thin"
          >
            {locations.map((loc, i) => (
              <motion.button
                key={loc.id}
                data-id={loc.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: 'easeOut' }}
                onClick={() => {
                  setActiveId(loc.id === activeId ? null : loc.id);
                  scrollToList(loc.id);
                }}
                className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                  activeId === loc.id
                    ? 'bg-white shadow-lg ring-2 ring-rushkey-500/20 scale-[1.02]'
                    : 'bg-white/60 hover:bg-white hover:shadow-md'
                }`}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img src={loc.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm truncate">{loc.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-rushkey-500 font-bold text-sm">{loc.price}<span className="text-gray-400 text-xs font-normal">/mo</span></span>
                    <span className="flex items-center gap-0.5 text-gray-500 text-xs">
                      <FiStar className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {loc.rating}
                    </span>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                  activeId === loc.id ? 'bg-rushkey-500' : 'bg-gray-300'
                }`} />
              </motion.button>
            ))}
          </div>

          <div className="flex-1 relative min-h-[400px] lg:min-h-[600px] bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 overflow-hidden rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <motion.div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                background: `radial-gradient(circle at 30% 40%, rgba(255,90,31,0.8) 0%, transparent 50%),
                            radial-gradient(circle at 70% 60%, rgba(147,51,234,0.6) 0%, transparent 50%),
                            radial-gradient(circle at 50% 80%, rgba(59,130,246,0.5) 0%, transparent 50%)`,
              }}
              animate={{
                backgroundPosition: ['0% 0%', '2% 3%', '-1% -2%', '0% 0%'],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
              <FiNavigation className="w-4 h-4 text-white/70" />
              <span className="text-white/70 text-xs font-medium">Delhi, India</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/30 text-xs">
              <span>Zoom: City View</span>
              <div className="flex gap-3">
                <span className="w-16 h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.span
                    className="block h-full bg-rushkey-500/50 rounded-full"
                    animate={{ width: ['30%', '70%', '40%', '60%', '30%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </span>
              </div>
            </div>

            {locations.map((loc) => (
              <PulsingPin
                key={loc.id}
                active={activeId === loc.id}
                onClick={() => setActiveId(loc.id === activeId ? null : loc.id)}
                style={{ top: loc.top, left: loc.left }}
              />
            ))}

            {activeId && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute bottom-16 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 max-w-sm"
              >
                {(() => {
                  const loc = locations.find((l) => l.id === activeId);
                  if (!loc) return null;
                  return (
                    <div className="flex items-center gap-3">
                      <img src={loc.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{loc.title}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-rushkey-500 font-bold text-sm">{loc.price}<span className="text-gray-400 text-xs font-normal">/mo</span></span>
                          <span className="flex items-center gap-0.5 text-gray-500 text-xs">
                            <FiStar className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {loc.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
