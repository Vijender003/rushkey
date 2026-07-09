import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setName('');
    setPhone('');
    setMessage('');
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">Contact Us</h1>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">Have a question or feedback? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Kumar"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rushkey-500/20 focus:border-rushkey-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">+91</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rushkey-500/20 focus:border-rushkey-500 transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rushkey-500/20 focus:border-rushkey-500 transition-all resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-rushkey-500 hover:bg-rushkey-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-rushkey-500/20 active:scale-[0.98]"
              >
                {sent ? (
                  'Message Sent!'
                ) : (
                  <>
                    <FiSend className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-5">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rushkey-50 flex items-center justify-center shrink-0">
                    <FiMail className="w-5 h-5 text-rushkey-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <a href="mailto:hello@rushkey.com" className="text-sm font-medium text-gray-900 hover:text-rushkey-600 transition-colors">hello@rushkey.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rushkey-50 flex items-center justify-center shrink-0">
                    <FiPhone className="w-5 h-5 text-rushkey-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <a href="tel:+919999999999" className="text-sm font-medium text-gray-900 hover:text-rushkey-600 transition-colors">+91 99999 99999</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Quick Help</h3>
              <p className="text-sm text-gray-500 mb-4">Chat with us on WhatsApp for instant support.</p>
              <a
                href="https://wa.me/919999999999?text=Hi%2C%20I%20need%20help%20with%20PG%20booking"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
              >
                <FaWhatsapp className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>

            <div className="bg-rushkey-500 rounded-3xl p-6 sm:p-8 text-center text-white">
              <p className="text-sm text-white/80 mb-1">Response Time</p>
              <p className="font-bold text-lg">We typically respond within 24 hours</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
