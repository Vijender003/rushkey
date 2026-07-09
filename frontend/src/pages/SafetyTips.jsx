import { motion } from 'framer-motion';
import { FiShield, FiHome, FiUserCheck, FiDollarSign, FiStar, FiAlertTriangle } from 'react-icons/fi';

const tips = [
  { icon: FiHome, title: 'Visit the PG Before Booking', desc: 'Always schedule a visit to see the room, amenities, and neighborhood in person before making any payment.' },
  { icon: FiUserCheck, title: 'Verify Owner Details', desc: 'Ask for the owner\'s ID proof and cross-check the property ownership. Our platform shares verified owner details after lead submission.' },
  { icon: FiDollarSign, title: 'Avoid Full Advance Payment', desc: 'Never pay the full amount upfront. A nominal security deposit (1-2 months rent) is standard practice.' },
  { icon: FiStar, title: 'Check Reviews from Other Students', desc: 'Read reviews from current or past tenants. Their experience can tell you more than any listing description.' },
  { icon: FiAlertTriangle, title: 'Read the Fine Print', desc: 'Understand the house rules, notice period, guest policy, and what happens if you need to move out early.' },
  { icon: FiShield, title: 'Trust Your Instincts', desc: 'If something feels off about the listing or the owner, step back. There are plenty of other verified PGs available.' },
];

export default function SafetyTips() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="w-14 h-14 rounded-2xl bg-rushkey-50 flex items-center justify-center mx-auto mb-4">
            <FiShield className="w-7 h-7 text-rushkey-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">Stay Safe While Booking PGs in Delhi</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Your safety is our priority. Follow these tips to ensure a secure and hassle-free PG booking experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-rushkey-50 flex items-center justify-center shrink-0">
                  <tip.icon className="w-5 h-5 text-rushkey-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 text-center max-w-3xl mx-auto"
        >
          <FiAlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 text-lg mb-2">Important Note</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            We do not own or operate any PG accommodations. Rushkey is a listing platform that connects students with verified PG owners. 
            Always verify property details and ownership before making any payment. We recommend visiting the PG in person and reading 
            reviews from previous tenants.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
