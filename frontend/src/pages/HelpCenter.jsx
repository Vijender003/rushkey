import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiBookOpen, FiShield, FiUser, FiCreditCard, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const categories = [
  { icon: FiBookOpen, title: 'Booking & Contact', desc: 'How to book and contact PG owners', to: '/faq' },
  { icon: FiCreditCard, title: 'Payments', desc: 'Pricing, deposits, and refunds', to: '/faq' },
  { icon: FiShield, title: 'PG Information', desc: 'Amenities, rules, and what to expect', to: '/faq' },
  { icon: FiUser, title: 'Account', desc: 'Login, profile, and settings', to: '/faq' },
];

const faqPreviews = [
  { q: 'How do I contact the PG owner?', a: 'Use the Call or WhatsApp button on the property page after submitting your details.' },
  { q: 'Are the listings verified?', a: 'We verify listings to the best of our ability, but we always recommend visiting the PG in person before paying.' },
  { q: 'Is there any brokerage fee?', a: 'No. Rushkey is completely free for students. We do not charge any brokerage or commission.' },
];

export default function HelpCenter() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">Help Center</h1>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">Find answers to common questions about booking, payments, and more.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-xl mx-auto mb-14">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rushkey-500/20 focus:border-rushkey-500 transition-all shadow-sm"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              <Link
                to={cat.to}
                className="block bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all group h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-rushkey-50 flex items-center justify-center mb-3 group-hover:bg-rushkey-100 transition-colors">
                  <cat.icon className="w-5 h-5 text-rushkey-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{cat.title}</h3>
                <p className="text-sm text-gray-500">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Common Questions</h2>
          <div className="space-y-3">
            {faqPreviews.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-1">{faq.q}</h3>
                <p className="text-sm text-gray-500">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/faq" className="inline-flex items-center gap-1 text-rushkey-600 font-medium text-sm hover:text-rushkey-700 transition-colors">
              View all FAQs <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
