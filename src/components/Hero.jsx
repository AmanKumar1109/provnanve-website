import React from 'react';
import { User, Download } from 'lucide-react';
import heroVideo from '../assets/hero.mp4';
import titleImage from '../assets/PROVENANCE_WHITE_TEXT_LOGO_PURPLE_GLOW.png';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-20">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center">

        {/* Main Heading Image with Negative Margins */}
        <div className="w-full max-w-5xl mx-auto -mt-12 -mb-5 md:-mt-20 md:-mb-50 pointer-events-none">
          <img
            src={titleImage}
            alt="PROVENANCE 6.0"
            className="w-full h-auto drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] object-contain"
          />
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto mb-10 drop-shadow-md">
          The Techno-Cultural Fest of RVSCET, Jamshedpur.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-6">
          {/* Register Button */}
          <button
            className="flex items-center justify-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 sm:px-8 py-3 rounded-xl font-semibold text-base sm:text-lg shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all w-auto"
          >
            <User className="w-5 h-5" />
            <span>Register</span>
          </button>

          {/* Brochure Button */}
          <button
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#6d28d9] px-5 sm:px-8 py-3 rounded-xl font-semibold text-base sm:text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all w-auto"
          >
            <Download className="w-5 h-5 text-purple-500" />
            <span>Brochure</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Hero;
