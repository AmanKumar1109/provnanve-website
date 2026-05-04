import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X } from 'lucide-react';
import { gsap } from 'gsap';

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", alt: "Main Stage Crowd", height: "h-[400px]" },
  { id: 2, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80", alt: "Hackathon Night", height: "h-[300px]" },
  { id: 3, src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80", alt: "Esports Tournament", height: "h-[450px]" },
  { id: 4, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", alt: "Live Concert", height: "h-[350px]" },
  { id: 5, src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80", alt: "Tech Expo", height: "h-[420px]" },
  { id: 6, src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", alt: "Cyber Security", height: "h-[380px]" },
  { id: 7, src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", alt: "Infrastructure", height: "h-[320px]" },
  { id: 8, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80", alt: "Collaboration", height: "h-[400px]" },
];

const SpotlightCard = ({ img, onImageClick, parentTimeline }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const lightRef = useRef(null);

  // Synchronize Parallax
  useEffect(() => {
    if (!parentTimeline || !imgRef.current || !lightRef.current) return;
    const isMovingUp = parseFloat(parentTimeline.vars.y) < 0;

    const innerParallax = gsap.fromTo([imgRef.current, lightRef.current],
      { y: isMovingUp ? "-12%" : "12%" },
      {
        y: isMovingUp ? "12%" : "-12%",
        ease: "none",
        repeat: -1,
        duration: parentTimeline.duration(),
      }
    );

    const sync = () => innerParallax.progress(parentTimeline.progress());
    gsap.ticker.add(sync);
    return () => gsap.ticker.remove(sync);
  }, [parentTimeline]);

  // Handle Mouse Movement for the "Light" Radius
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // Set CSS variables for the mask center
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={() => onImageClick(img)}
      className={`relative w-full ${img.height} rounded-3xl overflow-hidden bg-black border border-white/[0.06] hover:border-pink-500/40 transition-colors duration-500 cursor-pointer group [--mouse-x:50%] [--mouse-y:50%]`}
    >
      {/* 1. Base Image: Grayscale and Dim */}
      <img
        ref={imgRef}
        src={img.src}
        alt={img.alt}
        className="absolute inset-0 w-full h-[125%] object-cover grayscale brightness-[0.2] transition-all duration-700 will-change-transform"
      />

      {/* 2. Spotlight Layer: Full Color and Bright */}
      <div
        ref={lightRef}
        className="absolute inset-0 w-full h-[125%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-transform"
        style={{
          backgroundImage: `url(${img.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Mask creates the "Light" radius effect
          WebkitMaskImage: `radial-gradient(circle 150px at var(--mouse-x) var(--mouse-y), black 20%, transparent 100%)`,
          maskImage: `radial-gradient(circle 150px at var(--mouse-x) var(--mouse-y), black 20%, transparent 100%)`,
        }}
      />

      {/* Overlay Gradient for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

      {/* Hover Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-white font-bold text-lg">{img.alt}</h3>
            <p className="text-pink-500 text-[10px] font-black tracking-[0.2em] uppercase">Archive 01</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Maximize2 className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollingColumn = ({ images, speed, reverse = false, onImageClick }) => {
  const columnRef = useRef(null);
  const [timeline, setTimeline] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollDist = columnRef.current.offsetHeight / 2;
      const tl = gsap.to(columnRef.current, {
        y: reverse ? `+=${scrollDist}` : `-=${scrollDist}`,
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          y: gsap.utils.unitize(y => {
            const val = parseFloat(y);
            return reverse ? (val % scrollDist) - scrollDist : val % scrollDist;
          })
        }
      });
      setTimeline(tl);
    });
    return () => ctx.revert();
  }, [speed, reverse]);

  return (
    <div
      className="flex flex-col gap-6"
      onMouseEnter={() => timeline?.timeScale(0.05)} // Super slow on hover to enjoy the light effect
      onMouseLeave={() => timeline?.timeScale(1)}
    >
      <div ref={columnRef} className="flex flex-col gap-6">
        {[...images, ...images].map((img, idx) => (
          <SpotlightCard key={`${img.id}-${idx}`} img={img} onImageClick={onImageClick} parentTimeline={timeline} />
        ))}
      </div>
    </div>
  );
};

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const baseSpeed = 20;

  return (
    <section id="gallery" className="relative h-screen bg-[#05000a] overflow-hidden flex flex-col justify-center py-20">

      <div className="text-center mb-16">
        <span className="text-pink-400 text-xs font-bold tracking-[0.3em] uppercase">Memories</span>
        <h2 className="text-3xl sm:text-5xl font-bold text-white mt-2 mb-3">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Gallery</span>
        </h2>
        <p className="text-white/40 text-sm sm:text-base max-w-md mx-auto">
          Glimpses of the past, preparing for the future. Relive the best moments of Provenance.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 h-[75vh] gallery-mask">
        <ScrollingColumn images={galleryImages.slice(0, 3)} speed={baseSpeed} onImageClick={setSelectedImage} />
        <ScrollingColumn images={galleryImages.slice(3, 6)} speed={baseSpeed * 0.8} reverse={true} onImageClick={setSelectedImage} />
        <ScrollingColumn images={[...galleryImages.slice(6, 8), galleryImages[0]]} speed={baseSpeed * 1.2} onImageClick={setSelectedImage} />
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4" onClick={() => setSelectedImage(null)}>
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
          <div className="relative z-10 max-w-5xl w-full rounded-2xl overflow-hidden border border-white/10 scale-animation">
            <img src={selectedImage.src} alt={selectedImage.alt} className="w-full h-auto max-h-[85vh] object-contain" />
          </div>
        </div>
      )}

      <style>
        {`
          .gallery-mask {
            mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
            -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
          }
          .scale-animation {
            animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}
      </style>
    </section>
  );
};

export default GallerySection;