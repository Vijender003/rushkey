import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSearch, FiEye, FiHome } from 'react-icons/fi';

const steps = [
  {
    icon: FiSearch,
    title: 'Search & Filter',
    description: 'Browse 500+ verified properties across top cities. Filter by budget, location, amenities, and gender to find your perfect match.',
    color: 'from-rushkey-500 to-orange-400',
  },
  {
    icon: FiEye,
    title: 'Explore Virtually',
    description: 'View high-res photos, check amenities, read genuine reviews from past tenants, and see live availability — all from your phone.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FiHome,
    title: 'Move In Today',
    description: 'Connect with the owner directly, visit in person, and move in within 24 hours. No brokers, no paperwork, no hidden fees.',
    color: 'from-blue-500 to-cyan-400',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-white px-4 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-rushkey-500 text-sm font-semibold tracking-widest uppercase mb-3 block">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Your new home in 3 simple steps</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">Find, visit, and move in — all within a day. No brokers. No drama.</p>
        </motion.div>

        <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-0.5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.5 }}
              className="h-full bg-gradient-to-r from-rushkey-500 via-purple-500 to-blue-500 origin-left"
              style={{ transformOrigin: 'left center' }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.25, duration: 0.6 }}
              className="relative flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.25 + 0.2, duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-rushkey-500 to-orange-400 p-0.5 mb-6 shadow-lg"
              >
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-gray-900" />
                </div>
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
