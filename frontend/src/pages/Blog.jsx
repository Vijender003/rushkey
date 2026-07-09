import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const posts = [
  {
    title: 'Best PG Areas Near North Campus',
    desc: 'A complete guide to the top PG locations near Delhi University — Kamla Nagar, GTB Nagar, Vijay Nagar, and more.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    date: 'Mar 15, 2026',
    readTime: '4 min read',
  },
  {
    title: 'Cost of Living for DU Students',
    desc: 'Breakdown of monthly expenses including rent, food, transport, and utilities for students living near North Campus.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    date: 'Mar 10, 2026',
    readTime: '5 min read',
  },
  {
    title: 'Top 5 PGs in GTB Nagar',
    desc: 'Handpicked list of the best PGs in GTB Nagar with prices, amenities, and proximity to Delhi University.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    date: 'Mar 5, 2026',
    readTime: '3 min read',
  },
  {
    title: 'What to Check Before Moving Into a PG',
    desc: 'Essential checklist for students: from verifying amenities to understanding house rules and deposit policies.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    date: 'Feb 28, 2026',
    readTime: '6 min read',
  },
  {
    title: 'Girls PG vs Co-living: Which is Better?',
    desc: 'Compare the pros and cons of girls-only PGs versus co-living spaces for female students in Delhi.',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&q=80',
    date: 'Feb 20, 2026',
    readTime: '4 min read',
  },
  {
    title: 'How to Spot Fake PG Listings',
    desc: 'Red flags to watch out for and tips to avoid rental scams when searching for PGs online.',
    image: 'https://images.unsplash.com/photo-1564078516393-cf04bd62a0ad?w=600&q=80',
    date: 'Feb 15, 2026',
    readTime: '5 min read',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">Blog</h1>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">Tips, guides, and insights for students finding PGs in Delhi.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <Link to="/blog" className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1"><FiCalendar className="w-3 h-3" /> {post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1.5 group-hover:text-rushkey-600 transition-colors">{post.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-rushkey-600 mt-3 group-hover:gap-2 transition-all">
                    Read More <FiArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
