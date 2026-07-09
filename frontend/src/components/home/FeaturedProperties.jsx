import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FiStar, FiMapPin, FiArrowRight } from 'react-icons/fi';
import Card from '@/components/ui/Card';
import { getFeaturedPGs } from '@/services/pgService';

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] bg-gray-200 rounded-t-2xl" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-5 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}

export default function FeaturedProperties() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedPGs(8).then((data) => {
      setListings(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="bg-gray-50 px-4 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4"
        >
          <div>
            <span className="text-rushkey-500 text-sm font-semibold tracking-widest uppercase mb-3 block">Near Delhi University</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Featured PGs & Hostels</h2>
            <p className="text-gray-500 mt-2 max-w-lg">Handpicked accommodations near North Campus — trusted by thousands of DU students.</p>
          </div>
          <Link to="/search" className="group inline-flex items-center gap-2 text-rushkey-500 font-semibold text-sm hover:text-rushkey-600 transition-colors">
            View All <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <SkeletonCard />
                </div>
              ))
            : listings.map((property, i) => (
                <motion.div
                  key={property.id}
                  variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15, ease: [0.2, 0.65, 0.3, 0.9] } } }}
                >
                  <Link to={`/property/${property.id}`} className="group block">
                    <Card shadow="md" padding={false}>
                      <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl">
                        <img src={property.image} alt={property.title} loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded-full">{property.gender}</span>
                          <span className="bg-rushkey-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">{property.roomType}</span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full">
                            <FiStar className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {property.rating}
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-white font-bold text-lg leading-tight mb-1.5">{property.title}</h3>
                          <div className="flex items-center gap-1.5 text-white/70 text-sm mb-2">
                            <FiMapPin className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{property.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white font-bold text-xl">
                              {property.price}<span className="text-white/60 text-sm font-normal">{property.period}</span>
                            </span>
                            <span className="text-white/60 text-xs">{property.reviews} reviews</span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-rushkey-500/0 group-hover:bg-rushkey-500/10 transition-colors duration-500 pointer-events-none" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
}
