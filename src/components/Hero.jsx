import React, { useLayoutEffect, useRef } from 'react';
import { User, Download, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnnouncementPopup from './AnnouncementBar';

import heroVideo from '../assets/hero.mp4';
import titleImage from '../assets/PROVENANCE_WHITE_TEXT_LOGO_PURPLE_GLOW.png';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      ScrollTrigger.matchMedia({

        // ✅ Desktop only (lg screens)
        "(min-width: 1024px)": () => {
          gsap.to(videoRef.current, {
            y: 30,
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        },

        // ✅ Mobile (disable animation)
        "(max-width: 1023px)": () => {
          gsap.set(videoRef.current, {
            yPercent: 0,
            scale: 1,
          });
        }

      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id='hero-section'
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-[130%] object-cover" // Height set to 130% to account for y-movement
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[5]"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center">

        {/* Heading Image */}
        <div className="w-full max-w-5xl mx-auto -mt-12 -mb-5 md:-mt-20 md:-mb-50 pointer-events-none">
          <img
            src={titleImage}
            alt="PROVENANCE 6.0"
            className="w-full h-auto drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] object-contain transform-gpu"
            style={{ willChange: "filter, transform" }}
          />
        </div>

        {/* Subtitle & Date/Location */}
        <div className="flex flex-col items-center space-y-6 mb-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-bounce-slow">
            <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-white font-bold text-sm md:text-base tracking-[0.2em] uppercase">
              14 - 15 MAY &middot; RVSCET, JAMSHEDPUR
            </span>
          </div>
          <p className="text-xl md:text-3xl text-white/90 font-medium max-w-3xl mx-auto drop-shadow-md">
            The Techno-Cultural Fest of RVSCET, Jamshedpur.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-6">

          {/* Register / Dashboard */}
          {isLoggedIn ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="group relative flex items-center justify-center gap-2 bg-[#7c3aed] text-white px-5 sm:px-8 py-3 rounded-xl font-semibold text-base sm:text-lg transition-all w-auto overflow-hidden hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(124,58,237,0.8)]"
            >
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />
              <LayoutDashboard className="w-5 h-5 z-10" />
              <span className="z-10">Dashboard</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/register')}
              className="group relative flex items-center justify-center gap-2 bg-[#7c3aed] text-white px-5 sm:px-8 py-3 rounded-xl font-semibold text-base sm:text-lg transition-all w-auto overflow-hidden hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(124,58,237,0.8)]"
            >
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />
              <User className="w-5 h-5 z-10" />
              <span className="z-10">Register</span>
            </button>
          )}

          {/* Brochure */}
          <a
            href="https://drive.google.com/drive/folders/1YlqRkomeO_mjPYULpM9WH00_V0kfhHW-?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-2 bg-white text-[#6d28d9] px-5 sm:px-8 py-3 rounded-xl font-semibold text-base sm:text-lg transition-all w-auto overflow-hidden hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          >
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent group-hover:animate-shine" />
            <Download className="w-5 h-5 text-purple-500 z-10" />
            <span className="z-10">Brochure</span>
          </a>

        </div>

        {/* ── Prize Pool Stats ── */}
        <div className="mt-8 flex items-center justify-center">
          <div
            className="relative inline-flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border"
            style={{
              background: 'linear-gradient(135deg, rgba(234,179,8,0.1), rgba(251,146,60,0.06), rgba(168,85,247,0.08))',
              borderColor: 'rgba(234,179,8,0.25)',
              boxShadow: '0 0 50px rgba(234,179,8,0.12), 0 0 0 1px rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Animated top glow strip */}
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(234,179,8,0.6), rgba(251,146,60,0.6), transparent)' }}
            />

            {/* Prize Pool */}
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[9px] sm:text-[10px] font-black tracking-[0.22em] uppercase"
                style={{ color: 'rgba(234,179,8,0.55)' }}>
                Prize Pool
              </span>
              <span
                className="text-lg sm:text-2xl font-black tracking-tight leading-none"
                style={{
                  background: 'linear-gradient(90deg, #facc15, #fb923c, #facc15)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto',
                  animation: 'heroShimmer 3s linear infinite',
                }}
              >
                ₹1,50,000
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-8 self-center" style={{ background: 'rgba(255,255,255,0.08)' }} />

            {/* Events count */}
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[9px] sm:text-[10px] font-black tracking-[0.22em] uppercase text-white/30">Events</span>
              <span className="text-lg sm:text-2xl font-black text-white/85 leading-none">35+</span>
            </div>

            {/* Divider */}
            <div className="w-px h-8 self-center" style={{ background: 'rgba(255,255,255,0.08)' }} />

            {/* Clubs count */}
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[9px] sm:text-[10px] font-black tracking-[0.22em] uppercase text-white/30">Clubs</span>
              <span className="text-lg sm:text-2xl font-black text-white/85 leading-none">5</span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes heroShimmer {
            0%   { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        `}</style>

        {/* Announcement Popup — pops in with GSAP animation */}
        <div className="mt-6 md:mt-8">
          <AnnouncementPopup />
        </div>
      </div>
    </div>
  );
};

export default Hero;