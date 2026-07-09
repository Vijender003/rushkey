import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiSliders,
  FiChevronDown,
  FiRotateCcw,
} from 'react-icons/fi';
import {
  PROPERTY_TYPES,
  GENDER_OPTIONS,
  AMENITIES_LIST,
  SORT_OPTIONS,
} from '@/lib/constants';
import Button from '@/components/ui/Button';

const sortLabels = {
  price_low: 'Price: Low to High',
  price_high: 'Price: High to Low',
  rating: 'Highest Rated',
  newest: 'Newest First',
};

export default function FilterPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const [priceMin, setPriceMin] = useState(searchParams.get('priceMin') || '');
  const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') || '');
  const [types, setTypes] = useState(() => {
    const t = searchParams.get('type');
    return t ? t.split(',') : [];
  });
  const [genders, setGenders] = useState(() => {
    const g = searchParams.get('gender');
    return g ? g.split(',') : [];
  });
  const [selectedAmenities, setSelectedAmenities] = useState(() => {
    const a = searchParams.get('amenities');
    return a ? a.split(',') : [];
  });
  const [sort, setSort] = useState(searchParams.get('sort') || '');

  const [localPriceMin, setLocalPriceMin] = useState(priceMin);
  const [localPriceMax, setLocalPriceMax] = useState(priceMax);

  useEffect(() => {
    setLocalPriceMin(priceMin);
    setLocalPriceMax(priceMax);
  }, [priceMin, priceMax]);

  function toggleArrayItem(arr, item) {
    return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
  }

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();

    if (localPriceMin) params.set('priceMin', localPriceMin);
    if (localPriceMax) params.set('priceMax', localPriceMax);
    if (types.length > 0) params.set('type', types.join(','));
    if (genders.length > 0) params.set('gender', genders.join(','));
    if (selectedAmenities.length > 0) params.set('amenities', selectedAmenities.join(','));
    if (sort) params.set('sort', sort);

    if (searchParams.get('city')) params.set('city', searchParams.get('city'));

    setSearchParams(params, { replace: true });
    setPriceMin(localPriceMin);
    setPriceMax(localPriceMax);
    setIsOpen(false);
  }, [localPriceMin, localPriceMax, types, genders, selectedAmenities, sort, searchParams, setSearchParams]);

  function resetFilters() {
    setLocalPriceMin('');
    setLocalPriceMax('');
    setPriceMin('');
    setPriceMax('');
    setTypes([]);
    setGenders([]);
    setSelectedAmenities([]);
    setSort('');

    const params = new URLSearchParams();
    if (searchParams.get('city')) params.set('city', searchParams.get('city'));
    setSearchParams(params, { replace: true });
  }

  const hasActiveFilters = !!(priceMin || priceMax || types.length > 0 || genders.length > 0 || selectedAmenities.length > 0 || sort);

  const panelContent = (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h4>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-gray-400">&#8377;</span>
            <input
              type="number"
              value={localPriceMin}
              onChange={(e) => setLocalPriceMin(e.target.value)}
              placeholder="Min"
              min="0"
              className="w-full pl-7 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rushkey-500"
            />
          </div>
          <span className="text-gray-300">-</span>
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-gray-400">&#8377;</span>
            <input
              type="number"
              value={localPriceMax}
              onChange={(e) => setLocalPriceMax(e.target.value)}
              placeholder="Max"
              min="0"
              className="w-full pl-7 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rushkey-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Property Type</h4>
        <div className="space-y-2">
          {PROPERTY_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={types.includes(type)}
                onChange={() => setTypes((prev) => toggleArrayItem(prev, type))}
                className="w-4 h-4 rounded border-gray-300 text-rushkey-500 focus:ring-rushkey-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 capitalize">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Gender</h4>
        <div className="space-y-2">
          {GENDER_OPTIONS.map((gender) => (
            <label key={gender} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={genders.includes(gender)}
                onChange={() => setGenders((prev) => toggleArrayItem(prev, gender))}
                className="w-4 h-4 rounded border-gray-300 text-rushkey-500 focus:ring-rushkey-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 capitalize">
                {gender}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Amenities</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {AMENITIES_LIST.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => setSelectedAmenities((prev) => toggleArrayItem(prev, amenity))}
                className="w-4 h-4 rounded border-gray-300 text-rushkey-500 focus:ring-rushkey-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Sort By</h4>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full appearance-none pl-3 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rushkey-500 cursor-pointer bg-white"
          >
            <option value="">Default</option>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {sortLabels[opt] || opt}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <FiChevronDown className="w-4 h-4" />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button variant="primary" onClick={applyFilters} fullWidth>
          Apply Filters
        </Button>
        <Button variant="ghost" onClick={resetFilters} className="shrink-0">
          <FiRotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
      >
        <FiSliders className="w-4 h-4" />
        Filters
        {hasActiveFilters && (
          <span className="w-2 h-2 rounded-full bg-rushkey-500 absolute -top-1 -right-1" />
        )}
      </button>

      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-5">Filters</h3>
          {panelContent}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between rounded-t-2xl">
                <h3 className="text-base font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="px-5 py-5">{panelContent}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
