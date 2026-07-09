import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiClock } from 'react-icons/fi';
import LeadForm from './LeadForm';
import { getOwnerInfo } from '@/services/leadService';
import { getUrgencyData } from '@/utils/urgencyData';

export default function OwnerCard({ property, onSchedule }) {
  const [revealed, setRevealed] = useState(false);
  const owner = getOwnerInfo(property?.location);

  const urgency = useMemo(() => getUrgencyData(property), [property?.id, property?.availability]);
  const { urgency: urgencyLine, viewsText, contactText } = urgency;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
      className="bg-white/90 backdrop-blur-xl border border-gray-200/80 rounded-3xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rushkey-500 to-orange-400 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-rushkey-500/20 shrink-0">
          {revealed ? owner.name.charAt(0) : '?'}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-gray-900 text-base truncate">
            {revealed ? owner.name : 'Property Owner'}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
            <FiShield className="w-3 h-3 text-green-500" />
            <span>{revealed ? 'Verified Owner' : 'Hidden · Unlock to view'}</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <span className="text-3xl font-extrabold text-gray-900">{property?.price}</span>
        <span className="text-gray-500 text-sm font-medium">{property?.period || '/month'}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-gray-50 rounded-xl px-3 py-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Type</p>
          <p className="text-sm font-semibold text-gray-800">{property?.roomType || 'PG'}</p>
        </div>
        <div className="bg-gray-50 rounded-xl px-3 py-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Gender</p>
          <p className="text-sm font-semibold text-gray-800 capitalize">{property?.gender || 'Any'}</p>
        </div>
        <div className="bg-gray-50 rounded-xl px-3 py-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Available</p>
          <p className="text-sm font-semibold text-gray-800 flex items-center justify-center gap-1">
            <FiClock className="w-3 h-3 text-green-500" /> Now
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl px-3 py-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Rating</p>
          <p className="text-sm font-semibold text-gray-800">{property?.rating || '4.0'} ★</p>
        </div>
      </div>

      <LeadForm property={property} onReveal={() => setRevealed(true)} />

      {!revealed && (
        <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
          <p className="text-xs text-gray-500">{urgencyLine}</p>
          <p className="text-xs text-gray-400">{viewsText}</p>
          <p className="text-xs text-gray-400">{contactText}</p>
        </div>
      )}

      {!revealed && (
        <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
          <FiShield className="w-3 h-3" />
          <span>Your information is safe with us</span>
        </div>
      )}
    </motion.div>
  );
}
