import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiShield, FiClock, FiUsers, FiCheckCircle, FiCopy } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { HiEye } from 'react-icons/hi';
import { saveLead, hasLeadForProperty, getLeadForProperty, getOwnerInfo } from '@/services/leadService';
import { useToast } from '@/components/admin/Toast';

export default function LeadForm({ property, onReveal }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (property?.id && hasLeadForProperty(property.id)) {
      setRevealed(true);
    }
  }, [property?.id]);

  const owner = getOwnerInfo(property?.location);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameTrimmed = name.trim();
    const phoneTrimmed = phone.trim();

    if (!nameTrimmed) {
      toast('Please enter your name', 'error');
      return;
    }
    if (phoneTrimmed.length !== 10 || !/^\d{10}$/.test(phoneTrimmed)) {
      toast('Please enter a valid 10-digit phone number', 'error');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    saveLead({
      name: nameTrimmed,
      phone: phoneTrimmed,
      pgId: property?.id,
      pgTitle: property?.title,
    });

    setLoading(false);
    setRevealed(true);
    onReveal?.();
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast('Copied to clipboard', 'success');
  };

  if (revealed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2"
          >
            <FiCheckCircle className="w-6 h-6 text-emerald-600" />
          </motion.div>
          <p className="text-emerald-800 font-bold text-sm">Owner Details Unlocked!</p>
        </div>

        <div
          onClick={() => handleCopy(owner.phone)}
          className="bg-white border border-gray-200 rounded-2xl p-4 hover:border-rushkey-300 cursor-pointer transition-colors group"
        >
          <p className="text-xs text-gray-400 mb-1">Phone</p>
          <div className="flex items-center justify-between">
            <a href={`tel:${owner.phone}`} className="text-lg font-bold text-gray-900 hover:text-rushkey-600 transition-colors">
              {owner.phone}
            </a>
            <FiCopy className={`w-4 h-4 ${copied ? 'text-emerald-500' : 'text-gray-300 group-hover:text-gray-500'} transition-colors`} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <p className="text-xs text-gray-400 mb-1">Address</p>
          <p className="text-sm font-medium text-gray-800">{owner.address}</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={`tel:${owner.phone}`}
            className="flex items-center justify-center gap-2 bg-rushkey-500 hover:bg-rushkey-600 text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-rushkey-500/20"
          >
            <FiPhone className="w-4 h-4" /> Call Now
          </a>
          <a
            href={`https://wa.me/91${owner.phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
          >
            <FaWhatsapp className="w-4 h-4" /> WhatsApp
          </a>
        </div>

        <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
          <FiShield className="w-3 h-3" /> Your details are safe with us
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul Kumar"
            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rushkey-500/20 focus:border-rushkey-500 transition-all"
            autoComplete="name"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">+91</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="9876543210"
              className="w-full pl-12 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rushkey-500/20 focus:border-rushkey-500 transition-all"
              autoComplete="tel"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rushkey-500 to-orange-500 hover:from-rushkey-600 hover:to-orange-600 text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-rushkey-500/25 disabled:opacity-70"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Connecting...
            </>
          ) : (
            <>
              <HiEye className="w-4 h-4" /> Get Owner Details
            </>
          )}
        </button>
      </form>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <FiShield className="w-3.5 h-3.5 text-green-400" />
          <span>Your details are safe & private</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <FiClock className="w-3.5 h-3.5 text-rushkey-400" />
          <span>Get instant response from owner</span>
        </div>
      </div>
    </motion.div>
  );
}
