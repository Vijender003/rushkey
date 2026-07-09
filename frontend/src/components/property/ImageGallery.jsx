import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiImage, FiMaximize2 } from 'react-icons/fi';
import { createPortal } from 'react-dom';

export default function ImageGallery({ images = [] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  const safeImages = images.length > 0 ? images : [];

  if (safeImages.length === 0) {
    return (
      <div className="w-full h-[60vh] bg-gray-100 flex flex-col items-center justify-center text-gray-400 rounded-3xl">
        <FiImage className="w-16 h-16 mb-3" />
        <p className="text-sm font-medium">No images available</p>
      </div>
    );
  }

  const main = safeImages[0];
  const side = safeImages.slice(1, 5);

  function openLightbox(index) {
    setLbIndex(index);
    setLightboxOpen(true);
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[50vh] md:h-[65vh] rounded-3xl overflow-hidden">
        <div
          onClick={() => openLightbox(0)}
          className="md:col-span-2 relative overflow-hidden cursor-pointer bg-gray-100 group"
        >
          <img
            src={main}
            alt=""
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
              <FiMaximize2 className="w-4 h-4 text-gray-700" />
              <span className="text-xs font-medium text-gray-700">View All</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:col-span-2 flex-col gap-2">
          {side.slice(0, 2).map((img, i) => (
            <div
              key={i}
              onClick={() => openLightbox(i + 1)}
              className="flex-1 relative overflow-hidden cursor-pointer bg-gray-100 group"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              {i === 1 && safeImages.length > 3 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-lg">
                    +{safeImages.length - 2} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); setLbIndex((p) => (p === 0 ? safeImages.length - 1 : p - 1)); }}
                className="absolute left-5 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLbIndex((p) => (p === safeImages.length - 1 ? 0 : p + 1)); }}
                className="absolute right-5 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>

              <motion.img
                key={lbIndex}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                src={safeImages[lbIndex]}
                alt=""
                className="max-w-[92vw] max-h-[88vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {safeImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLbIndex(i); }}
                    className={`transition-all duration-300 rounded-full ${
                      i === lbIndex ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

              <div className="absolute bottom-6 right-6 text-white/50 text-xs font-medium">
                {lbIndex + 1} / {safeImages.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
