import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiClock, FiSend, FiCode, FiTrendingUp } from 'react-icons/fi';

const roles = [
  {
    icon: FiCode,
    title: 'Frontend Developer',
    type: 'Part-time · Remote',
    desc: 'Help us build premium user interfaces using React, Tailwind CSS, and Framer Motion. You\'ll work on product features that impact thousands of students.',
    tags: ['React', 'Tailwind CSS', 'UI/UX'],
  },
  {
    icon: FiTrendingUp,
    title: 'Marketing Intern',
    type: 'Full-time · Delhi',
    desc: 'Drive growth and brand awareness among Delhi University students. You\'ll own campus outreach, social media, and content strategy.',
    tags: ['Marketing', 'Content', 'Social Media'],
  },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="w-14 h-14 rounded-2xl bg-rushkey-50 flex items-center justify-center mx-auto mb-4">
            <FiBriefcase className="w-7 h-7 text-rushkey-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">Join Our Team</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">We're building the future of student housing in India. Come be a part of it.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto mb-14"
        >
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why Join Rushkey?</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              We're a small, passionate team building a platform that solves a real problem for thousands of students 
              in Delhi. Every day, we help students find a home near their college — and we're just getting started.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: FiMapPin, text: 'Work from Delhi or remote' },
                { icon: FiClock, text: 'Flexible working hours' },
                { icon: FiTrendingUp, text: 'High growth potential' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3">
                  <item.icon className="w-4 h-4 text-rushkey-500 shrink-0" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <h2 className="text-xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto">Open Roles</h2>
        <div className="space-y-4 max-w-3xl mx-auto mb-14">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rushkey-50 flex items-center justify-center shrink-0">
                  <role.icon className="w-6 h-6 text-rushkey-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900">{role.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{role.type}</p>
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed">{role.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {role.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-lg font-medium">{tag}</span>
                    ))}
                  </div>
                  <button className="mt-4 flex items-center gap-2 bg-rushkey-500 hover:bg-rushkey-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-rushkey-500/20 text-sm">
                    <FiSend className="w-4 h-4" /> Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center max-w-xl mx-auto"
        >
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Didn't find a fit?</h3>
            <p className="text-sm text-gray-500 mb-4">Send us your resume and we'll keep you in mind for future roles.</p>
            <a
              href="mailto:careers@rushkey.com"
              className="inline-flex items-center gap-2 bg-rushkey-500 hover:bg-rushkey-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-rushkey-500/20"
            >
              <FiSend className="w-4 h-4" /> Send Resume
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
