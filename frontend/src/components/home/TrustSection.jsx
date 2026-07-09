import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiHome, FiUserCheck, FiZap } from 'react-icons/fi';

const stats = [
  { value: 10000, suffix: '+', label: 'Rooms Listed', icon: FiHome },
  { value: 500, suffix: '+', label: 'Verified Owners', icon: FiUserCheck },
  { value: 1, suffix: ' Click', label: 'Instant Contact', icon: FiZap },
];

function AnimatedCounter({ target, suffix, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = Math.ceil(target / (duration * 60));
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  const displayCount = target >= 1000
    ? count >= 1000
      ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`
      : Math.floor(count).toString()
    : Math.floor(count).toString();

  return (
    <span ref={ref} className="tabular-nums">
      {displayCount}
      {suffix}
    </span>
  );
}

export default function TrustSection() {
  return (
    <section className="relative -mt-20 z-30 px-4 pb-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200/80 bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center py-10 px-6 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-rushkey-50 flex items-center justify-center mb-4">
                <stat.icon className="w-6 h-6 text-rushkey-500" />
              </div>
              <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
