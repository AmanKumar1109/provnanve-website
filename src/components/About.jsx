import React, { useLayoutEffect, useRef, useCallback } from 'react';
import { Users, Rocket, Cpu, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import gallery images for the slider
import img1 from '../assets/gallaryImages/1.jpeg';
import img2 from '../assets/gallaryImages/2.jpeg';
import img3 from '../assets/gallaryImages/3.jpeg';
import img4 from '../assets/gallaryImages/4.jpeg';
import img5 from '../assets/gallaryImages/5.jpeg';
import img6 from '../assets/gallaryImages/6.jpeg';
import img7 from '../assets/gallaryImages/7.jpeg';
import img8 from '../assets/gallaryImages/8.jpeg';
import imgLogo from '../assets/logo.png';
import imgPicon from '../assets/picon.png';
import celeb from '../assets/image_copy.png';
import imgRvs from '../assets/RVS_Logo_Coloured_White_bg.png';

gsap.registerPlugin(ScrollTrigger);

const sliderImages = [
  celeb, img1, img2, img3, img4, img5, img6, img7, img8,
  imgLogo, imgPicon, imgRvs,
];

/* Hide scrollbar (injected once) */
const SCROLLBAR_STYLE_ID = 'about-slider-scrollbar-hide';
if (typeof document !== 'undefined' && !document.getElementById(SCROLLBAR_STYLE_ID)) {
  const style = document.createElement('style');
  style.id = SCROLLBAR_STYLE_ID;
  style.textContent = `
    .about-stacked-scroll::-webkit-scrollbar { display: none; }
    .about-stacked-scroll { -ms-overflow-style: none; scrollbar-width: none; }
  `;
  document.head.appendChild(style);
}

const About = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef([]);
  const visualRef = useRef(null);
  const badgeRef = useRef(null);
  const scrollBoxRef = useRef(null);
  const cardRefs = useRef([]);

  const stats = [
    { icon: <Users className="w-6 h-6" />, label: 'Attendees', value: '5,000+' },
    { icon: <Rocket className="w-6 h-6" />, label: 'Innovation', value: 'Next-Gen' },
    { icon: <Cpu className="w-6 h-6" />, label: 'Events', value: '50+' },
    { icon: <Globe className="w-6 h-6" />, label: 'Reach', value: 'National' },
  ];

  /* ── Stacked cards scroll handler ── */
  const handleScroll = useCallback(() => {
    const box = scrollBoxRef.current;
    if (!box) return;

    const containerH = box.clientHeight;
    const scrollTop = box.scrollTop;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;

      // How far this card's "section" has been scrolled past
      const cardStart = idx * containerH;
      const progress = (scrollTop - cardStart) / containerH; // 0 = just arrived, 1 = fully scrolled past

      if (progress < 0) {
        // Card hasn't been reached yet — it sits below, fully normal
        card.style.transform = 'scale(1) translateY(0)';
        card.style.opacity = '1';
        card.style.boxShadow = 'none';
      } else if (progress >= 0 && progress < 1) {
        // Card is currently being scrolled past — scale it down, push it back
        const scale = 1 - progress * 0.08; // shrinks to 0.92
        const yShift = progress * 12;       // pushes down slightly
        card.style.transform = `scale(${scale}) translateY(${yShift}px)`;
        card.style.opacity = `${1 - progress * 0.3}`;
        card.style.boxShadow = `0 ${4 + progress * 10}px ${20 + progress * 20}px rgba(0,0,0,${0.2 + progress * 0.3})`;
      } else {
        // Card is fully scrolled past — small and behind
        card.style.transform = 'scale(0.92) translateY(12px)';
        card.style.opacity = '0.7';
        card.style.boxShadow = '0 14px 40px rgba(0,0,0,0.5)';
      }
    });
  }, []);

  /* ── GSAP Animations (unchanged from original) ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Text animation
      gsap.from(textRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // 2. Stats
      gsap.from(statsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // 3. Visual entry
      gsap.from(visualRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // ✅ RESPONSIVE PARALLAX CONTROL
      ScrollTrigger.matchMedia({

        // 💻 Desktop only
        "(min-width: 1024px)": () => {
          gsap.to(visualRef.current, {
            y: -150,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        },

        // 📱 Mobile → disable parallax
        "(max-width: 1023px)": () => {
          gsap.set(visualRef.current, {
            y: 0,
          });
        }

      });

      // 5. Floating badge (keep on all devices)
      gsap.to(badgeRef.current, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden bg-[#0a0014]"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#0a0014] via-[#0a0014]/50 to-transparent z-10 -translate-y-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-transparent via-transparent to-[#0a0014] z-10 -mt-80 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none opacity-60" />

      {/* Decorative Elements */}
      <div className="absolute -top-48 -left-24 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] opacity-30" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] opacity-30" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <div ref={textRef} className="space-y-8">
            <div className="space-y-4">
              <span className="text-purple-400 font-bold tracking-[0.3em] uppercase text-sm block">
                The Legacy of Excellence
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-pulse">PROVENANCE 6.0</span>
              </h2>
            </div>

            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Provenance 6.0, <span className="text-white font-semibold">R.V.S. College of Engineering and Technology's</span> annual techno-cultural fest, stands as one of the most anticipated events in Jharkhand. With an impressive turnout of over <span className="text-purple-400 font-bold">5,000+ attendees</span>.
              </p>
              <p>
                This edition is a celebration of technology, creativity, and culture, offering a platform for innovation and artistic expression.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  ref={el => statsRef.current[idx] = el}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors group text-center"
                >
                  <div className="text-purple-400 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element / Card with Parallax Applied */}
          <div ref={visualRef} className="relative will-change-transform">
            <div className="relative z-10 glass-panel p-2 rounded-[2.5rem] rotate-3 hover:rotate-0 transition-transform duration-700 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
              <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-purple-500/20 to-blue-500/20 relative overflow-hidden">

                {/* ── Stacked Cards Scroll Container ── */}
                <div
                  ref={scrollBoxRef}
                  className="about-stacked-scroll"
                  onScroll={handleScroll}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    borderRadius: '2rem',
                  }}
                >
                  {/* Each card is sticky — it sticks at top while the next one scrolls up over it */}
                  {sliderImages.map((src, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'sticky',
                        top: 0,
                        width: '100%',
                        height: '100%',
                        flexShrink: 0,
                        zIndex: sliderImages.length + idx,
                        transformOrigin: 'center top',
                        willChange: 'transform, opacity',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                      }}
                      ref={(el) => (cardRefs.current[idx] = el)}
                    >
                      <img
                        src={src}
                        alt={`Provenance 6.0 – Slide ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Floating Badge */}
            <div
              ref={badgeRef}
              className="absolute -top-6 -right-6 z-20 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full text-sm font-bold shadow-xl text-white"
            >
              Our Guest - Pranav Sharma
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;