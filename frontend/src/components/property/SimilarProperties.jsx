import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar, FiMapPin } from 'react-icons/fi';

const fallbackProperties = [
  {
    _id: 's1',
    title: 'Starlight Executive PG',
    address: { city: 'Bangalore' },
    price: 8500,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80'],
    type: 'PG',
  },
  {
    _id: 's2',
    title: 'Urban Nest Studio',
    address: { city: 'Bangalore' },
    price: 12000,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80'],
    type: 'Studio',
  },
  {
    _id: 's3',
    title: 'Campus Inn Hostel',
    address: { city: 'Bangalore' },
    price: 6500,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&q=80'],
    type: 'Hostel',
  },
  {
    _id: 's4',
    title: 'Skyline Premium PG',
    address: { city: 'Bangalore' },
    price: 15000,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80'],
    type: 'PG',
  },
  {
    _id: 's5',
    title: 'Green Valley PG',
    address: { city: 'Bangalore' },
    price: 9000,
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&q=80'],
    type: 'PG',
  },
];

export default function SimilarProperties({ properties = fallbackProperties }) {
  const scrollRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const items = properties.length > 0 ? properties : fallbackProperties;

  function scroll(dir) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: 'smooth' });
  }

  return (
    <section ref={ref} className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex items-center justify-between mb-4"
      >
        <h2 className="text-xl font-bold text-gray-900">Similar Properties</h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll(-1)}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1"
      >
        {items.map((p, i) => {
          const imgSrc = p.images?.[0] || fallbackProperties[i % fallbackProperties.length].images[0];
          const cityName = typeof p.address === 'string' ? p.address : p.address?.city || 'Bangalore';

          return (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
              className="shrink-0 w-[260px]"
            >
              <Link
                to={`/property/${p._id}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={imgSrc}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-bold text-gray-900 shadow-sm">
                    {p.type}
                  </div>
                </div>
                <div className="p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate flex-1">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <FiStar className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">{p.rating?.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <FiMapPin className="w-3 h-3 shrink-0 text-gray-400" />
                    <span className="truncate">{cityName}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    <span className="text-sm font-bold text-gray-900">
                      ₹{p.price?.toLocaleString('en-IN')}
                      <span className="text-gray-400 text-xs font-normal">/mo</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
