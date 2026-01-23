import React, { useState, useRef } from 'react';
import { assets } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo3D from "./Logo3D";


const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const scrollToTopRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    setError('');
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Banner — Optional but builds trust */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: '1,200+', label: 'Doctors' },
            { value: '98%', label: 'Patient Satisfaction' },
            { value: '24/7', label: 'Support' },
            { value: '50+', label: 'Specialties' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="text-center p-4 rounded-xl bg-blue-50/50"
            >
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Footer Grid — Full Coverage, Balanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* 1. Brand & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <img 
                src={assets.logo9} 
                alt="GreatStack Health" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-600 leading-relaxed max-w-xs">
              Trusted by patients and doctors nationwide. Committed to accessible, high-quality care.
            </p>
            <div className="flex space-x-3 mt-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2. Company */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Careers', 'Blog'].map((item, i) => (
                <motion.li key={i} whileHover={{ x: 4 }}>
                  <Link 
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 3. Patients */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Patients</h3>
            <ul className="space-y-2">
              {['Find a Doctor', 'Book Appointment', 'My Appointments', 'Help Center'].map((item, i) => (
                <motion.li key={i} whileHover={{ x: 4 }}>
                  <Link 
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 4. Contact + Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Stay Connected</h3>
            
            <div className="space-y-3 text-gray-600 mb-6">
              <div className="flex items-start gap-3">
                <Phone className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
                <span>+1 (212) 456-7890</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
                <span>support@greatstack.dev</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
                <address className="not-italic">
                  New York, NY 10001
                </address>
              </div>
            </div>

            {/* Simple Newsletter */}
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs rounded-md"
                >
                  Join
                </button>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-xs"
                  >
                    {error}
                  </motion.p>
                )}
                {isSubscribed && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-emerald-600 text-xs font-medium flex items-center gap-1"
                  >
                    <Send size={12} className="text-emerald-500" />
                    Thanks! Check your inbox.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-10"></div>

        {/* Bottom Bar — Full Width Coverage */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-gray-500 text-sm">
          <p>
            © {currentYear} GreatStack Health. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookies', 'Accessibility'].map((item, i) => (
              <Link 
                key={i} 
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="hover:text-blue-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors text-sm"
          >
            <ArrowUp size={14} />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;