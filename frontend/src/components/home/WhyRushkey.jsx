import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiShield, FiPercent, FiSend, FiClock } from 'react-icons/fi';

const usps = [
  {
    icon: FiShield,
    title: '100% Verified Listings',
    description: 'Every property is manually verified by our team. No fake listings, no scams, no wasted visits. What you see is exactly what you get.',
    gradient: 'from-rushkey-500 to-orange-400',
    glow: 'rgba(255, 90, 31, 0.15)',
  },
  {
    icon: FiPercent,
    title: 'Zero Brokerage — Forever',
    description: 'No hidden fees, no agent commissions, no security deposit headaches. We connect you directly with verified owners. Completely free.',
    gradient: 'from-purple-500 to-pink-500',
    glow: 'rgba(147, 51, 234, 0.15)',
  },
  {
    icon: FiSend,
    title: 'Instant Owner Connect',
    description: 'Found a place you like? Contact the owner directly with one tap. No forms, no waiting, no middlemen wasting your time.',
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'rgba(59, 130, 246, 0.15)',
  },
  {
    icon: FiClock,
    title: 'Real-Time Availability',
    description: 'See live bed counts and availability. No more calling to ask "Is it still available?" Book with confidence, move in same day.',
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'rgba(16, 185, 129, 0.15)',
  },
];

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
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-rushkey-500 text-sm font-semibold tracking-widest uppercase mb-3 block">Why Rushkey</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Built differently. Built for you.</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">We stripped away everything broken about finding rentals. Here&apos;s what makes us different.</p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {usps.map((usp) => (
            <motion.div
              key={usp.title}
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl bg-white p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl"
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 60px ${usp.glow}`; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 0 transparent'; }}
            >
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${usp.gradient} p-3 shrink-0 shadow-lg`}>
                  <usp.icon className="w-full h-full text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{usp.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{usp.description}</p>
                </div>
              </div>
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${usp.glow}, transparent 60%)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
