import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const faqs = [
  { q: 'How do I contact the PG owner?', a: 'Visit the property page, submit your details (name and phone), and you\'ll instantly get the owner\'s contact information along with Call and WhatsApp buttons.' },
  { q: 'Are the PG listings verified?', a: 'We verify listings to the best of our ability through available data and reviews. However, we strongly recommend visiting the PG in person before making any payment.' },
  { q: 'Is there any brokerage or service fee?', a: 'No. Rushkey is completely free for students. We do not charge any brokerage, service fee, or commission for connecting you with PG owners.' },
  { q: 'How do I search for PGs near Delhi University?', a: 'Use the search bar on the homepage or visit the Explore page. You can filter by area, price range, gender, room type, and amenities to find the perfect PG near North Campus.' },
  { q: 'Can I get a refund if I don\'t like the PG?', a: 'Refunds are handled directly between you and the PG owner. Rushkey is a listing platform and does not hold any payments. Always clarify the refund policy before paying.' },
  { q: 'How can I list my PG on Rushkey?', a: 'Currently, PG owners can contact us via the Contact Us page or email us at hello@rushkey.com. We\'re working on a self-service owner dashboard.' },
  { q: 'Are there PGs for both boys and girls?', a: 'Yes. You can filter by gender on the search page. We have listings for Boys, Girls, and Unisex PGs across all areas near Delhi University.' },
  { q: 'What amenities are typically included?', a: 'Most PGs include WiFi, food (meals), AC, laundry, housekeeping, and security. Check the amenities section on each property page for a full list.' },
  { q: 'How do I know if a room is available?', a: 'Each listing shows availability status: "Available", "Few Rooms Left", or "Booked". We update availability based on information from PG owners.' },
  { q: 'Can I visit the PG before booking?', a: 'Absolutely. We encourage all students to visit the PG in person before making any payment. Use the Contact Now button to schedule a visit with the owner.' },
];

function AccordionItem({ faq, isOpen, onClick }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-medium text-gray-900 text-sm sm:text-base pr-2">{faq.q}</span>
        <FiChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-14 h-14 rounded-2xl bg-rushkey-50 flex items-center justify-center mx-auto mb-4">
            <FiHelpCircle className="w-7 h-7 text-rushkey-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">Everything you need to know about finding and booking PGs in Delhi.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <AccordionItem
                faq={faq}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
        >
          <h3 className="font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-sm text-gray-500 mb-4">We're here to help. Reach out to us anytime.</p>
          <a
            href="mailto:hello@rushkey.com"
            className="inline-flex items-center gap-2 bg-rushkey-500 hover:bg-rushkey-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-rushkey-500/20"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
}
