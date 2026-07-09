import { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProperties } from '@/features/properties/propertySlice';
import ExploreSearchBar from '@/components/explore/ExploreSearchBar';
import FilterBar from '@/components/explore/FilterBar';
import ExploreCard from '@/components/explore/ExploreCard';
import MapWidget from '@/components/explore/MapWidget';
import { FiMap, FiList, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded-lg w-3/4" />
        <div className="h-3 bg-gray-200 rounded-lg w-1/2" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 bg-gray-200 rounded-lg w-16" />
          <div className="h-6 bg-gray-200 rounded-lg w-16" />
          <div className="h-6 bg-gray-200 rounded-lg w-16" />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ hasFilters, onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
        <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">No properties found</h3>
      <p className="text-gray-500 text-sm mb-6 max-w-sm">
        We couldn't find any listings matching your filters. Try adjusting your search or exploring a different area.
      </p>
      {hasFilters && (
        <button
          onClick={onClear}
          className="px-6 py-2.5 bg-rushkey-500 hover:bg-rushkey-600 text-white font-semibold text-sm rounded-xl transition-colors shadow-lg shadow-rushkey-500/20"
        >
          Clear All Filters
        </button>
      )}
    </motion.div>
  );
}

export default function SearchResults() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, totalPages, currentPage, loading } = useSelector((state) => state.properties);

  const [hoveredId, setHoveredId] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const [showMap, setShowMap] = useState(true);
  const [mobileMapOpen, setMobileMapOpen] = useState(false);
  const listRef = useRef(null);

  const city = searchParams.get('city') || '';
  const type = searchParams.get('type') || '';
  const gender = searchParams.get('gender') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sort = searchParams.get('sort') || '';
  const ac = searchParams.get('ac') || '';
  const food = searchParams.get('food') || '';
  const sharing = searchParams.get('sharing') || '';
  const minRating = searchParams.get('minRating') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const params = { page };
    if (city) params.city = city;
    if (type) params.type = type;
    if (gender) params.gender = gender;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (sort) params.sort = sort;
    if (ac) params.ac = ac;
    if (food) params.food = food;
    if (sharing) params.sharing = sharing;
    if (minRating) params.minRating = minRating;
    dispatch(fetchProperties(params));
  }, [dispatch, city, type, gender, minPrice, maxPrice, sort, ac, food, sharing, minRating, page]);

  const updateParams = useCallback((key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'All') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== 'page') newParams.set('page', '1');
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const handleFilterChange = useCallback((filterKey, option) => {
    if (option === 'All') {
      switch (filterKey) {
        case 'priceRange': updateParams('minPrice', ''); updateParams('maxPrice', ''); break;
        case 'ac': updateParams('ac', ''); break;
        case 'food': updateParams('food', ''); break;
        case 'sharing': updateParams('sharing', ''); break;
        case 'rating': updateParams('minRating', ''); break;
        default: break;
      }
      return;
    }
    switch (filterKey) {
      case 'priceRange': {
        const map = {
          'Under ₹5K': { min: '0', max: '5000' },
          '₹5-8K': { min: '5000', max: '8000' },
          '₹8-12K': { min: '8000', max: '12000' },
          '₹12-20K': { min: '12000', max: '20000' },
          '₹20K+': { min: '20000', max: '' },
        };
        const range = map[option];
        if (range) {
          updateParams('minPrice', range.min);
          updateParams('maxPrice', range.max);
        }
        break;
      }
      case 'ac': updateParams('ac', option); break;
      case 'food': updateParams('food', option); break;
      case 'sharing': updateParams('sharing', option); break;
      case 'rating': updateParams('minRating', option.replace('+', '')); break;
      default: break;
    }
  }, [updateParams]);

  const handleSearch = useCallback(({ city: newCity, budget, gender: newGender }) => {
    const params = new URLSearchParams();
    if (newCity) params.set('city', newCity);
    if (budget) {
      const [min, max] = budget.split('-');
      if (min) params.set('minPrice', min);
      if (max) params.set('maxPrice', max);
    }
    if (newGender) params.set('gender', newGender);
    params.set('page', '1');
    setSearchParams(params);
  }, [setSearchParams]);

  const handlePinClick = useCallback((id) => {
    setActivePin((prev) => prev === id ? null : id);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const hasFilters = city || type || gender || minPrice || maxPrice || ac || food || sharing || minRating;

  const activeFilterState = { minPrice, maxPrice, ac, food, sharing, minRating };

  const SORT_OPTIONS = [
    { value: '', label: 'Recommended' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-100/80 shadow-sm">
        <div className="px-4 sm:px-6 py-3">
          <ExploreSearchBar
            city={city}
            setCity={(v) => updateParams('city', v)}
            budget={minPrice || maxPrice ? `${minPrice}-${maxPrice}` : ''}
            setBudget={(v) => {
              if (!v) { updateParams('minPrice', ''); updateParams('maxPrice', ''); return; }
              const [mn, mx] = v.split('-');
              updateParams('minPrice', mn);
              updateParams('maxPrice', mx);
            }}
            gender={gender}
            setGender={(v) => updateParams('gender', v)}
            onSearch={handleSearch}
          />
        </div>
        <div className="px-4 sm:px-6 pb-3">
          <FilterBar
            activeFilters={activeFilterState}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="flex">
        <div className={`w-full ${showMap ? 'lg:w-[60%]' : 'lg:w-full'} transition-all duration-300`}>
          <div className="px-4 sm:px-6 py-5 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {hasFilters ? (
                    <>Results for <span className="text-rushkey-500">{city || 'All Locations'}</span></>
                  ) : (
                    'Explore Properties'
                  )}
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full border-2 border-rushkey-500 border-t-transparent animate-spin" />
                      Searching...
                    </span>
                  ) : (
                    <>{properties.length} {properties.length === 1 ? 'property' : 'properties'} found</>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sort}
                  onChange={(e) => updateParams('sort', e.target.value)}
                  className="hidden sm:block rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-rushkey-300 focus:ring-1 focus:ring-rushkey-200 bg-white"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>

                <button
                  onClick={() => { setShowMap(!showMap); setMobileMapOpen(!showMap); }}
                  className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  {showMap ? <FiList className="w-4 h-4" /> : <FiMap className="w-4 h-4" />}
                  {showMap ? 'List' : 'Map'}
                </button>

                <button
                  onClick={() => setMobileMapOpen(!mobileMapOpen)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-rushkey-500 text-white text-sm font-medium shadow-lg shadow-rushkey-500/20"
                >
                  <FiMap className="w-4 h-4" />
                  Map
                </button>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : properties.length === 0 ? (
              <EmptyState hasFilters={hasFilters} onClear={clearFilters} />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  <AnimatePresence mode="popLayout">
                    {properties.map((property, i) => (
                      <ExploreCard
                        key={property._id || i}
                        property={property}
                        index={i}
                        onHover={setHoveredId}
                        onLeave={() => setHoveredId(null)}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-8 pb-4">
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => updateParams('page', String(currentPage - 1))}
                      className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <FiChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => updateParams('page', String(pageNum))}
                            className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                              pageNum === currentPage
                                ? 'bg-rushkey-500 text-white shadow-md shadow-rushkey-500/20'
                                : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      disabled={currentPage >= totalPages}
                      onClick={() => updateParams('page', String(currentPage + 1))}
                      className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next
                      <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className={`hidden ${showMap ? 'lg:block' : ''} w-[40%] shrink-0`}>
          <div className="sticky top-[148px]" style={{ height: 'calc(100vh - 148px)' }}>
            <div className="h-full p-2">
              <MapWidget
                hoveredId={hoveredId}
                activePin={activePin}
                onPinClick={handlePinClick}
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMapOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/20" onClick={() => setMobileMapOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 h-[70vh] rounded-t-3xl overflow-hidden bg-gray-100 shadow-2xl">
              <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-900">Map View</span>
                <button
                  onClick={() => setMobileMapOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="h-[calc(70vh-52px)]">
                <MapWidget
                  hoveredId={hoveredId}
                  activePin={activePin}
                  onPinClick={handlePinClick}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
