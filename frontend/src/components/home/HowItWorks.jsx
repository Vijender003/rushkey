import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSearch, FiEye, FiHome } from 'react-icons/fi';

const steps = [
  {
    icon: FiSearch,
    title: 'Search',
    description: 'Browse thousands of verified PGs, hostels, and rooms across top cities. Filter by your needs.',
    color: 'from-rushkey-500 to-orange-400',
  },
  {
    icon: FiEye,
    title: 'Explore',
    description: 'Take virtual tours, view high-res photos, check amenities, and read genuine reviews.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FiHome,
    title: 'Move In',
    description: 'Connect with the owner instantly, visit in person, and move in within 24 hours. No brokers.',
    color: 'from-blue-500 to-cyan-400',
  },
];

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: 'easeInOut', delay: 0.5 },
  },
};

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
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-rushkey-500 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Your new home in 3 steps
          </h2>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">
            No paperwork. No agents. Just pure simplicity.
          </p>
        </motion.div>

        <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-0.5">
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
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
              transition={{ delay: i * 0.25, duration: 0.6, ease: 'easeOut' }}
              className="relative flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.25 + 0.2, duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br p-0.5 mb-6 shadow-lg"
                style={{ backgroundImage: `linear-gradient(135deg, ${step.color.split(' ')[0].replace('from-', '')}, ${step.color.split(' ')[1].replace('to-', '')})` }}
              >
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-gray-900" />
                </div>
              </motion.div>

              <div className="absolute -top-1 left-1/2 -translate-x-1/2 md:hidden">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-xs font-bold text-gray-500">
                  0{i + 1}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
