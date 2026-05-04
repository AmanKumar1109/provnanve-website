import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import provLogo from '../assets/Provenance_logo_icon.png';
import rvsLogo from '../assets/RVS_Logo_Coloured_White_bg.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['Home', 'Event', 'Gallery', 'Committee', 'Sponsor', 'Contact'];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
        {/* Logos */}
        <div className="flex items-center gap-4">
          <img src={provLogo} alt="Provenance Logo" className="h-12 w-12 object-contain rounded-full" />
          <div className="w-[1px] h-8 bg-white/30"></div>
          <img src={rvsLogo} alt="RVS Logo" className="h-12 w-12 object-contain rounded-full bg-white" />
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center bg-[#150b2e]/60 backdrop-blur-md rounded-full px-8 py-3 gap-8 border border-purple-500/20">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white hover:text-purple-300 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right side CTA (Desktop) */}
        <div className="hidden lg:block">
          <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-8 py-2.5 rounded-full font-medium transition-all shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            Register
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 focus:outline-none"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Overlay) */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0014]/95 backdrop-blur-lg lg:hidden flex flex-col items-center justify-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold text-white hover:text-purple-400 transition-colors"
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => setIsOpen(false)}
            className="bg-[#7c3aed] text-white px-10 py-3 rounded-full font-bold text-xl shadow-[0_0_20px_rgba(124,58,237,0.5)]"
          >
            Register
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
