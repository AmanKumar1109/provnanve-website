import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const KunaiSVG = ({ className }) => (
  <svg width="30" height="80" viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M20 95L5 45L20 35L35 45L20 95Z" 
      fill="#1a0b2e" 
      stroke="#a855f7" 
      strokeWidth="1.5"
    />
    <path d="M20 95L20 35" stroke="#d946ef" strokeWidth="0.8" strokeOpacity="0.6"/>
    <rect x="15" y="32" width="10" height="3" rx="1" fill="#4c1d95" stroke="#a855f7" strokeWidth="0.5"/>
    <rect x="17" y="10" width="6" height="22" fill="#1e1b4b"/>
    <path d="M17 14H23M17 18H23M17 22H23M17 26H23M17 30H23" stroke="#a855f7" strokeWidth="0.8" strokeOpacity="0.5"/>
    <circle cx="20" cy="8" r="6" stroke="#d946ef" strokeWidth="2.5" />
  </svg>
);

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const auraRef = useRef(null);
  const visualRef = useRef(null);
  const containerRef = useRef(null);
  
  // Constants
  const FIXED_ROTATION = 180;

  useEffect(() => {
    const cursor = cursorRef.current;
    const aura = auraRef.current;
    const visual = visualRef.current;
    const container = containerRef.current;

    // 1. Initial Setters
    gsap.set([cursor, aura], { xPercent: -50, yPercent: -5, rotation: FIXED_ROTATION });
    gsap.set(aura, { opacity: 0.4, scale: 2.5 });
    gsap.set(visual, { scale: 0.5 });

    // 2. Idle Pulsing Aura
    const auraPulse = gsap.to(aura, {
      scale: 3,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY, target } = e;

      // Main Follow Movement (Quick Lag/Spring effect)
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: "power3.out"
      });

      // Shadow Clone Trail Logic
      createTrail(clientX, clientY);

      // Hover Detection
      const isClickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';

      // Hover Animations
      gsap.to(cursor, {
        rotation: isClickable ? FIXED_ROTATION + 15 : FIXED_ROTATION,
        duration: 0.3
      });
      gsap.to(visual, {
        scale: isClickable ? 0.6 : 0.5,
        duration: 0.2
      });
      gsap.to(aura, {
        opacity: isClickable ? 1 : 0.4,
        duration: 0.3
      });
    };

    const createTrail = (x, y) => {
      const trail = document.createElement('div');
      trail.className = "fixed pointer-events-none opacity-10 z-[9998]";
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      
      // Inject SVG string or clone node (using string for simplicity here)
      trail.innerHTML = `<div style="transform: translate(-50%, -5%) rotate(${FIXED_ROTATION}deg) scale(0.3)"><svg width="30" height="80" viewBox="0 0 40 100" fill="none"><path d="M20 95L5 45L20 35L35 45L20 95Z" fill="#1a0b2e" stroke="#a855f7" strokeWidth="1.5"/><circle cx="20" cy="8" r="6" stroke="#d946ef" strokeWidth="2.5" /></svg></div>`;
      
      container.appendChild(trail);

      gsap.to(trail, {
        opacity: 0,
        scale: 0.2,
        duration: 0.4,
        onComplete: () => trail.remove()
      });
    };

    const handleMouseDown = () => {
      // Impact Slash Animation
      gsap.to(visual, {
        rotation: -35,
        x: 15,
        duration: 0.1,
        ease: "back.out(2)",
        onComplete: () => {
          gsap.to(visual, { rotation: 0, x: 0, duration: 0.2 });
        }
      });

      // Ripple Effect
      const ripple = document.createElement('div');
      ripple.className = "fixed rounded-full border-2 border-[#d946ef]/50 z-[9997]";
      gsap.set(ripple, {
        width: 15, height: 15, xPercent: -50, yPercent: -50,
        x: gsap.getProperty(cursor, "x"),
        y: gsap.getProperty(cursor, "y"),
        scale: 0, opacity: 0.8
      });
      container.appendChild(ripple);

      gsap.to(ripple, {
        scale: 4, opacity: 0, duration: 0.5, 
        onComplete: () => ripple.remove() 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      auraPulse.kill();
    };
  }, []);

  return (
    <>
      <style>{`
        body, button, a, select, input { cursor: none !important; }
        @media (max-width: 1024px) {
          body, button, a, select, input { cursor: auto !important; }
          .kunai-cursor-wrapper { display: none; }
        }
      `}</style>

      <div ref={containerRef} className="kunai-cursor-wrapper pointer-events-none fixed inset-0 z-[9999]">
        {/* Main Kunai Group */}
        <div ref={cursorRef} className="fixed">
          {/* Aura Glow */}
          <div 
            ref={auraRef}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7c3aed]/30 to-[#d946ef]/30 blur-2xl"
          />
          
          {/* Kunai Visual */}
          <div ref={visualRef}>
            <KunaiSVG className="drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;