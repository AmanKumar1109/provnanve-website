import { useState, useEffect, useRef, useCallback } from 'react';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import galleryImg1 from '../assets/gallaryImages/1.jpeg';
import galleryImg2 from '../assets/gallaryImages/2.jpeg';
import galleryImg3 from '../assets/gallaryImages/3.jpeg';
import galleryImg4 from '../assets/gallaryImages/4.jpeg';
import galleryImg5 from '../assets/gallaryImages/5.jpeg';
import galleryImg6 from '../assets/gallaryImages/6.jpeg';
import galleryImg7 from '../assets/gallaryImages/7.jpeg';
import galleryImg8 from '../assets/gallaryImages/8.jpeg';

const galleryImages = [
  { id: 1, src: galleryImg1, alt: "Main Stage Crowd" },
  { id: 2, src: galleryImg2, alt: "Hackathon Night" },
  { id: 3, src: galleryImg3, alt: "Esports Tournament" },
  { id: 4, src: galleryImg4, alt: "Live Concert" },
  { id: 5, src: galleryImg5, alt: "Tech Expo" },
  { id: 6, src: galleryImg6, alt: "Cyber Security" },
  { id: 7, src: galleryImg7, alt: "Infrastructure" },
  { id: 8, src: galleryImg8, alt: "Collaboration" },
];

/* ─── Single Gallery Card with 3D Tilt + Spotlight ─── */
const GalleryCard = ({ img, onImageClick, index }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const reflectionRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // 3D tilt
    const rotateX = (y - 0.5) * -20;
    const rotateY = (x - 0.5) * 20;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    });

    // Spotlight glow position
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(168,85,247,0.4) 0%, transparent 60%)`;
    }

    // Reflection / shine sweep
    if (reflectionRef.current) {
      reflectionRef.current.style.background = `linear-gradient(${105 + (x - 0.5) * 40}deg, transparent 30%, rgba(255,255,255,0.12) ${45 + x * 20}%, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
    if (glowRef.current) glowRef.current.style.background = 'transparent';
    if (reflectionRef.current) reflectionRef.current.style.background = 'transparent';
  };

  return (
    <div
      className="gallery-card-wrapper"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        className="gallery-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onImageClick(img)}
        style={{ animationDelay: `${index * 0.08}s` }}
      >
        {/* Image */}
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className="gallery-card-img"
          draggable={false}
        />

        {/* Dark overlay gradient */}
        <div className="gallery-card-overlay" />

        {/* Spotlight glow layer */}
        <div ref={glowRef} className="gallery-card-glow" />

        {/* Reflection / shine layer */}
        <div ref={reflectionRef} className="gallery-card-reflection" />

        {/* Hover border glow */}
        <div className="gallery-card-border-glow" />

        {/* Content */}
        <div className="gallery-card-content">
          <div className="gallery-card-content-inner">
            <div>
              <h3 className="gallery-card-title">{img.alt}</h3>
              <p className="gallery-card-subtitle">Provenance Archive</p>
            </div>
            <div className="gallery-card-icon">
              <Maximize2 size={14} />
            </div>
          </div>
        </div>

        {/* Scanline effect on hover */}
        <div className="gallery-card-scanlines" />
      </div>
    </div>
  );
};

