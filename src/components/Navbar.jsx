import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import provLogo from '../assets/Provenance_logo_icon.png';
import rvsLogo from '../assets/RVS_Logo_Coloured_White_bg.png';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const navItems = ['Home', 'Event', 'Gallery', 'Committee', 'Sponsor', 'Contact'];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <Link to="/" className="flex items-center gap-4">
            <img src={provLogo} alt="Provenance Logo" className="h-12 w-12 object-contain rounded-full" />
            <div className="w-[1px] h-8 bg-white/30"></div>
            <img src={rvsLogo} alt="RVS Logo" className="h-12 w-12 object-contain rounded-full bg-white" />
          </Link>
        </motion.div>

        {/* Navigation Links (Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:flex items-center bg-[#150b2e]/60 backdrop-blur-md rounded-full px-8 py-3 gap-8 border border-purple-500/20 shadow-[0_0_20px_rgba(124,58,237,0.1)]"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
              className="relative text-sm font-medium text-white transition-colors group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </motion.div>

        {/* Right side CTAs (Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex items-center gap-3"
        >
          {isLoggedIn ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="text-white/80 hover:text-white px-4 py-2.5 rounded-full font-medium border border-white/20 hover:border-purple-400/60 backdrop-blur-sm bg-white/5 transition-all flex items-center gap-2"
                title="Dashboard"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
                className="relative overflow-hidden bg-[#7c3aed] text-white px-6 py-2.5 rounded-full font-medium transition-all group flex items-center gap-2"
              >
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />
                <UserPlus className="w-4 h-4" />
                <span className="relative z-10">Sign Up</span>
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="text-white/80 hover:text-white px-6 py-2.5 rounded-full font-medium border border-white/20 hover:border-purple-400/60 backdrop-blur-sm bg-white/5 transition-all"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
                className="relative overflow-hidden bg-[#7c3aed] text-white px-8 py-2.5 rounded-full font-medium transition-all group"
              >
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />
                <span className="relative z-10">Register</span>
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 focus:outline-none transition-transform active:scale-90"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#0a0014]/98 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-white hover:text-purple-400 transition-colors"
              >
                {item}
              </motion.a>
            ))}
            {isLoggedIn ? (
              <>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/dashboard');
                  }}
                  className="text-white border border-white/30 hover:border-purple-400 px-10 py-3 rounded-full font-bold text-xl active:scale-95 transition-all flex items-center gap-2 justify-center"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navItems.length + 1) * 0.1 }}
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/signup');
                  }}
                  className="bg-[#7c3aed] text-white px-10 py-3 rounded-full font-bold text-xl shadow-[0_0_20px_rgba(124,58,237,0.5)] active:scale-95 transition-transform flex items-center gap-2 justify-center"
                >
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/login');
                  }}
                  className="text-white border border-white/30 hover:border-purple-400 px-10 py-3 rounded-full font-bold text-xl active:scale-95 transition-all"
                >
                  Login
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navItems.length + 1) * 0.1 }}
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/register');
                  }}
                  className="bg-[#7c3aed] text-white px-10 py-3 rounded-full font-bold text-xl shadow-[0_0_20px_rgba(124,58,237,0.5)] active:scale-95 transition-transform"
                >
                  Register
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
