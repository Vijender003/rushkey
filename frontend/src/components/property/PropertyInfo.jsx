import { motion } from 'framer-motion';
import { FiMapPin, FiStar, FiHome } from 'react-icons/fi';
import { BiBed, BiCalendar, BiRupee } from 'react-icons/bi';

const quickInfoVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const quickItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function PropertyInfo({ property }) {
  const { title, address, rating, price, type, gender, capacity, deposit, availableFrom } = property;

  const cityName = typeof address === 'string' ? address : address?.city || 'Delhi';
  const fullAddress = typeof address === 'string' ? address : [address?.street, address?.city, address?.state].filter(Boolean).join(', ') || 'Delhi';

  const quickInfo = [
    { icon: BiRupee, label: 'Rent', value: `₹${price?.toLocaleString('en-IN')}/mo` },
    { icon: BiRupee, label: 'Deposit', value: deposit ? `₹${deposit.toLocaleString('en-IN')}` : 'Negotiable' },
    { icon: BiBed, label: 'Room Type', value: type || 'PG' },
    { icon: BiCalendar, label: 'Available', value: availableFrom || 'Immediately' },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {title || 'Property Name'}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-gray-500">
              <FiMapPin className="w-4 h-4 shrink-0 text-gray-400" />
              <span className="text-sm truncate">{fullAddress}</span>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="flex items-center gap-1.5 bg-rushkey-50 rounded-xl px-3 py-2">
              <FiStar className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-gray-900">{rating?.toFixed(1) || '—'}</span>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="bg-rushkey-500/10 text-rushkey-600 text-xs font-bold px-3 py-1 rounded-full">
            {type || 'PG'}
          </span>
          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
            {gender || 'Co-living'}
          </span>
          {capacity && (
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
              Up to {capacity} guests
            </span>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={quickInfoVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {quickInfo.map((item) => (
          <motion.div
            key={item.label}
            variants={quickItemVariants}
            className="bg-gray-50 rounded-2xl p-4 border border-gray-100/80"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <item.icon className="w-4 h-4 text-rushkey-500" />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium">{item.label}</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">{item.value}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
