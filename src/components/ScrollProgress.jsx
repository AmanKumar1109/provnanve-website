import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ScrollProgress = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight <= 0) return;
      
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollWidth(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also update on resize
    window.addEventListener('resize', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={`fixed top-0 left-0 h-[3px] md:h-[4px] z-[2147483647] theme-bar transition-all duration-300 ease-out ${
        scrollWidth > 0 ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ width: `${scrollWidth}%` }}
    />,
    document.body
  );
};

export default ScrollProgress;