/* ─── Main Gallery Section ─── */
const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumId = useRef(null);
  const autoScrollSpeed = useRef(0.5);
  const isPaused = useRef(false);

  // Duplicate images for seamless infinite loop: 3 copies
  const loopedImages = [...galleryImages, ...galleryImages, ...galleryImages];

  // Auto-scroll animation using GSAP ticker
  useEffect(() => {
    let offset = 0;
    const track = trackRef.current;
    if (!track) return;

    // Calculate one set width for looping
    const getSetWidth = () => {
      const cards = track.querySelectorAll('.gallery-card-wrapper');
      if (!cards.length) return 0;
      const gap = 24; // matches CSS gap
      const totalCards = galleryImages.length;
      let width = 0;
      for (let i = 0; i < totalCards; i++) {
        width += cards[i].offsetWidth + gap;
      }
      return width;
    };

    const tick = () => {
      if (isPaused.current || isDragging.current) return;

      offset -= autoScrollSpeed.current;
      const setWidth = getSetWidth();
      if (setWidth <= 0) return;

      // Loop back seamlessly
      if (Math.abs(offset) >= setWidth) {
        offset += setWidth;
      }
      if (offset > 0) {
        offset -= setWidth;
      }

      gsap.set(track, { x: offset });
    };

    gsap.ticker.add(tick);
    animRef.current = { tick, getOffset: () => offset, setOffset: (v) => { offset = v; } };

    return () => {
      gsap.ticker.remove(tick);
    };
  }, []);

  // Drag-to-scroll interaction
  const handlePointerDown = useCallback((e) => {
    isDragging.current = true;
    startX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    scrollLeft.current = animRef.current?.getOffset() || 0;
    lastX.current = startX.current;
    lastTime.current = Date.now();
    velocity.current = 0;

    if (momentumId.current) {
      cancelAnimationFrame(momentumId.current);
      momentumId.current = null;
    }

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    const dx = x - startX.current;
    const now = Date.now();
    const dt = now - lastTime.current;

    if (dt > 0) {
      velocity.current = (x - lastX.current) / dt;
    }

    lastX.current = x;
    lastTime.current = now;

    const newOffset = scrollLeft.current + dx;
    animRef.current?.setOffset(newOffset);
    gsap.set(trackRef.current, { x: newOffset });
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }

    // Momentum scroll
    let vel = velocity.current * 15; // amplify
    const decel = 0.95;

    const momentum = () => {
      if (Math.abs(vel) < 0.1) return;

      vel *= decel;
      const current = animRef.current?.getOffset() || 0;
      const newOffset = current + vel;
      animRef.current?.setOffset(newOffset);
      gsap.set(trackRef.current, { x: newOffset });

      momentumId.current = requestAnimationFrame(momentum);
    };

    momentum();
  }, []);

  // Attach pointer events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousedown', handlePointerDown);
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('mouseleave', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    container.addEventListener('touchmove', handlePointerMove, { passive: false });
    container.addEventListener('touchend', handlePointerUp);

    return () => {
      container.removeEventListener('mousedown', handlePointerDown);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('mouseleave', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      container.removeEventListener('touchmove', handlePointerMove);
      container.removeEventListener('touchend', handlePointerUp);
    };
  }, [handlePointerDown, handlePointerMove, handlePointerUp]);

  // Scroll with wheel (horizontal)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Use deltaY for horizontal scroll
      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) < 1) return;

      const current = animRef.current?.getOffset() || 0;
      const newOffset = current - delta * 1.5;
      animRef.current?.setOffset(newOffset);
      gsap.set(trackRef.current, { x: newOffset });
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Nav buttons
  const scrollByAmount = (dir) => {
    const current = animRef.current?.getOffset() || 0;
    const amount = window.innerWidth * 0.4 * dir;
    gsap.to(trackRef.current, {
      x: current + amount,
      duration: 0.8,
      ease: 'power3.out',
      onUpdate: function () {
        animRef.current?.setOffset(gsap.getProperty(trackRef.current, 'x'));
      },
    });
  };

  // Lightbox
  useEffect(() => {
    const handlePopState = () => {
      if (selectedImage) setSelectedImage(null);
    };
    if (selectedImage) {
      window.history.pushState({ galleryModal: true }, '');
      window.addEventListener('popstate', handlePopState);
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedImage]);

  const closeModal = () => {
    setSelectedImage(null);
    if (window.history.state?.galleryModal) window.history.back();
  };

  return (
    <section id="gallery" className="gallery-section">
      {/* Heading */}
      <div className="gallery-header">
        <span className="gallery-tag">Memories</span>
        <h2 className="gallery-title">
          Our <span className="gallery-title-accent">Gallery</span>
        </h2>
        <p className="gallery-description">
          Glimpses of the past, preparing for the future. Relive the best moments of Provenance.
        </p>
      </div>

      {/* Navigation Arrows (desktop) */}
      <button
        className="gallery-nav gallery-nav-left"
        onClick={() => scrollByAmount(1)}
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="gallery-nav gallery-nav-right"
        onClick={() => scrollByAmount(-1)}
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>

      {/* Scrolling Track */}
      <div
        ref={containerRef}
        className="gallery-container"
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
      >
        <div ref={trackRef} className="gallery-track">
          {loopedImages.map((img, idx) => (
            <GalleryCard
              key={`${img.id}-${idx}`}
              img={img}
              index={idx}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint for mobile */}
      <div className="gallery-scroll-hint">
        <div className="gallery-scroll-hint-track">
          <div className="gallery-scroll-hint-thumb" />
        </div>
        <span className="gallery-scroll-hint-text">Drag to explore</span>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="gallery-lightbox" onClick={closeModal}>
          <div className="gallery-lightbox-backdrop" />
          <div className="gallery-lightbox-content">
            <img src={selectedImage.src} alt={selectedImage.alt} className="gallery-lightbox-img" />
          </div>
        </div>
      )}

      <style>{galleryStyles}</style>
    </section>
  );
};

