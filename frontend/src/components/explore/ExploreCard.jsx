import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiStar,
  FiMapPin,
  FiHeart,
  FiWifi,
  FiSun,
  FiCoffee,
} from 'react-icons/fi';
import { BiBed, BiCar, BiDumbbell } from 'react-icons/bi';

const amenityIcons = {
  WiFi: FiWifi,
  AC: FiSun,
  Food: FiCoffee,
  Parking: BiCar,
  Gym: BiDumbbell,
  Laundry: null,
};

export default function ExploreCard({ property, index, onHover, onLeave }) {
  const [favorited, setFavorited] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const {
    _id,
    title = 'Modern Studio Apartment',
    address = { city: 'Bangalore' },
    price = 8500,
    images = [],
    rating = 4.5,
    amenities = [],
    type = 'PG',
    gender = 'Co-living',
  } = property;

  const safeImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
  ];

  const cityName = typeof address === 'string' ? address : address?.city || 'Bangalore';
  const displayPrice = price?.toLocaleString('en-IN');

  function toggleFavorite(e) {
    e.preventDefault();
    e.stopPropagation();
    setFavorited((prev) => !prev);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
      onMouseEnter={() => onHover?.(_id)}
      onMouseLeave={() => onLeave?.()}
    >
      <Link
        to={`/property/${_id}`}
        className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
          <img
            src={safeImages[0]}
            alt={title}
            loading={index < 4 ? 'eager' : 'lazy'}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {type}
            </span>
            <span className="bg-rushkey-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {gender}
            </span>
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <motion.button
              onClick={toggleFavorite}
              whileTap={{ scale: 0.8 }}
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
              aria-label="Favorite"
            >
              <FiHeart
                className={`w-4 h-4 transition-colors ${
                  favorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </motion.button>
          </div>

          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-gray-900 font-bold text-base">
              ₹{displayPrice}
            </span>
            <span className="text-gray-500 text-xs">/mo</span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-1 flex-1">
              {title}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <FiStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-800">
                {rating?.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <FiMapPin className="w-4 h-4 shrink-0 text-gray-400" />
            <span className="truncate">{cityName}</span>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
            {amenities.slice(0, 4).map((amenity) => {
              const Icon = amenityIcons[amenity];
              return Icon ? (
                <span
                  key={amenity}
                  className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {amenity}
                </span>
              ) : (
                <span
                  key={amenity}
                  className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg"
                >
                  {amenity}
                </span>
              );
            })}
            {amenities.length > 4 && (
              <span className="text-xs text-gray-400 font-medium">
                +{amenities.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
