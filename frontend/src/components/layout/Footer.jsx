import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';

const footerLinks = {
  Platform: [
    { to: '/search', label: 'Explore Listings' },
    { to: '/', label: 'How It Works' },
    { to: '/', label: 'For Owners' },
    { to: '/', label: 'Pricing' },
  ],
  Support: [
    { to: '/', label: 'Help Center' },
    { to: '/', label: 'Safety Tips' },
    { to: '/', label: 'Contact Us' },
    { to: '/', label: 'FAQs' },
  ],
  Company: [
    { to: '/', label: 'About Us' },
    { to: '/', label: 'Blog' },
    { to: '/', label: 'Careers' },
    { to: '/', label: 'Press Kit' },
  ],
};

const socialLinks = [
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-1.5 font-bold text-xl text-white mb-4">
              <span className="text-rushkey-500">Rush</span>key
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-6">
              India's fastest PG and hostel finding platform. Zero brokerage, verified listings, and instant move-in.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <FiMapPin className="w-4 h-4 text-rushkey-400 shrink-0" />
              <span className="text-sm text-gray-500">Delhi, India</span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <FiMail className="w-4 h-4 text-rushkey-400 shrink-0" />
              <a href="mailto:hello@rushkey.com" className="text-sm text-gray-500 hover:text-rushkey-400 transition-colors">hello@rushkey.com</a>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="p-2.5 rounded-xl bg-gray-800/50 text-gray-400 hover:bg-rushkey-500/10 hover:text-rushkey-400 transition-all border border-gray-800"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-gray-500 hover:text-rushkey-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">&copy; {currentYear} Rushkey. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <Link to="/" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-gray-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
