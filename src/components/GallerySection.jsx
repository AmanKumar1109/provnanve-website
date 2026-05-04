import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", alt: "Main Stage Crowd", size: "large" },
  { id: 2, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80", alt: "Hackathon Night", size: "medium" },
  { id: 3, src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80", alt: "Esports Tournament", size: "tall" },
  { id: 4, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", alt: "Live Concert", size: "wide" },
  { id: 5, src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80", alt: "Tech Expo", size: "medium" },
  { id: 6, src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", alt: "Cyber Security Workshop", size: "tall" },
  { id: 7, src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", alt: "Server Infrastructure", size: "wide" },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#0a0014] overflow-hidden">
      {/* ── Background Glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <span className="text-pink-400 text-xs font-bold tracking-[0.3em] uppercase">Memories</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-2 mb-3">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Gallery</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-md mx-auto">
            Glimpses of the past, preparing for the future. Relive the best moments of Provenance.
          </p>
        </div>

        {/* ── Bento Box Gallery Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
          {galleryImages.map((item) => {
            // Determine column and row spans based on the size property
            let spanClasses = "";
            switch(item.size) {
              case "large": spanClasses = "md:col-span-2 md:row-span-2"; break;
              case "wide": spanClasses = "md:col-span-2 md:row-span-1"; break;
              case "tall": spanClasses = "md:col-span-1 md:row-span-2"; break;
              default: spanClasses = "md:col-span-1 md:row-span-1"; break;
            }

            return (
              <div 
                key={item.id} 
                onClick={() => setSelectedImage(item)}
                className={`group relative rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/[0.06] hover:border-pink-500/30 transition-all duration-500 cursor-pointer ${spanClasses}`}
              >
                {/* Image */}
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0014] via-[#0a0014]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Content on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-white font-bold text-lg sm:text-xl drop-shadow-md">{item.alt}</h3>
                      <p className="text-pink-400/80 text-xs font-semibold tracking-wider uppercase mt-1">Provenance</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(236,72,153,0.3)] group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ boxShadow: 'inset 0 0 20px rgba(236, 72, 153, 0.2)' }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Image Modal (Lightbox) ── */}
      {selectedImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4" onClick={() => setSelectedImage(null)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors z-50"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Expanded Image Container */}
          <div 
            className="relative z-10 max-w-5xl w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.3s ease-out' }}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="w-full h-auto max-h-[85vh] object-contain bg-[#0a0014]"
            />
            {/* Image Details Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
              <h3 className="text-white text-2xl font-bold">{selectedImage.alt}</h3>
              <p className="text-pink-400 text-sm tracking-widest uppercase mt-1">Provenance Gallery</p>
            </div>
          </div>
        </div>
      )}

      {/* Basic inline keyframe for modal animation */}
      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default GallerySection;
