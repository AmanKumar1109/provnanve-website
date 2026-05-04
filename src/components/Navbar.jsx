import React, { useState, useRef, useEffect } from 'react';
import { Menu, ArrowLeft, LayoutDashboard, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import provLogo from '../assets/Provenance_logo_icon.png';
import rvsLogo from '../assets/RVS_Logo_Coloured_White_bg.png';
import { useAuth } from '../contexts/AuthContext';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const navItems = ['Home', 'Event', 'Gallery', 'Committee', 'Sponsor', 'Contact'];

  // GSAP refs
  const bar = useRef(null);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const tl = useRef(null);

  useGSAP(() => {
    const validLinks = linksRef.current.filter(Boolean);

    tl.current = gsap.timeline({ paused: true })
      .to(overlayRef.current, { autoAlpha: 1, duration: 0.3 })
      .to(menuRef.current, { x: 0, duration: 0.6, ease: "expo.out" }, "-=0.2")
      .from(validLinks, {
        x: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.3");

    gsap.from(".desktop-link", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power4.out",
      delay: 0.2
    });

  }, { scope: bar });

  useEffect(() => {
    if (mobileMenuOpen) {
      tl.current?.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current?.reverse();
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <div ref={bar}>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">

        {/* Logos */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-4">
            <img src={provLogo} className="h-12 w-12 rounded-full" />
            <div className="w-[1px] h-8 bg-white/30"></div>
            <img src={rvsLogo} className="h-12 w-12 rounded-full bg-white" />
          </Link>
        </div>

        {/* Desktop Navigation (UNCHANGED) */}
        {/* Desktop Navigation (UPDATED) */}
        <div className="hidden lg:flex items-center bg-[#150b2e]/60 backdrop-blur-md rounded-full px-8 py-3 gap-8 border border-purple-500/20">
          {navItems.map((item) => (
            <a
              key={item}
              href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
              className="relative block h-[20px] overflow-hidden group"
            >
              {/* Container that moves on hover */}
              <div className="relative transition-transform duration-500 ease-out transform group-hover:-translate-y-1/2">
                {/* Original White Text */}
                <span className="block text-sm font-medium text-white h-[20px]">
                  {item}
                </span>
                {/* Colored Text (Appears from bottom) */}
                <span className="block text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent h-[20px]">
                  {item}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Desktop CTA (UNCHANGED) */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-[#7c3aed] text-white px-6 py-2.5 rounded-full flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-white/80 px-6 py-2.5 border border-white/20 rounded-full"
              >
                Login
              </button>

              <button
                onClick={() => navigate('/register')}
                className="bg-[#7c3aed] text-white px-8 py-2.5 rounded-full"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* ✅ Mobile Toggle (UPDATED ONLY THIS) */}
        {!mobileMenuOpen && (
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-white p-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-md"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        )}
      </nav>

      {/* ✅ Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setMobileMenuOpen(false)}
        className="fixed inset-0 bg-black/70 z-[60] invisible opacity-0 backdrop-blur-sm"
      />

      {/* ✅ Sidebar */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-[85%] sm:w-400px backdrop-blur-sm text-white z-70 translate-x-full"
      >
        {/* Close */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white p-3 rounded-full border border-white/10 bg-white/5"
          >
            <ArrowLeft className="rotate-180" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col h-full p-10 pt-32 gap-8">
          <div className="flex flex-col gap-4 text-4xl font-bold">
            {navItems.map((item, index) => (
              <div key={item} ref={(el) => (linksRef.current[index] = el)}>
                <a
                  href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4 mt-auto mb-10">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/dashboard');
                }}
                className="w-full py-4 border text-xl"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full py-4 border text-xl"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/register');
                  }}
                  className="w-full py-4 bg-[#7c3aed] text-xl"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;