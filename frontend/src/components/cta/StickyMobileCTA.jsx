import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import CallNowButton from './CallNowButton';
import WhatsAppButton from './WhatsAppButton';
import LeadGate from './LeadGate';
import { hasLeadForProperty, getOwnerInfo } from '@/services/leadService';
import { useCTATracking } from '@/hooks/useCTATracking';
import { getUrgencyData } from '@/utils/urgencyData';

export default function StickyMobileCTA({ property }) {
  const [showGate, setShowGate] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const unlocked = hasLeadForProperty(property?.id);
  const owner = getOwnerInfo(property?.location);
  const { trackCall, trackWhatsApp } = useCTATracking(property?.id);

  const urgency = useMemo(() => getUrgencyData(property), [property?.id, property?.availability]);
  const { urgency: urgencyLine, viewsText, contactText } = urgency;

  useEffect(() => {
    function handleScroll() {
      const current = window.scrollY;
      setVisible(current < lastScrollY.current || current < 200);
      lastScrollY.current = current;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!property) return null;

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: visible ? 0 : 100 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 pb-3 pt-2 lg:hidden shadow-2xl"
      >
        <div className="text-center mb-1.5 space-y-0.5">
          <p className="text-xs text-gray-500">{urgencyLine}</p>
          <p className="text-xs text-gray-400">{viewsText} · {contactText}</p>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            {unlocked ? (
              <CallNowButton
                phone={owner.phone}
                onTrack={trackCall}
              />
            ) : (
              <CallNowButton
                disabled
                onClick={() => setShowGate(true)}
              >
                Unlock Call
              </CallNowButton>
            )}
          </div>
          <div className="flex-1">
            {unlocked ? (
              <WhatsAppButton
                phone={owner.phone}
                pgName={property.title}
                location={property.location}
                onTrack={trackWhatsApp}
              />
            ) : (
              <WhatsAppButton
                disabled
                onClick={() => setShowGate(true)}
              >
                Unlock WhatsApp
              </WhatsAppButton>
            )}
          </div>
        </div>
      </motion.div>

      {showGate && (
        <LeadGate
          property={property}
          onClose={() => setShowGate(false)}
          onLeadSubmit={() => setShowGate(false)}
        />
      )}
    </>
  );
}
