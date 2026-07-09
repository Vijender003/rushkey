import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMapPin, FiChevronDown, FiSliders } from 'react-icons/fi';

const budgets = [
  { label: 'Any Budget', value: '' },
  { label: 'Under ₹5,000', value: '0-5000' },
  { label: '₹5,000 – ₹8,000', value: '5000-8000' },
  { label: '₹8,000 – ₹12,000', value: '8000-12000' },
  { label: '₹12,000 – ₹20,000', value: '12000-20000' },
  { label: '₹20,000+', value: '20000-' },
];

const genders = [
  { label: 'Any', value: '' },
  { label: 'Boys', value: 'boys' },
  { label: 'Girls', value: 'girls' },
  { label: 'Co-Living', value: 'co-living' },
];

function SelectDropdown({ label, options, value, onChange, icon: Icon }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 border border-gray-200 hover:border-rushkey-300 transition-colors text-sm min-w-[140px]"
      >
        {Icon && <Icon className="w-4 h-4 text-gray-400 shrink-0" />}
        <span className={value ? 'text-gray-900 font-medium' : 'text-gray-400'}>
          {selected?.label || label}
        </span>
        <FiChevronDown className={`w-4 h-4 text-gray-400 ml-auto transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full mt-1.5 left-0 w-full bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-30 origin-top"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onMouseDown={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  value === opt.value
                    ? 'bg-rushkey-50 text-rushkey-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ExploreSearchBar({ city, setCity, budget, setBudget, gender, setGender, onSearch }) {
  const [focused, setFocused] = useState(false);
  const [localCity, setLocalCity] = useState(city || '');

  function handleSubmit(e) {
    e.preventDefault();
    setCity(localCity);
    onSearch({ city: localCity, budget, gender });
  }

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        animate={{
          scale: focused ? 1.01 : 1,
          boxShadow: focused
            ? '0 12px 48px rgba(255, 90, 31, 0.12), 0 4px 16px rgba(0,0,0,0.06)'
            : '0 4px 24px rgba(0,0,0,0.06)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-gray-200/80 rounded-2xl px-4 py-3"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <FiMapPin className="w-5 h-5 text-rushkey-500 shrink-0" />
          <input
            type="text"
            value={localCity}
            onChange={(e) => setLocalCity(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search city, locality or PG..."
            className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 text-sm font-medium outline-none min-w-0"
          />
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <SelectDropdown
            label="Budget"
            options={budgets}
            value={budget}
            onChange={setBudget}
          />
          <SelectDropdown
            label="Gender"
            options={genders}
            value={gender}
            onChange={setGender}
            icon={FiSliders}
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 bg-rushkey-500 hover:bg-rushkey-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-rushkey-500/20 shrink-0"
        >
          <FiSearch className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
        </motion.button>
      </motion.div>
    </form>
  );
}
