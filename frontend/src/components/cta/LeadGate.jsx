import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiX, FiShield, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { saveLead, getOwnerInfo } from '@/services/leadService';

export default function LeadGate({ property, onClose, onLeadSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('form');
  const owner = getOwnerInfo(property?.location);

  if (!property) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameTrimmed = name.trim();
    const phoneTrimmed = phone.trim();
    if (!nameTrimmed || phoneTrimmed.length !== 10 || !/^\d{10}$/.test(phoneTrimmed)) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    saveLead({ name: nameTrimmed, phone: phoneTrimmed, pgId: property.id, pgTitle: property.title });
    setLoading(false);
    setStep('revealed');
    onLeadSubmit?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {step === 'revealed' ? 'Contact Unlocked!' : 'Unlock Owner Details'}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {step === 'revealed' ? 'You can now call or WhatsApp the owner.' : 'Enter your details to view contact info'}
            </p>
          </div>
          {step !== 'revealed' && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 shrink-0"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="px-6 pb-6 pt-2">
          {step === 'form' && (
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
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  'Get Owner Details'
                )}
              </button>
              <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                <FiShield className="w-3 h-3 text-green-400" />
                <span>Your details are safe & private</span>
              </div>
            </form>
          )}

          {step === 'revealed' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                  <FiPhone className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-emerald-800 font-bold text-sm">{owner.phone}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${owner.phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-2 bg-rushkey-500 hover:bg-rushkey-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-rushkey-500/20 active:scale-[0.97]"
                >
                  <FiPhone className="w-4 h-4" /> Call Now
                </a>
                <a
                  href={`https://wa.me/${owner.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi! I am interested in "${property.title}" located in ${property.location}. Please share more details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.97]"
                >
                  <FaWhatsapp className="w-4 h-4" /> WhatsApp
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <FiClock className="w-3 h-3" />
                <span>⚡ Expected instant response from owner</span>
              </div>

              <button
                onClick={onClose}
                className="w-full text-sm text-gray-500 py-2 hover:text-gray-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
