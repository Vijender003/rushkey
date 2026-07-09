import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHeart,
  FiStar,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { BiBed, BiWifi, BiFridge, BiTv, BiCar, BiDumbbell } from 'react-icons/bi';

const amenityIcons = {
  WiFi: BiWifi,
  AC: BiFridge,
  Food: null,
  Laundry: null,
  Gym: BiDumbbell,
  Parking: BiCar,
  'Power Backup': null,
  TV: BiTv,
  Fridge: BiFridge,
};

export default function PropertyCard({ property }) {
  const {
    _id,
    title,
    address,
    price,
    images = [],
    rating,
    beds,
    amenities = [],
  } = property;

  const [currentImg, setCurrentImg] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const safeImages = images.length > 0 ? images : ['/placeholder.jpg'];

  function prevImage(e) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  }

  function nextImage(e) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  }

  function toggleFavorite(e) {
    e.preventDefault();
    e.stopPropagation();
    setFavorited((prev) => !prev);
  }

  const visibleAmenities = amenities.slice(0, 3);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Link
        to={`/property/${_id}`}
        className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={safeImages[currentImg]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <span className="absolute top-3 left-3 bg-rushkey-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
            &#8377;{price?.toLocaleString('en-IN')}/-
          </span>

          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiHeart
              className={`w-5 h-5 transition-colors ${
                favorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>

          {safeImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <FiChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <FiChevronRight className="w-4 h-4 text-gray-700" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {safeImages.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentImg
                        ? 'bg-white w-4'
                        : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-4 space-y-2.5">
          <h3 className="font-semibold text-gray-900 text-base leading-tight truncate">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-sm text-gray-500 truncate">
            <FiMapPin className="w-4 h-4 shrink-0 text-gray-400" />
            <span className="truncate">{address}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-700">
                {rating?.toFixed(1) || 'N/A'}
              </span>
            </div>
            {beds && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <BiBed className="w-4 h-4" />
                <span>{beds} {beds === 1 ? 'Bed' : 'Beds'}</span>
              </div>
            )}
          </div>

          {visibleAmenities.length > 0 && (
            <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
              {visibleAmenities.map((amenity) => {
                const Icon = amenityIcons[amenity];
                return Icon ? (
                  <span
                    key={amenity}
                    className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {amenity}
                  </span>
                ) : (
                  <span
                    key={amenity}
                    className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md"
                  >
                    {amenity}
                  </span>
                );
              })}
              {amenities.length > 3 && (
                <span className="text-xs text-gray-400">+{amenities.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
