import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiMapPin, FiChevronDown } from 'react-icons/fi';
import useDebounce from '@/hooks/useDebounce';
import { PROPERTY_TYPES } from '@/lib/constants';
import Button from '@/components/ui/Button';

const suggestions = [
  'Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad',
  'Chennai', 'Kolkata', 'Jaipur', 'Ahmedabad', 'Goa',
];

export default function SearchBar({ onSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const debouncedCity = useDebounce(city, 300);

  useEffect(() => {
    if (debouncedCity && debouncedCity.length >= 1) {
      const filtered = suggestions.filter((s) =>
        s.toLowerCase().includes(debouncedCity.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveIndex(-1);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedCity]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelectSuggestion(suggestion) {
    setCity(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredSuggestions.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(filteredSuggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  }

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (city.trim()) params.set('city', city.trim());
    if (propertyType) params.set('type', propertyType);
    setSearchParams(params, { replace: true });
    onSearch?.(Object.fromEntries(params));
  }, [city, propertyType, onSearch, setSearchParams]);

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div ref={wrapperRef} className="relative flex-1">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
              <FiMapPin className="w-5 h-5" />
            </span>
            <input
              ref={inputRef}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onFocus={() => {
                if (filteredSuggestions.length > 0) setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search city..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rushkey-500 focus:border-transparent shadow-sm transition-shadow"
              autoComplete="off"
            />
          </div>

          {showSuggestions && (
            <ul className="absolute z-20 w-full mt-1.5 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 max-h-56 overflow-y-auto">
              {filteredSuggestions.map((suggestion, i) => (
                <li
                  key={suggestion}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className={`px-4 py-2.5 text-sm cursor-pointer flex items-center gap-2.5 transition-colors ${
                    i === activeIndex
                      ? 'bg-rushkey-50 text-rushkey-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiMapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full sm:w-44 appearance-none pl-4 pr-10 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rushkey-500 focus:border-transparent shadow-sm transition-shadow cursor-pointer"
          >
            <option value="">All Types</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <FiChevronDown className="w-4 h-4" />
          </span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="sm:w-auto w-full"
        >
          <FiSearch className="w-5 h-5" />
          Search
        </Button>
      </div>
    </form>
  );
}
