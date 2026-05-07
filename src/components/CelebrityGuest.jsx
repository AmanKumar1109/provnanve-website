import React, { useLayoutEffect, useRef } from 'react';
import { Mic, Star, Sparkles } from 'lucide-react';

/* Inline SVG icons for social platforms (not available in lucide-react v1.14) */
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
);
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import celebImg from '../assets/image_copy.png';
import posterImg from '../assets/image1.png';

gsap.registerPlugin(ScrollTrigger);

/* ─── inline scrollbar hide ─── */
const STYLE_ID = 'celebrity-scrollbar-hide';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes celebrity-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
    @keyframes celebrity-pulse-ring { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(1.5);opacity:0} }
    @keyframes celebrity-spotlight { 0%{opacity:.15} 50%{opacity:.35} 100%{opacity:.15} }
    @keyframes celebrity-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes celebrity-shine { 0%{left:-100%} 100%{left:200%} }
    @keyframes celebrity-gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  `;
  document.head.appendChild(s);
}

const CelebrityGuest = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const posterRef = useRef(null);
  const badgesRef = useRef([]);
  const decorRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading entrance */
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 88%', once: true },
      });

      /* Image reveal */
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        rotate: -5,
        duration: 1,
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: imageRef.current, start: 'top 85%', once: true },
      });

      /* Content slide-in */
      gsap.from(contentRef.current, {
        opacity: 0,
        x: 60,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 85%', once: true },
      });

      /* Poster slide-in */
      gsap.from(posterRef.current, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: posterRef.current, start: 'top 90%', once: true },
      });

      /* Badges stagger */
      gsap.from(badgesRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: contentRef.current, start: 'top 80%', once: true },
      });

      /* Floating decorative elements */
      decorRef.current.forEach((el) => {
        if (!el) return;
        gsap.to(el, {
          y: gsap.utils.random(-20, 20),
          x: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      /* Parallax on image */
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': () => {
          gsap.to(imageRef.current, {
            y: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    { icon: <Mic className="w-4 h-4" />, text: 'Stand-Up Comedian' },
    { icon: <Star className="w-4 h-4" />, text: 'Content Creator' },
    { icon: <Sparkles className="w-4 h-4" />, text: 'Live Performer' },
  ];

  return (
    <section
      id="celebrity-guest"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden bg-[#0a0014]"
    >
      {/* ── Background FX ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Spotlight beams */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[800px]"
          style={{
            background: 'conic-gradient(from 180deg, transparent 40%, rgba(168,85,247,.12) 50%, transparent 60%)',
            animation: 'celebrity-spotlight 4s ease-in-out infinite',
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[160px]" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/8 rounded-full blur-[120px]" />
      </div>

      {/* ── Marquee Ticker ── */}
      <div className="absolute top-0 left-0 w-full overflow-hidden py-2 opacity-[0.07] select-none pointer-events-none">
        <div
          className="whitespace-nowrap flex gap-12 text-6xl md:text-8xl font-black uppercase text-white"
          style={{ animation: 'celebrity-marquee 25s linear infinite', width: 'max-content' }}
        >
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              PRANAV SHARMA <span className="text-purple-400">★</span> STAND-UP COMEDY{' '}
              <span className="text-pink-400">★</span> LIVE AT PROVENANCE 6.0{' '}
              <span className="text-blue-400">★</span>{' '}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header ── */}
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 text-pink-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            <Star className="w-4 h-4 fill-current" /> Star Performer <Star className="w-4 h-4 fill-current" />
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            Meet Our{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316)',
                backgroundSize: '200% auto',
                animation: 'celebrity-gradient-shift 3s ease infinite',
              }}
            >
              Celebrity Guest
            </span>
          </h2>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Image Card */}
          <div ref={imageRef} className="relative will-change-transform flex justify-center">
            {/* Pulse rings behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-purple-500/20"
              style={{ animation: 'celebrity-pulse-ring 3s ease-out infinite' }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-pink-500/20"
              style={{ animation: 'celebrity-pulse-ring 3s ease-out infinite 1s' }}
            />

            {/* Main image container */}
            <div className="relative group">
              <div
                className="w-[280px] h-[350px] md:w-[360px] md:h-[450px] rounded-[2rem] overflow-hidden relative"
                style={{
                  boxShadow: '0 0 60px rgba(168,85,247,0.25), 0 0 120px rgba(236,72,153,0.1)',
                }}
              >
                {/* Gradient border */}
                <div
                  className="absolute inset-0 rounded-[2rem] p-[3px]"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #ec4899, #3b82f6, #a855f7)',
                    backgroundSize: '300% 300%',
                    animation: 'celebrity-gradient-shift 4s ease infinite',
                  }}
                >
                  <div className="w-full h-full rounded-[calc(2rem-3px)] overflow-hidden bg-[#0a0014]">
                    <img
                      src={celebImg}
                      alt="Pranav Sharma — Stand-Up Comedian"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Shine overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        left: '-100%',
                        animation: 'celebrity-shine 4s ease-in-out infinite',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Floating name badge */}
              <div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-6 py-2.5 rounded-full shadow-[0_0_30px_rgba(168,85,247,.35)] whitespace-nowrap"
                style={{ animation: 'celebrity-float 3s ease-in-out infinite' }}
              >
                <span className="text-white font-bold text-sm md:text-base tracking-wide">🎤 Pranav Sharma</span>
              </div>

              {/* Floating sparkle decorations */}
              <div ref={el => decorRef.current[0] = el} className="absolute -top-4 -right-4 text-purple-400/60">
                <Sparkles className="w-8 h-8" />
              </div>
              <div ref={el => decorRef.current[1] = el} className="absolute -bottom-8 -left-6 text-pink-400/60">
                <Star className="w-6 h-6 fill-current" />
              </div>
            </div>
          </div>

          {/* Right — Info Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-3xl md:text-5xl font-black text-white leading-snug">
                Pranav<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                  Sharma
                </span>
              </h3>
              <p className="text-white/50 text-sm font-semibold uppercase tracking-[0.2em]">
                Stand-Up Comedian &middot; Content Creator &middot; Live Performer
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-4 text-white/65 text-base md:text-lg leading-relaxed">
              <p>
                Pranav Sharma is an Indian stand-up comedian known for his{' '}
                <span className="text-white font-medium">relatable humor</span> and{' '}
                <span className="text-white font-medium">everyday life observations</span>. His content blends simple storytelling with desi experiences, making it fun, engaging, and easy to connect with.
              </p>
              <p>
                Get ready for an unforgettable night of laughter as he takes the stage{' '}
                <span className="text-purple-400 font-semibold">LIVE at Provenance 6.0!</span>
              </p>
            </div>

            {/* Highlight Badges */}
            <div className="flex flex-wrap gap-3">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  ref={el => badgesRef.current[i] = el}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 cursor-default"
                >
                  <span className="text-purple-400">{h.icon}</span>
                  {h.text}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/pranavsharm_a/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 hover:border-pink-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,.2)]"
              >
                <InstagramIcon className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">Instagram</span>
              </a>
              <a
                href="https://www.youtube.com/@sharma.pranav"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,.2)]"
              >
                <YoutubeIcon className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Show Poster Section ── */}
        <div ref={posterRef} className="mt-20 md:mt-28 relative">
          <div className="relative max-w-4xl mx-auto">
            {/* Poster card */}
            <div
              className="relative rounded-[2rem] overflow-hidden group"
              style={{ boxShadow: '0 0 80px rgba(168,85,247,.15), 0 25px 50px rgba(0,0,0,.5)' }}
            >
              {/* Gradient border */}
              <div
                className="absolute inset-0 rounded-[2rem] p-[2px]"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316, #a855f7)',
                  backgroundSize: '400% 400%',
                  animation: 'celebrity-gradient-shift 5s ease infinite',
                }}
              >
                <div className="w-full h-full rounded-[calc(2rem-2px)] overflow-hidden bg-[#0a0014]">
                  <img
                    src={posterImg}
                    alt="PS I Love You — Pranav Sharma Stand-Up Comedy Show at Provenance 6.0"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  {/* Dark overlay text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0014] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                      <div>
                        <p className="text-purple-400 text-xs font-bold tracking-[0.3em] uppercase mb-2">
                          Live Performance
                        </p>
                        <h4 className="text-2xl md:text-3xl font-black text-white">
                          PS I Love You
                        </h4>
                        <p className="text-white/50 text-sm mt-1">A Standup Comedy Show by Pranav Sharma</p>
                      </div>
                      <a
                        href="#events"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm hover:shadow-[0_0_30px_rgba(168,85,247,.4)] transition-shadow duration-300 whitespace-nowrap self-start md:self-auto"
                      >
                        <Sparkles className="w-4 h-4" />
                        Book Your Spot
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CelebrityGuest;
