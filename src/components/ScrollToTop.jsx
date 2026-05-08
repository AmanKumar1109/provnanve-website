import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    tweenRef.current?.kill();

    if (isVisible) {
      gsap.set(btn, { display: 'flex' });
      tweenRef.current = gsap.fromTo(
        btn,
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    } else {
      tweenRef.current = gsap.to(btn, {
        opacity: 0,
        scale: 0.5,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => gsap.set(btn, { display: 'none' }),
      });
    }
  }, [isVisible]);

  const handleMouseEnter = () => gsap.to(buttonRef.current, { scale: 1.1, duration: 0.2 });
  const handleMouseLeave = () => gsap.to(buttonRef.current, { scale: 1, duration: 0.2 });
  const handleMouseDown = () => gsap.to(buttonRef.current, { scale: 0.9, duration: 0.1 });
  const handleMouseUp = () => gsap.to(buttonRef.current, { scale: 1.1, duration: 0.1 });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (typeof document === 'undefined') return null;

  return createPortal(
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ display: 'none', opacity: 0 }}
      className="fixed right-6 bottom-6 md:right-10 md:bottom-10 w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-shadow z-[9999] border border-white/10"
    >
      <ChevronUp size={24} />
    </button>,
    document.body
  );
};

export default ScrollToTop;