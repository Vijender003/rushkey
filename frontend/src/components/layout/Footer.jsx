import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const socialLinks = [
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 font-bold text-xl text-white">
              <span className="text-rushkey-500">Rush</span>key
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Find your perfect stay, instantly.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label} className="p-2 rounded-lg text-gray-400 hover:text-rushkey-500 hover:bg-gray-800 transition-colors">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Rushkey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
