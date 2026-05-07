import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register the GSAP plugin
gsap.registerPlugin(useGSAP);

function PageTransition({ children }) {
  const [done, setDone] = useState(false);
  const [percentage, setPercentage] = useState(0);

  // Refs for animation targets
  const panelsRef = useRef([]);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const percentTextRef = useRef(null);

  useGSAP(() => {
    const counter = { value: 0 };

    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onComplete: () => setDone(true),
    });

    // --- 1. Set Initial States ---
    gsap.set(panelsRef.current, { y: "0%" });
    gsap.set(percentTextRef.current, { y: "100%", opacity: 0 });
    gsap.set(contentRef.current, {
      scale: 1.05,
      opacity: 0,
    });

    // --- 2. Build Timeline ---

    // Slide the percentage text up into view
    tl.to(percentTextRef.current, {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      ease: "expo.out"
    })
      // Animate the counter object from 0 to 100
      .to(counter, {
        value: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          setPercentage(Math.floor(counter.value));
        },
      })
      // Fade the percentage text out
      .to(percentTextRef.current, {
        y: "-20%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      })
      // Lift the black columns (staggered from the center column out)
      .to(panelsRef.current, {
        y: "-100%",
        duration: 1.2,
        stagger: {
          amount: 0.4,
          from: "center",
        },
      }, "-=0.2")
      // Reveal the main page content (zoom in)
      .to(contentRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "expo.out",
        clearProps: "all"
      }, "-=1");

    // Cleanup timeline on unmount
    return () => tl.kill();
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* LOADER OVERLAY */}
      {!done && (
        <div className="fixed inset-0 z-[99999] pointer-events-none">
          {/* 5 Column Grid */}
          <div className="absolute inset-0 grid grid-cols-5 pointer-events-auto">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                ref={(el) => (panelsRef.current[i] = el)}
                className="bg-zinc-800 -ml-px will-change-transform"
              />
            ))}
          </div>

          {/* Large Background Percentage Text */}
          <div
            ref={percentTextRef}
            className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10"
          >
            <h1 className="text-[#C167FF] text-[35vw] md:text-[30vw] font-black leading-none tracking-tighter italic select-none">
              {percentage}
            </h1>
          </div>
        </div>
      )}

      {/* ACTUAL PAGE CONTENT */}
      <div ref={contentRef}>
        {children}
      </div>
    </main>
  );
}

export default PageTransition;