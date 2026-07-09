import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMapPin, FiNavigation } from 'react-icons/fi';

const nearbyPlaces = [
  { icon: FiNavigation, name: 'Metro Station', distance: '0.8 km', time: '5 min walk' },
  { icon: FiMapPin, name: 'University / College', distance: '1.2 km', time: '10 min walk' },
  { icon: FiNavigation, name: 'Market / Mall', distance: '0.5 km', time: '3 min walk' },
];

export default function MapSection({ property }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const { address } = property;
  const cityName = typeof address === 'string' ? address : address?.city || 'Delhi';

  return (
    <section ref={ref} className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-1">Location & Nearby</h2>
        <p className="text-sm text-gray-500 mb-5 flex items-center gap-1.5">
          <FiMapPin className="w-4 h-4 text-rushkey-500" />
          {cityName}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 rounded-3xl overflow-hidden relative min-h-[300px] shadow-sm border border-gray-200/20"
      >
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <motion.div className="absolute inset-0 opacity-[0.07]"
          style={{
            background: `radial-gradient(circle at 40% 50%, rgba(255,90,31,0.8) 0%, transparent 50%)`,
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <path d="M0,150 Q100,100 200,150 T400,150" fill="none" stroke="white" strokeWidth="1" />
          <path d="M0,200 Q80,160 180,200 T400,190" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="120" cy="140" r="2" fill="white" opacity="0.3" />
          <circle cx="280" cy="160" r="1.5" fill="white" opacity="0.2" />
          <circle cx="200" cy="120" r="2.5" fill="white" opacity="0.25" />
        </svg>

        <div className="relative z-10 p-5">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3.5 py-2 w-fit mb-4">
            <FiNavigation className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-xs font-medium">{cityName}</span>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <span className="absolute -inset-3 rounded-full bg-rushkey-500/20 animate-ping" />
              <div className="relative w-12 h-12 rounded-full bg-rushkey-500 flex items-center justify-center shadow-xl shadow-rushkey-500/30">
                <FiMapPin className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {nearbyPlaces.map((place, i) => (
                <motion.div
                  key={place.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: 'easeOut' }}
                  className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md rounded-xl px-3.5 py-2.5 border border-white/20"
                >
                  <div className="w-8 h-8 rounded-lg bg-rushkey-50 flex items-center justify-center shrink-0">
                    <place.icon className="w-4 h-4 text-rushkey-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{place.name}</p>
                    <p className="text-xs text-gray-500">{place.distance} · {place.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
