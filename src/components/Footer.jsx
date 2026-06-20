import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { NAVIGATION_MENU, SOCIAL_LINKS } from '../utils/constants';
import { useContent } from '../context/ContentContext';

const Footer = () => {
  const { content } = useContent();

  return (
    <footer className="bg-gray-50 dark:bg-dark-card border-t border-gray-200 dark:border-dark-text/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg text-primary-700 mb-2">{content.site.brandName}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{content.site.fullName}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Menu</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {NAVIGATION_MENU.slice(0, 4).map((item) => (
                <li key={item.path}><a href={item.path} className="hover:text-primary-700 transition-smooth">{item.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-700" />
                <a href={`mailto:${content.site.email}`} className="hover:text-primary-700 transition-smooth">{content.site.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-700" />
                <span>{content.site.location}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Ikuti Kami</h4>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="w-8 h-8 bg-primary-700 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-smooth text-sm"
                  aria-label={link.name}
                >
                  {link.icon[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-dark-text/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300">
            <p>{content.site.footerCopyright}</p>
            <div className="flex gap-6 mt-4 md:mt-0 items-center">
              <a href="#" className="hover:text-primary-700 transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-primary-700 transition-smooth">Terms of Service</a>
              <a href="#" className="hover:text-primary-700 transition-smooth">Contact</a>
              <Link
                to="/login"
                className="text-gray-400 dark:text-gray-500 hover:text-primary-700 transition-smooth text-xs"
              >
                Login Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
