import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FiStar, FiMapPin, FiArrowRight } from 'react-icons/fi';

const properties = [
  {
    id: '1',
    title: 'Starlight Executive PG',
    location: 'Koramangala, Bangalore',
    price: '₹8,500',
    period: '/month',
    rating: 4.8,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    type: 'PG',
    gender: 'Boys',
  },
  {
    id: '2',
    title: 'Urban Nest Studio',
    location: 'HSR Layout, Bangalore',
    price: '₹12,000',
    period: '/month',
    rating: 4.9,
    reviews: 38,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    type: 'Studio',
    gender: 'Co-living',
  },
  {
    id: '3',
    title: 'Campus Inn Hostel',
    location: 'Indiranagar, Bangalore',
    price: '₹6,500',
    period: '/month',
    rating: 4.7,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
    type: 'Hostel',
    gender: 'Girls',
  },
  {
    id: '4',
    title: 'Skyline Premium PG',
    location: 'Whitefield, Bangalore',
    price: '₹15,000',
    period: '/month',
    rating: 4.9,
    reviews: 29,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    type: 'PG',
    gender: 'Co-living',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
  },
};

export default function FeaturedProperties() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-gray-50 px-4 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4"
        >
          <div>
            <span className="text-rushkey-500 text-sm font-semibold tracking-widest uppercase mb-3 block">
              Curated Stays
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Featured Properties
            </h2>
            <p className="text-gray-500 mt-2 max-w-lg">
              Handpicked accommodations loved by students and professionals across top cities.
            </p>
          </div>
          <Link
            to="/search"
            className="group inline-flex items-center gap-2 text-rushkey-500 font-semibold text-sm hover:text-rushkey-600 transition-colors"
          >
            View All
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {properties.map((property) => (
            <motion.div key={property.id} variants={cardVariants}>
              <Link
                to={`/property/${property.id}`}
                className="group block relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                      {property.type}
                    </span>
                    <span className="bg-rushkey-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                      {property.gender}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full">
                      <FiStar className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {property.rating}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-bold text-lg leading-tight mb-1.5">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/70 text-sm mb-2">
                      <FiMapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-xl">
                        {property.price}
                        <span className="text-white/60 text-sm font-normal">{property.period}</span>
                      </span>
                      <span className="text-white/60 text-xs">
                        {property.reviews} reviews
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-rushkey-500/0 group-hover:bg-rushkey-500/10 transition-colors duration-500 pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
