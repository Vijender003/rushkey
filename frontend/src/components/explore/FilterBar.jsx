import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const filters = [
  {
    key: 'priceRange',
    label: 'Price Range',
    type: 'range',
    options: ['All', 'Under ₹5K', '₹5-8K', '₹8-12K', '₹12-20K', '₹20K+'],
  },
  {
    key: 'ac',
    label: 'AC',
    type: 'toggle',
    options: ['All', 'AC', 'Non-AC'],
  },
  {
    key: 'food',
    label: 'Food',
    type: 'toggle',
    options: ['All', 'Included', 'Not Included'],
  },
  {
    key: 'sharing',
    label: 'Sharing',
    type: 'toggle',
    options: ['All', 'Single', 'Double', 'Triple'],
  },
  {
    key: 'rating',
    label: 'Rating',
    type: 'toggle',
    options: ['All', '4.5+', '4.0+', '3.5+'],
  },
  {
    key: 'amenities',
    label: 'WiFi',
    type: 'quick',
    options: ['All', 'WiFi', 'Parking', 'Gym', 'Laundry'],
  },
  {
    key: 'type',
    label: 'Type',
    type: 'quick',
    options: ['All', 'PG', 'Hostel', 'Apartment', 'Room'],
  },
];

function FilterPill({ label, active, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`relative whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shrink-0 ${
        active
          ? 'bg-rushkey-500 text-white shadow-lg shadow-rushkey-500/25'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
      }`}
    >
      {active && (
        <motion.span
          layoutId="activeFilter"
          className="absolute inset-0 bg-rushkey-500 rounded-full"
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

export default function FilterBar({ activeFilters, onFilterChange }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function scroll(dir) {
    const container = scrollRef.current;
    if (!container) return;
    const amount = 200;
    container.scrollBy({ left: dir * amount, behavior: 'smooth' });
    setTimeout(() => updateScrollState(), 300);
  }

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }
  const getActive = (filterKey, option) => {
    if (!activeFilters) return false;
    if (filterKey === 'priceRange') {
      return activeFilters.minPrice || activeFilters.maxPrice
        ? option !== 'All'
        : option === 'All';
    }
    if (filterKey === 'ac') {
      if (option === 'All') return !activeFilters.ac;
      return activeFilters.ac === option;
    }
    if (filterKey === 'food') {
      if (option === 'All') return !activeFilters.food;
      return activeFilters.food === option;
    }
    if (filterKey === 'sharing') {
      if (option === 'All') return !activeFilters.sharing;
      return activeFilters.sharing === option;
    }
    if (filterKey === 'rating') {
      if (option === 'All') return !activeFilters.minRating;
      return activeFilters.minRating === option.replace('+', '');
    }
    return false;
  };

  return (
    <div className="relative flex items-center gap-2">
      {canScrollLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors -ml-1"
        >
          <FiChevronLeft className="w-4 h-4" />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 px-0.5 w-full"
      >
        {filters.map((filter) =>
          filter.options.map((option) => (
            <FilterPill
              key={`${filter.key}-${option}`}
              label={option}
              active={getActive(filter.key, option)}
              onClick={() => onFilterChange(filter.key, option)}
            />
          ))
        )}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors -mr-1"
        >
          <FiChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
