import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiWifi, FiSun, FiCoffee, FiMonitor } from 'react-icons/fi';
import { BiFridge, BiCar, BiDumbbell, BiTv, BiWater } from 'react-icons/bi';
import { GiClothes } from 'react-icons/gi';

const amenityConfig = {
  WiFi: { icon: FiWifi, color: 'text-blue-500', bg: 'bg-blue-50' },
  AC: { icon: FiSun, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  Food: { icon: FiCoffee, color: 'text-amber-500', bg: 'bg-amber-50' },
  Laundry: { icon: GiClothes, color: 'text-purple-500', bg: 'bg-purple-50' },
  Parking: { icon: BiCar, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  Gym: { icon: BiDumbbell, color: 'text-rose-500', bg: 'bg-rose-50' },
  'Power Backup': { icon: BiWater, color: 'text-orange-500', bg: 'bg-orange-50' },
  TV: { icon: BiTv, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  Fridge: { icon: BiFridge, color: 'text-sky-500', bg: 'bg-sky-50' },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function AmenitiesGrid({ amenities = [] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const allAmenities = Object.keys(amenityConfig);
  const hasAmenities = amenities.length > 0;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5"
      >
        {allAmenities.map((name) => {
          const config = amenityConfig[name];
          const Icon = config.icon;
          const has = hasAmenities && amenities.includes(name);

          return (
            <motion.div
              key={name}
              variants={itemVariants}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all duration-300 ${
                has
                  ? `${config.bg} ${config.color} border-transparent shadow-sm`
                  : 'bg-gray-50 text-gray-300 border-gray-100'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                has ? `${config.bg}` : 'bg-gray-100'
              }`}>
                <Icon className={`w-5 h-5 ${has ? config.color : 'text-gray-300'}`} />
              </div>
              <span className={`text-sm font-medium ${has ? 'text-gray-800' : 'text-gray-300'}`}>
                {name}
              </span>
              {has && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto w-2 h-2 rounded-full"
                  style={{ backgroundColor: config.color.replace('text-', '').replace('-500', '') }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
