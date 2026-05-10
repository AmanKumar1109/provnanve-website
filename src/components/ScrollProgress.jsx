import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Start hidden
    gsap.set(bar, { scaleX: 0, opacity: 0, transformOrigin: 'left center' });

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const progress = self.progress;

        gsap.set(bar, {
          scaleX: progress,
          // Mirror framer-motion fade: visible only after 0.5% scroll
          opacity: Math.min(progress / 0.005, 1),
        });
      },
    });

    return () => st.kill();
  }, []);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={barRef}
      className="fixed top-10 left-0 right-0 h-[3px] md:h-[4px] z-[2147483647] theme-bar"
    />,
    document.body
  );
};

export default ScrollProgress;