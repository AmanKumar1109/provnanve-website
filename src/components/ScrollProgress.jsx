import React from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  // Create a spring-animated value for the scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Fade in the bar only when the user has scrolled a little bit
  const opacity = useTransform(scrollYProgress, [0, 0.005], [0, 1]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] md:h-[4px] z-[2147483647] theme-bar origin-left"
      style={{ 
        scaleX,
        opacity 
      }}
    />,
    document.body
  );
};

export default ScrollProgress;
