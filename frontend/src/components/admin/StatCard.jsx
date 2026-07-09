import { motion } from 'framer-motion';

export default function StatCard({ label, value, icon: Icon, color = 'from-rushkey-500 to-orange-400', bg = 'bg-rushkey-50', index = 0, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -2 }}
      className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${bg} group-hover:scale-110 transition-transform duration-300`}>
          <div className={`w-5 h-5 rounded bg-gradient-to-br ${color}`} />
          <Icon className="w-5 h-5 text-white -mt-5 relative z-10" />
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-semibold ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 group-hover:text-rushkey-600 transition-colors">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </motion.div>
  );
}
