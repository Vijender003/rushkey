import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiImage } from 'react-icons/fi';
import { createPortal } from 'react-dom';

export default function PropertyGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const safeImages = images.length > 0 ? images : [];
  const mainImage = safeImages[selectedIndex] || null;
  const thumbnails = safeImages.slice(0, 4);

  function openLightbox() {
    if (safeImages.length > 0) setLightboxOpen(true);
  }

  function goToPrev() {
    setSelectedIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  }

  function goToNext() {
    setSelectedIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  }

  if (safeImages.length === 0) {
    return (
      <div className="w-full h-80 bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400">
        <FiImage className="w-12 h-12 mb-2" />
        <p className="text-sm">No images available</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        <div
          className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden cursor-pointer bg-gray-100 group"
          onClick={openLightbox}
        >
          <img
            src={mainImage}
            alt="Property"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          {safeImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <FiChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <FiChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}
        </div>

        {thumbnails.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {thumbnails.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`relative w-full h-20 md:h-24 rounded-lg overflow-hidden bg-gray-100 transition-all duration-200 ${
                  i === selectedIndex
                    ? 'ring-2 ring-rushkey-500 ring-offset-2'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {createPortal(
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close lightbox"
              >
                <FiX className="w-6 h-6" />
              </button>

              {safeImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); goToNext(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Next image"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                src={safeImages[selectedIndex]}
                alt="Property"
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {safeImages.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === selectedIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
