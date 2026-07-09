import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiShield,
  FiPercent,
  FiSend,
  FiClock,
} from 'react-icons/fi';

const usps = [
  {
    icon: FiShield,
    title: 'Verified Listings',
    description: 'Every property is manually verified. No fake listings. No scams. What you see is what you get.',
    gradient: 'from-rushkey-500 to-orange-400',
    glow: 'rgba(255, 90, 31, 0.15)',
  },
  {
    icon: FiPercent,
    title: 'Zero Brokerage',
    description: 'No hidden fees, no agent commissions. We connect you directly with verified owners. 100% free.',
    gradient: 'from-purple-500 to-pink-500',
    glow: 'rgba(147, 51, 234, 0.15)',
  },
  {
    icon: FiSend,
    title: 'Instant Connect',
    description: 'Find a place you like? Contact the owner directly with one tap. No waiting, no middlemen.',
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'rgba(59, 130, 246, 0.15)',
  },
  {
    icon: FiClock,
    title: 'Real-time Availability',
    description: 'See live availability. No more calling to ask "Is it still available?" Book with confidence.',
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'rgba(16, 185, 129, 0.15)',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function WhyRushkey() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-gray-50 px-4 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-rushkey-500 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Why Rushkey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Built differently. Built for you.
          </h2>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">
            We stripped away everything broken about finding rentals.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {usps.map((usp) => (
            <motion.div
              key={usp.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl bg-white p-8 border border-gray-100 transition-shadow duration-300 hover:shadow-xl"
              style={{
                boxShadow: `0 0 0 0 ${usp.glow}`,
                transition: 'box-shadow 0.3s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 60px ${usp.glow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
              }}
            >
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${usp.gradient} p-3 shrink-0 shadow-lg shadow-current/20`}>
                  <usp.icon className="w-full h-full text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{usp.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {usp.description}
                  </p>
                </div>
              </div>

              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${usp.glow}, transparent 60%)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
