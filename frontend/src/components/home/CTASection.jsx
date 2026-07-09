import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight, FiShield } from 'react-icons/fi';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative px-4 py-28 sm:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900" />

      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 20% 50%, rgba(255,90,0,0.4) 0%, transparent 50%),
                      radial-gradient(circle at 80% 30%, rgba(147,51,234,0.3) 0%, transparent 50%),
                      radial-gradient(circle at 50% 80%, rgba(59,130,246,0.2) 0%, transparent 50%)`,
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-rushkey-400 animate-pulse" />
            <span className="text-white/60 text-xs font-medium tracking-wide uppercase">
              Your Delhi PG search ends here
            </span>
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
            Find Your PG
            <br />
            <span className="bg-gradient-to-r from-rushkey-400 via-rushkey-500 to-orange-400 bg-clip-text text-transparent">
              Faster.
            </span>
          </h2>

          <p className="text-white/50 text-lg sm:text-xl max-w-xl mx-auto mb-10 font-light">
            Join 100+ students who found their perfect PG near Delhi University through Rushkey. No brokers. No hassle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-2 bg-rushkey-500 text-white font-bold text-lg px-10 py-4 rounded-full overflow-hidden shadow-2xl shadow-rushkey-500/30 transition-shadow hover:shadow-rushkey-500/50"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-rushkey-600 to-rushkey-500"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ backgroundSize: '200% 100%' }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Explore PGs
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>

            <Link to="/safety-tips">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/20 transition-colors"
              >
                <FiShield className="w-4 h-4" />
                Safety Tips
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