/* ─── Styles ─── */
const galleryStyles = `
  .gallery-section {
    position: relative;
    min-height: 100vh;
    background: #05000a;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 0 60px;
  }

  /* ── Header ── */
  .gallery-header {
    text-align: center;
    margin-bottom: 48px;
    padding: 0 20px;
    position: relative;
    z-index: 5;
  }

  .gallery-tag {
    color: #c084fc;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }

  .gallery-title {
    font-size: clamp(1.8rem, 5vw, 3.2rem);
    font-weight: 800;
    color: #fff;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .gallery-title-accent {
    background: linear-gradient(135deg, #a855f7, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gallery-description {
    color: rgba(255,255,255,0.35);
    font-size: clamp(0.8rem, 2vw, 0.95rem);
    max-width: 420px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* ── Navigation Arrows ── */
  .gallery-nav {
    display: none;
    position: absolute;
    top: 55%;
    z-index: 20;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(168,85,247,0.12);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(168,85,247,0.25);
    color: #c084fc;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .gallery-nav:hover {
    background: rgba(168,85,247,0.3);
    border-color: rgba(168,85,247,0.5);
    transform: scale(1.1);
    box-shadow: 0 0 25px rgba(168,85,247,0.3);
  }

  .gallery-nav-left { left: 20px; }
  .gallery-nav-right { right: 20px; }

  @media (min-width: 768px) {
    .gallery-nav { display: flex; }
  }

  /* ── Container & Track ── */
  .gallery-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    cursor: grab;
    padding: 30px 0;
    /* Cylindrical fade edges */
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 8%,
      black 92%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 8%,
      black 92%,
      transparent 100%
    );
  }

  .gallery-track {
    display: flex;
    gap: 24px;
    padding: 20px 40px;
    will-change: transform;
  }

  /* ── Card Wrapper ── */
  .gallery-card-wrapper {
    flex-shrink: 0;
    width: 280px;
    height: 360px;
  }

  @media (min-width: 480px) {
    .gallery-card-wrapper {
      width: 320px;
      height: 400px;
    }
  }

  @media (min-width: 768px) {
    .gallery-card-wrapper {
      width: 380px;
      height: 440px;
    }
  }

  @media (min-width: 1200px) {
    .gallery-card-wrapper {
      width: 420px;
      height: 480px;
    }
  }

  /* ── Card ── */
  .gallery-card {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: box-shadow 0.4s ease;
    will-change: transform;
  }

  .gallery-card:hover {
    box-shadow:
      0 20px 60px rgba(168,85,247,0.2),
      0 0 40px rgba(236,72,153,0.1),
      inset 0 0 30px rgba(168,85,247,0.05);
  }

  /* ── Card Image ── */
  .gallery-card-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.7s ease;
    filter: saturate(0.7) brightness(0.75);
    user-select: none;
    pointer-events: none;
  }

  .gallery-card:hover .gallery-card-img {
    transform: scale(1.1);
    filter: saturate(1.1) brightness(0.9);
  }

  /* ── Dark Overlay ── */
  .gallery-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(5,0,10,0.95) 0%,
      rgba(5,0,10,0.4) 40%,
      rgba(5,0,10,0.05) 70%,
      transparent 100%
    );
    transition: opacity 0.5s ease;
  }

  .gallery-card:hover .gallery-card-overlay {
    background: linear-gradient(
      to top,
      rgba(5,0,10,0.85) 0%,
      rgba(5,0,10,0.2) 50%,
      transparent 100%
    );
  }

  /* ── Glow Layer ── */
  .gallery-card-glow {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 2;
  }

  .gallery-card:hover .gallery-card-glow {
    opacity: 1;
  }

  /* ── Reflection Layer ── */
  .gallery-card-reflection {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 3;
    mix-blend-mode: overlay;
  }

  .gallery-card:hover .gallery-card-reflection {
    opacity: 1;
  }

  /* ── Border Glow ── */
  .gallery-card-border-glow {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    border: 1px solid rgba(168,85,247,0.08);
    transition: border-color 0.5s ease;
    pointer-events: none;
    z-index: 5;
  }

  .gallery-card:hover .gallery-card-border-glow {
    border-color: rgba(168,85,247,0.4);
    box-shadow: inset 0 0 20px rgba(168,85,247,0.08);
  }

  /* ── Scanlines ── */
  .gallery-card-scanlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(168,85,247,0.02) 2px,
      rgba(168,85,247,0.02) 4px
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    z-index: 4;
  }

  .gallery-card:hover .gallery-card-scanlines {
    opacity: 1;
  }

  /* ── Card Content ── */
  .gallery-card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
    z-index: 6;
    transform: translateY(10px);
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .gallery-card:hover .gallery-card-content {
    transform: translateY(0);
    opacity: 1;
  }

  /* On mobile, always show content */
  @media (max-width: 767px) {
    .gallery-card-content {
      transform: translateY(0);
      opacity: 1;
      padding: 16px;
    }
  }

  .gallery-card-content-inner {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 12px;
  }

  .gallery-card-title {
    color: #fff;
    font-size: clamp(0.85rem, 2vw, 1.05rem);
    font-weight: 700;
    line-height: 1.3;
  }

  .gallery-card-subtitle {
    color: #c084fc;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-top: 4px;
  }

  .gallery-card-icon {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 0.3s ease;
  }

  .gallery-card-icon:hover {
    background: rgba(168,85,247,0.3);
    border-color: rgba(168,85,247,0.5);
  }

  /* ── Scroll Hint (mobile) ── */
  .gallery-scroll-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    z-index: 5;
    position: relative;
  }

  @media (min-width: 768px) {
    .gallery-scroll-hint { display: none; }
  }

  .gallery-scroll-hint-track {
    width: 60px;
    height: 3px;
    border-radius: 2px;
    background: rgba(255,255,255,0.08);
    overflow: hidden;
  }

  .gallery-scroll-hint-thumb {
    width: 24px;
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, #a855f7, #ec4899);
    animation: scrollHintSlide 2s ease-in-out infinite;
  }

  @keyframes scrollHintSlide {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(36px); }
  }

  .gallery-scroll-hint-text {
    color: rgba(255,255,255,0.25);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* ── Lightbox ── */
  .gallery-lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .gallery-lightbox-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.95);
    backdrop-filter: blur(20px);
  }

  .gallery-lightbox-content {
    position: relative;
    z-index: 10;
    max-width: 1100px;
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    animation: lightboxIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .gallery-lightbox-img {
    width: 100%;
    height: auto;
    max-height: 85vh;
    object-fit: contain;
  }

  @keyframes lightboxIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  /* ── Ambient background glow ── */
  .gallery-section::before {
    content: '';
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 50%;
    background: radial-gradient(
      ellipse at center,
      rgba(168,85,247,0.06) 0%,
      rgba(236,72,153,0.03) 40%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }
`;

export default GallerySection;