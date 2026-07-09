import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight, FiMessageSquare } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Ananya Sharma',
    role: 'Student, Christ University',
    avatar: 'AS',
    color: 'from-rushkey-500 to-orange-400',
    text: 'I found my PG within 2 hours of signing up. The place was exactly as shown in the photos. No broker, no drama. Rushkey is a lifesaver for students like me.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Software Engineer, Google',
    avatar: 'RV',
    color: 'from-purple-500 to-pink-500',
    text: 'After moving to Delhi for my job, Rushkey helped me find a place in Whitefield within a day. The instant connect feature is incredible. Highly recommended.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'Designer, Microsoft',
    avatar: 'PP',
    color: 'from-blue-500 to-cyan-400',
    text: 'I was tired of dealing with brokers who charge 1 month rent as commission. Rushkey is completely free and the listings are actually verified. Finally, a platform that cares.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Arjun Nair',
    role: 'Medical Student, St. John\'s',
    avatar: 'AN',
    color: 'from-emerald-500 to-teal-400',
    text: 'The map feature helped me find a hostel close to my college. Filtered by amenities, visited one place, and moved in the same day. Couldn\'t have asked for an easier process.',
    rating: 4,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  function goTo(index) {
    clearInterval(intervalRef.current);
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }

  function goPrev() {
    const next = (current - 1 + testimonials.length) % testimonials.length;
    setDirection(-1);
    setCurrent(next);
    clearInterval(intervalRef.current);
  }

  function goNext() {
    const next = (current + 1) % testimonials.length;
    setDirection(1);
    setCurrent(next);
    clearInterval(intervalRef.current);
  }

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      rotateY: dir > 0 ? 15 : -15,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      rotateY: dir > 0 ? -15 : 15,
      scale: 0.9,
    }),
  };

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
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Loved by thousands
          </h2>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">
            Hear from people who found their perfect stay with Rushkey.
          </p>
        </motion.div>

        <div className="relative max-w-2xl mx-auto perspective-[1000px]">
          <div className="relative min-h-[320px] sm:min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-full bg-gray-50 rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
                  <FiMessageSquare className="w-8 h-8 text-rushkey-500/20 mb-4" />
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 italic">
                    &ldquo;{testimonials[current].text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonials[current].color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                        {testimonials[current].avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{testimonials[current].name}</h4>
                        <p className="text-gray-500 text-xs">{testimonials[current].role}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonials[current].rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-8 h-2.5 bg-rushkey-500'
                      : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
