import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const AnnouncementPopup = () => {
  const popupRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const popup = popupRef.current;
    const content = contentRef.current;
    const glow = glowRef.current;

    // Set initial state — hidden, scaled down, slightly below
    gsap.set(popup, {
      opacity: 0,
      scale: 0.3,
      y: 40,
      rotateX: 15,
    });
    gsap.set(glow, { opacity: 0, scale: 0.5 });

    // Create the pop-out entrance timeline
    const tl = gsap.timeline({ delay: 1.5 });

    // 1. Pop in with elastic bounce
    tl.to(popup, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
    })
    // 2. Glow pulse behind
    .to(glow, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.4')
    // 3. Subtle attention-grabbing pulse
    .to(popup, {
      scale: 1.03,
      duration: 0.3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
    }, '+=0.3');

    // Continuous floating animation
    gsap.to(popup, {
      y: -6,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 3,
    });

    // Continuous glow pulsing
    gsap.to(glow, {
      opacity: 0.5,
      scale: 1.1,
      duration: 1.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 3,
    });

    return () => {
      tl.kill();
    };
  }, [dismissed]);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const popup = popupRef.current;
    gsap.to(popup, {
      opacity: 0,
      scale: 0.5,
      y: 30,
      duration: 0.4,
      ease: 'back.in(2)',
      onComplete: () => setDismissed(true),
    });
  };

  if (dismissed) return null;

  return (
    <div
      ref={popupRef}
      className="announcement-popup"
      style={{ perspective: '800px' }}
    >
      {/* Glow effect behind the popup */}
      <div
        ref={glowRef}
        className="absolute -inset-3 rounded-2xl opacity-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(217, 70, 239, 0.15) 40%, transparent 70%)',
          filter: 'blur(15px)',
          zIndex: -1,
        }}
      />

      {/* Close button */}
      <button
        onClick={handleDismiss}
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200 z-20 text-xs"
        aria-label="Dismiss announcement"
      >
        ✕
      </button>

      {/* Inner content */}
      <a
        ref={contentRef}
        href="https://chat.whatsapp.com/Fpoi8MOrwxr5F3ul0PrjZ9"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-2.5 md:gap-3 px-4 py-2.5 md:px-5 md:py-3 rounded-xl text-white/95 text-xs md:text-sm font-medium tracking-wide hover:text-white transition-all duration-300 group cursor-pointer overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(12, 1, 24, 0.9) 0%, rgba(26, 5, 51, 0.9) 40%, rgba(15, 10, 31, 0.9) 70%, rgba(18, 8, 38, 0.9) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 announcement-popup-shimmer pointer-events-none rounded-xl" />

        {/* Pulsing dot */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="announcement-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
        </span>

        <span className="uppercase tracking-[0.15em] font-semibold text-purple-300 text-[10px] md:text-xs shrink-0">New</span>

        <span className="w-px h-3.5 bg-white/20 shrink-0"></span>

        <span className="hidden sm:inline">Join Provenance WhatsApp community</span>
        <span className="sm:hidden">Join WhatsApp</span>

        <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-[11px] md:text-xs font-semibold text-green-300 group-hover:bg-green-500/20 group-hover:border-green-400/30 transition-all duration-300 shrink-0">
          <WhatsAppIcon />
          <span className="hidden sm:inline">Join Now</span>
        </span>
      </a>
    </div>
  );
};

export default AnnouncementPopup;
