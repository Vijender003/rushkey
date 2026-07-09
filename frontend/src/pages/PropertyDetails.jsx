import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchPropertyById } from '@/features/properties/propertySlice';
import { fetchPropertyReviews, addReview } from '@/features/reviews/reviewSlice';
import { createBooking } from '@/features/bookings/bookingSlice';
import useAuth from '@/hooks/useAuth';
import ImageGallery from '@/components/property/ImageGallery';
import PropertyInfo from '@/components/property/PropertyInfo';
import AmenitiesGrid from '@/components/property/AmenitiesGrid';
import OwnerCard from '@/components/property/OwnerCard';
import MapSection from '@/components/property/MapSection';
import ReviewsSection from '@/components/property/ReviewsSection';
import SimilarProperties from '@/components/property/SimilarProperties';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi';
import StickyMobileCTA from '@/components/cta/StickyMobileCTA';

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 animate-pulse">
      <div className="h-[50vh] md:h-[65vh] bg-gray-200" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="h-10 bg-gray-200 rounded-2xl w-2/3" />
        <div className="h-5 bg-gray-200 rounded-xl w-1/3" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-24 bg-gray-200 rounded-2xl" />)}
        </div>
      </div>
    </div>
  );
}

function CTASection() {
  const ref = useRef(null);
  return (
    <section ref={ref} className="relative px-4 py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 mt-12">
      <div className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 30% 50%, rgba(255,90,31,0.5) 0%, transparent 50%)`,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-3">
          Ready to Move In?
        </h2>
        <p className="text-white/50 text-lg mb-8 font-light">
          This property won't stay available for long. Take the next step.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/search">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-rushkey-500 hover:bg-rushkey-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-colors shadow-2xl shadow-rushkey-500/30"
            >
              Contact Now
              <FiArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <Link to="/search">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-8 py-3.5 rounded-2xl hover:bg-white/20 transition-colors"
            >
              Browse More Properties
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default function PropertyDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();
  const { property, loading } = useSelector((state) => state.properties);
  const { reviews, loading: reviewLoading } = useSelector((state) => state.reviews);

  const [bookingLoading, setBookingLoading] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    dispatch(fetchPropertyById(id));
    dispatch(fetchPropertyReviews({ propertyId: id }));
    window.scrollTo({ top: 0 });
  }, [dispatch, id]);

  if (loading || !property) {
    return <DetailSkeleton />;
  }

  const nights = checkIn && checkOut
    ? Math.max(0, (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = nights * (property.price || 0);

  async function handleBooking() {
    if (!isAuthenticated) {
      toast.error('Please login to book');
      return;
    }
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    if (nights <= 0) {
      toast.error('Check-out must be after check-in');
      return;
    }
    setBookingLoading(true);
    try {
      await dispatch(createBooking({ property: id, moveInDate: checkIn, moveOutDate: checkOut, guests, totalPrice })).unwrap();
      toast.success('Booking request sent!');
      setCheckIn(''); setCheckOut(''); setGuests(1);
      setShowBookingModal(false);
    } catch (err) {
      toast.error(err || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  }

  async function handleReview(data) {
    if (!isAuthenticated) {
      toast.error('Please login to review');
      return;
    }
    try {
      await dispatch(addReview({ property: id, ...data })).unwrap();
      toast.success('Review added!');
    } catch (err) {
      toast.error(err || 'Failed to add review');
    }
  }

  function handleSchedule() {
    if (!isAuthenticated) {
      toast.error('Please login to schedule a visit');
      return;
    }
    setShowBookingModal(true);
    setTimeout(() => {
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
          <div className="py-4">
            <ImageGallery images={property.images} />
          </div>

          <div className="flex flex-col lg:flex-row gap-8 pb-12">
            <div className="flex-1 min-w-0 space-y-10">
              <PropertyInfo property={property} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {property.description || 'No description provided.'}
                </p>
              </motion.div>

              {property.rules?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-3">House Rules</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.rules.map((rule, i) => (
                      <span key={i} className="bg-gray-50 border border-gray-200 text-gray-600 text-sm px-3.5 py-1.5 rounded-xl">
                        {rule}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              <AmenitiesGrid amenities={property.amenities} />

              <div id="booking-section" className="scroll-mt-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Book This Property</h2>
                  <div className="grid gap-4 sm:grid-cols-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-rushkey-300 focus:ring-1 focus:ring-rushkey-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-rushkey-300 focus:ring-1 focus:ring-rushkey-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                      <div className="flex items-center rounded-xl border border-gray-200 px-3 py-1">
                        <button
                          type="button"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="p-1.5 text-gray-500 hover:text-gray-800"
                        >
                          <FiChevronLeft className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={guests}
                          onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-12 text-center bg-transparent text-sm font-medium outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setGuests(guests + 1)}
                          className="p-1.5 text-gray-500 hover:text-gray-800"
                        >
                          <FiChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handleBooking}
                        disabled={bookingLoading}
                        className="w-full flex items-center justify-center gap-2 bg-rushkey-500 hover:bg-rushkey-600 text-white font-bold py-2.5 rounded-xl transition-colors shadow-lg shadow-rushkey-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiCalendar className="w-4 h-4" />
                        {bookingLoading ? 'Booking...' : 'Book Now'}
                      </button>
                    </div>
                  </div>
                  {nights > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 bg-gray-50 rounded-xl p-4"
                    >
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>₹{property.price?.toLocaleString('en-IN')} x {nights} night{nights > 1 ? 's' : ''}</span>
                        <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              <ReviewsSection
                reviews={reviews}
                isAuthenticated={isAuthenticated}
                onSubmitReview={handleReview}
                reviewLoading={reviewLoading}
              />
            </div>

            <div className="hidden lg:block w-[380px] xl:w-[420px] shrink-0">
              <div className="sticky top-24 space-y-6">
                <OwnerCard
                  property={property}
                  onSchedule={handleSchedule}
                />
              </div>
            </div>
          </div>

          <div className="pb-12">
            <MapSection property={property} />
          </div>

          <div className="pb-12">
            <SimilarProperties />
          </div>
        </div>
      </motion.div>

      <CTASection />

      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowBookingModal(false)}
          />
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Book Your Stay</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100">
                  {property.images?.[0] && (
                    <img src={property.images[0]} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{property.title}</p>
                  <p className="text-rushkey-500 font-bold">₹{property.price?.toLocaleString('en-IN')}<span className="text-gray-400 font-normal text-sm">/mo</span></p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Check-in</label>
                  <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-rushkey-300" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Check-out</label>
                  <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-rushkey-300" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Guests</label>
                <input type="number" min={1} value={guests}
                  onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-rushkey-300" />
              </div>
              {nights > 0 && (
                <div className="bg-gray-50 rounded-xl p-3 text-sm">
                  <div className="flex justify-between text-gray-600"><span>₹{property.price?.toLocaleString('en-IN')} × {nights} nights</span><span>₹{totalPrice.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between font-bold text-gray-900 mt-1 pt-2 border-t border-gray-200"><span>Total</span><span>₹{totalPrice.toLocaleString('en-IN')}</span></div>
                </div>
              )}
              <button onClick={handleBooking} disabled={bookingLoading}
                className="w-full flex items-center justify-center gap-2 bg-rushkey-500 hover:bg-rushkey-600 text-white font-bold py-3 rounded-2xl transition-colors shadow-lg shadow-rushkey-500/20 disabled:opacity-50">
                {bookingLoading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <StickyMobileCTA property={property} />
    </div>
  );
}
