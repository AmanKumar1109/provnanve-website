import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const KunaiSVG = () => (
  <svg width="30" height="80" viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Blade - Cyber Theme Colors */}
    <path 
      d="M20 95L5 45L20 35L35 45L20 95Z" 
      fill="#1a0b2e" 
      stroke="#a855f7" 
      strokeWidth="1.5"
      className="drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
    />
    {/* Central Blade Detail */}
    <path d="M20 95L20 35" stroke="#d946ef" strokeWidth="0.8" strokeOpacity="0.6"/>
    
    {/* Handle Guard */}
    <rect x="15" y="32" width="10" height="3" rx="1" fill="#4c1d95" stroke="#a855f7" strokeWidth="0.5"/>
    
    {/* Handle Wrap */}
    <rect x="17" y="10" width="6" height="22" fill="#1e1b4b"/>
    <path d="M17 14H23M17 18H23M17 22H23M17 26H23M17 30H23" stroke="#a855f7" strokeWidth="0.8" strokeOpacity="0.5"/>
    
    {/* Ring */}
    <circle cx="20" cy="8" r="6" stroke="#d946ef" strokeWidth="2.5" className="drop-shadow-[0_0_5px_rgba(217,70,239,0.6)]"/>
  </svg>
);

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 35, stiffness: 600 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const FIXED_ROTATION = 180; // Tip points UP

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Trail logic
      setTrail(prev => [{ x: e.clientX, y: e.clientY, id: now }, ...prev].slice(0, 4));

      const target = e.target;
      const isClickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <style>{`
        body { cursor: none; }
        button, a { cursor: none !important; }
        @media (max-width: 1024px) {
          body, button, a { cursor: auto !important; }
          .kunai-cursor-container { display: none; }
        }
      `}</style>

      <div className="kunai-cursor-container pointer-events-none fixed inset-0 z-[9999]">
        {/* Shadow Clone Trails */}
        <AnimatePresence>
          {trail.map((point) => (
            <motion.div
              key={point.id}
              className="fixed opacity-10"
              style={{
                left: point.x,
                top: point.y,
                translateX: '-50%',
                translateY: '-5%', // Adjusted for tip at the top
                rotate: FIXED_ROTATION,
              }}
              initial={{ opacity: 0.1, scale: 0.5 }}
              animate={{ opacity: 0, scale: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <KunaiSVG />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Impact Ripple on Click */}
        {isClicking && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            className="fixed rounded-full border-2 border-[#d946ef]/50"
            style={{
              left: mouseX.get(),
              top: mouseY.get(),
              width: 15,
              height: 15,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        )}

        {/* Main Kunai */}
        <motion.div
          className="fixed z-50"
          style={{
            left: cursorX,
            top: cursorY,
            translateX: '-50%',
            translateY: '-5%', // Now the sharp tip (which is at the top) is exactly at the mouse point
            rotate: isPointer ? FIXED_ROTATION + 15 : FIXED_ROTATION,
          }}
          animate={{
            scale: isPointer ? 0.6 : 0.5,
          }}
        >
          {/* Theme Aura Glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7c3aed]/40 to-[#d946ef]/40 blur-2xl scale-[2.5]"
            animate={{
              opacity: isPointer ? 1 : 0.4,
              scale: isPointer ? 3 : 2.5,
            }}
          />
          
          {/* Kunai Visual */}
          <motion.div
            animate={{
              rotate: isClicking ? [0, -30, 0] : 0,
              x: isClicking ? [0, 10, 0] : 0,
            }}
            transition={{ duration: 0.1 }}
          >
            <KunaiSVG />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default CustomCursor;
