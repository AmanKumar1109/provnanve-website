import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Mail, MapPin } from 'lucide-react';

const InstagramIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const FacebookIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const rvscetLinks = [
    { icon: InstagramIcon, href: 'https://www.instagram.com/rvscetjsr/', color: 'hover:text-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]' },
    { icon: FacebookIcon, href: 'https://www.facebook.com/rvscet.engineering', color: 'hover:text-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' },
    { icon: LinkedinIcon, href: 'https://www.linkedin.com/school/rvs-college-of-engineering-and-technology/posts/?feedView=all', color: 'hover:text-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.5)]' },
    { icon: YoutubeIcon, href: 'https://www.youtube.com/@rvscetjsr', color: 'hover:text-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]' },
  ];

  const provenanceLinks = [
    { icon: InstagramIcon, href: 'https://www.instagram.com/provenance.rvscet/', color: 'hover:text-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]' },
  ];

  const quickLinks = ['Home', 'Events', 'Register', 'Schedule', 'Contact'];
  const categories = [
    { name: 'HELIX', desc: 'Tech & AI' },
    { name: 'TARANGANI', desc: 'Cultural' },
    { name: 'XPECTRA', desc: 'Media' },
    { name: 'PANTHERS', desc: 'Sports' },
    { name: 'CIRCUITORN', desc: 'IoT' },
  ];

  return (
    <footer className="relative bg-[#05000a] text-gray-300 pt-16 pb-8 overflow-hidden border-t border-purple-500/20">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Cyberpunk Grid/Noise overlay (subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* 1. Brand Section */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)] mb-2">
                PROVENANCE 6.0
              </h2>
              <p className="text-sm text-gray-400 font-medium tracking-wide">
                Where Tech, Culture & Innovation Collide
              </p>
            </motion.div>
            
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-purple-400" />
                <span>RVSCET, Jamshedpur</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-blue-400" />
                <a href="mailto:info@provenance.com" className="hover:text-white transition-colors">
                  info@provenance.com
                </a>
              </div>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="group relative text-gray-400 hover:text-white transition-colors duration-300 inline-block"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Event Categories */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></span>
              Event Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <a 
                    href={`#${cat.name.toLowerCase()}`}
                    className="group flex items-center justify-between text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <span className="font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400">
                      {cat.name}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full border border-gray-800 bg-gray-900/50 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-colors">
                      {cat.desc}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Social Media */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]"></span>
              Connect With Us
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">RVSCET Official</p>
                <div className="flex gap-3">
                  {rvscetLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color}`}
                      >
                        <Icon size={16} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Provenance 6.0</p>
                <div className="flex gap-3">
                  {provenanceLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color}`}
                      >
                        <Icon size={16} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent my-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-1 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></div>
        </div>

        {/* Bottom Bar Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PROVENANCE 6.0 • RVSCET. All rights reserved.</p>
          <div className="flex items-center gap-2 font-medium">
            <span>Made with</span>
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-red-500"
            >
              ❤️
            </motion.span>
            <span>by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold hover:drop-shadow-[0_0_5px_rgba(168,85,247,0.8)] transition-all cursor-pointer">Helix Team</span></span>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-6 bottom-6 md:bottom-12 w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-shadow z-50 border border-white/10"
        >
          <ChevronUp size={24} />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
