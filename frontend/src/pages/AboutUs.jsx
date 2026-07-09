import { motion } from 'framer-motion';
import { FiHeart, FiTarget, FiUsers, FiMapPin, FiHome } from 'react-icons/fi';

const stats = [
  { icon: FiHome, value: '30+', label: 'PG Listings' },
  { icon: FiUsers, value: '100+', label: 'Students Helped' },
  { icon: FiMapPin, value: '7', label: 'Areas Near North Campus' },
  { icon: FiHeart, value: '4.7', label: 'Average Rating' },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">About Delhi PG Finder</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">We make finding a PG near Delhi University simple, fast, and trustworthy.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm h-full">
              <div className="w-12 h-12 rounded-2xl bg-rushkey-50 flex items-center justify-center mb-4">
                <FiHeart className="w-6 h-6 text-rushkey-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Story</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Finding a PG near Delhi University has always been a challenge for students. High brokerage, fake listings, 
                and lack of transparency made the process frustrating and expensive.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed mt-3">
                We started Rushkey to change that. Our platform connects students directly with verified PG owners in 
                Kamla Nagar, GTB Nagar, Vijay Nagar, Mukherjee Nagar, and other areas around North Campus — with zero 
                brokerage and complete transparency.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm h-full">
              <div className="w-12 h-12 rounded-2xl bg-rushkey-50 flex items-center justify-center mb-4">
                <FiTarget className="w-6 h-6 text-rushkey-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                To make PG search simple, fast, and trustworthy for every student moving to Delhi. We believe that 
                finding a home should be the easiest part of your college journey, not the hardest.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed mt-3">
                Every feature we build — from instant owner contact to verified listings — is designed to save you 
                time, money, and stress. No brokers. No hidden fees. Just honest listings and direct connections.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
              <stat.icon className="w-6 h-6 text-rushkey-500 mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-gradient-to-br from-rushkey-500 to-orange-500 rounded-3xl p-8 sm:p-12 text-center text-white"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Ready to Find Your PG?</h2>
          <p className="text-white/80 max-w-lg mx-auto mb-6">
            Join 100+ students who found their perfect PG near Delhi University through Rushkey.
          </p>
          <a
            href="/search"
            className="inline-flex items-center gap-2 bg-white text-rushkey-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
          >
            Browse Listings
          </a>
        </motion.div>
      </div>
    </div>
  );
}
