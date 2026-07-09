import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiCopy, FiCheck } from 'react-icons/fi';

const brandAssets = [
  { name: 'Logo - Dark', color: '#1a1a2e' },
  { name: 'Logo - Light', color: '#ffffff' },
  { name: 'Icon - Square', color: '#ff5a1f' },
  { name: 'Icon - Circle', color: '#ff5a1f' },
];

export default function PressKit() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText('press@rushkey.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">Press Kit</h1>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">Resources and information for journalists, bloggers, and partners.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">About Rushkey</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Rushkey is a Delhi-based platform that connects students with verified PG accommodations near Delhi University. 
              Founded with the mission to make PG search simple, fast, and trustworthy, Rushkey offers zero-brokerage listings 
              across Kamla Nagar, GTB Nagar, Vijay Nagar, Mukherjee Nagar, and other areas near North Campus. Students can 
              browse listings, view photos and amenities, and directly contact PG owners — all from one platform.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Brand Assets</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {brandAssets.map((asset) => (
                <div key={asset.name} className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                  <div
                    className="w-full aspect-square rounded-xl mb-3 flex items-center justify-center"
                    style={{ backgroundColor: asset.color }}
                  >
                    <span className="font-bold text-sm" style={{ color: asset.color === '#1a1a2e' ? '#ff5a1f' : '#1a1a2e' }}>RK</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">{asset.name}</p>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-2 bg-rushkey-500 hover:bg-rushkey-600 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-rushkey-500/20 text-sm">
              <FiDownload className="w-4 h-4" /> Download All Assets (.zip)
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Product Description</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              One-liner: <span className="text-gray-800 font-medium">Find verified PGs near Delhi University — zero brokerage, instant contact.</span>
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Short description: Rushkey helps students find PGs and hostels near North Campus with real photos, 
              transparent pricing, and direct owner contact. No brokers, no hidden fees, no hassle.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Press Contact</h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rushkey-50 flex items-center justify-center shrink-0">
                <FiMail className="w-5 h-5 text-rushkey-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900">press@rushkey.com</p>
              </div>
              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 text-sm text-rushkey-600 hover:text-rushkey-700 font-medium"
              >
                {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
