import React, { useLayoutEffect, useRef } from 'react';
import { Mic, Star, Sparkles, Music, Play, Radio } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import celebImg from '../assets/image_copy.png';
import posterImg from '../assets/image1.png';
import djImg from '../assets/vdj shan.jpg'; // Using the generated premium image

gsap.registerPlugin(ScrollTrigger);

/* Inline SVG icons for social platforms */
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

/* ─── Global Styles ─── */
const STYLE_ID = 'celebrity-global-styles';
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

const GUESTS = [
  {
    id: 'pranav-sharma',
    name: 'Pranav Sharma',
    lastName: 'Sharma',
    role: 'Deadpan Comedy Maestro &middot; Viral Sensation &middot; Relatable Humorist',
    image: celebImg,
    badge: '🎤 India\'s Sharpest Comic',
    bio: [
      'Known for his brilliant deadpan delivery and razor-sharp observational humor, Pranav Sharma has taken the Indian comedy scene by storm. From his hit live show "Taaza Phool" to his viral reels, he masterfully tackles middle-class quirks and Gen-Z absurdities.',
      'Get ready for an unforgettable night of unapologetically honest and relatable laughter as he takes the stage LIVE at Provenance 6.0!'
    ],
    highlights: [
      { icon: <Mic className="w-4 h-4" />, text: 'Stand-Up Comedian' },
      { icon: <Star className="w-4 h-4" />, text: 'Content Creator' },
      { icon: <Sparkles className="w-4 h-4" />, text: 'Live Performer' },
    ],
    socials: [
      { name: 'Instagram', icon: <InstagramIcon className="w-5 h-5 text-pink-400" />, url: 'https://www.instagram.com/pranavsharm_a/', color: 'pink' },
      { name: 'YouTube', icon: <YoutubeIcon className="w-5 h-5 text-red-400" />, url: 'https://www.youtube.com/@sharma.pranav', color: 'red' }
    ],
    hasPoster: true
  },
  {
    id: 'vdj-shaan',
    name: 'VDJ Shaan',
    lastName: 'Shaan',
    role: 'India\'s No. 1 VDJ &middot; Mirage Music Founder &middot; Visual Artist',
    image: djImg,
    badge: '🎧 India\'s Biggest VDJ',
    bio: [
      'Officially recognized by the Times Group as India\'s No. 1 VDJ, Shaan is a pioneer of audiovisual performances. He uniquely blends Bollywood nostalgia with high-energy global electronic genres like Afro-house and club rhythms.',
      'With over 300 spectacular live acts and his groundbreaking "Mirage" series, experience the pulse of the night as he electrifies the Provenance 6.0 main stage with an unforgettable multisensory journey!'
    ],
    highlights: [
      { icon: <Music className="w-4 h-4" />, text: 'Visual DJ' },
      { icon: <Play className="w-4 h-4" />, text: 'Music Producer' },
      { icon: <Radio className="w-4 h-4" />, text: 'Turntablist' },
    ],
    socials: [
      { name: 'Instagram', icon: <InstagramIcon className="w-5 h-5 text-pink-400" />, url: 'https://www.instagram.com/vdjshaan/', color: 'pink' },
      { name: 'SoundCloud', icon: <Music className="w-5 h-5 text-orange-400" />, url: 'https://soundcloud.com/vdj-shan', color: 'orange' }
    ],
    hasPoster: false
  }
];

const CelebrityGuest = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const guestRefs = useRef([]);
  const posterRef = useRef(null);

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

      /* Character reveal */
      const chars = headingRef.current.querySelectorAll('.celeb-char');
      gsap.from(chars, {
        scale: 0.5,
        y: 20,
        rotateX: -90,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: headingRef.current, start: 'top 92%', once: true }
      });

      /* Guest sections entrance */
      guestRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const image = ref.querySelector('.guest-image-container');
        const content = ref.querySelector('.guest-content-container');
        const badges = ref.querySelectorAll('.guest-badge');

        // Image animation
        gsap.from(image, {
          opacity: 0,
          scale: 0.8,
          x: index % 2 === 0 ? -100 : 100,
          duration: 1.2,
          ease: 'back.out(1.2)',
          scrollTrigger: { trigger: ref, start: 'top 80%', once: true }
        });

        // Content animation
        gsap.from(content, {
          opacity: 0,
          x: index % 2 === 0 ? 100 : -100,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref, start: 'top 80%', once: true }
        });

        // Badges stagger
        gsap.from(badges, {
          opacity: 0,
          scale: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: ref, start: 'top 75%', once: true }
        });

        // Floating effect for decor
        const decor = ref.querySelectorAll('.guest-decor');
        decor.forEach(el => {
          gsap.to(el, {
            y: gsap.utils.random(-20, 20),
            x: gsap.utils.random(-10, 10),
            duration: gsap.utils.random(2, 4),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        });

        // Parallax for image
        ScrollTrigger.matchMedia({
          '(min-width: 1024px)': () => {
            gsap.to(image, {
              y: -50,
              ease: 'none',
              scrollTrigger: {
                trigger: ref,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
              }
            });
          }
        });
      });

      /* Poster slide-in */
      if (posterRef.current) {
        gsap.from(posterRef.current, {
          opacity: 0,
          y: 80,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: posterRef.current, start: 'top 90%', once: true },
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="celebrity-guest"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden bg-[#0a0014]"
    >
      {/* ── Background FX ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1000px]"
          style={{
            background: 'conic-gradient(from 180deg, transparent 40%, rgba(168,85,247,.08) 50%, transparent 60%)',
            animation: 'celebrity-spotlight 6s ease-in-out infinite',
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[140px]" />
      </div>

      {/* ── Marquee Ticker ── */}
      <div className="absolute top-0 left-0 w-full overflow-hidden py-4 opacity-[0.05] select-none pointer-events-none border-b border-white/5">
        <div
          className="whitespace-nowrap flex gap-12 text-6xl md:text-9xl font-black uppercase text-white"
          style={{ animation: 'celebrity-marquee 40s linear infinite', width: 'max-content' }}
        >
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              STAR PERFORMERS <span className="text-purple-500">★</span>
              PRANAV SHARMA <span className="text-pink-500">★</span>
              VDJ SHAN <span className="text-blue-500">★</span>
              LIVE AT PROVENANCE 6.0 <span className="text-orange-500">★</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header ── */}
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 text-pink-400 font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-6">
            <Star className="w-4 h-4 fill-current animate-pulse" /> Star Performers <Star className="w-4 h-4 fill-current animate-pulse" />
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
            Meet Our{' '}
            <span className="inline-block relative">
              <span className="relative z-10">Celebrity</span>
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-purple-600/30 -rotate-1" />
            </span>{' '}
            <span className="celeb-guest-text inline-block" style={{ perspective: '1000px' }}>
              {"Guests".split("").map((char, i) => (
                <span
                  key={i}
                  className="celeb-char inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'celebrity-gradient-shift 4s ease infinite',
                    animationDelay: `${i * 0.15}s`,
                    backgroundSize: '200% auto',
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* ── Guests List ── */}
        <div className="space-y-16 md:space-y-24">
          {GUESTS.map((guest, idx) => (
            <div
              key={guest.id}
              ref={el => guestRefs.current[idx] = el}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${idx % 2 !== 0 ? 'lg:direction-rtl' : ''}`}
            >
              {/* Image Side */}
              <div className={`guest-image-container relative flex justify-center ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                {/* Visual decor behind image */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[120%] h-[120%] rounded-full opacity-20 border border-purple-500/30" style={{ animation: 'celebrity-pulse-ring 4s ease-out infinite' }} />
                  <div className="w-[110%] h-[110%] rounded-full opacity-10 border border-pink-500/20" style={{ animation: 'celebrity-pulse-ring 4s ease-out infinite 2s' }} />
                </div>

                <div className="relative group">
                  <div className="w-[300px] h-[380px] md:w-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden relative shadow-[0_0_60px_rgba(168,85,247,0.2)]">
                    {/* Animated Border */}
                    <div className="absolute inset-0 p-[4px]" style={{
                      background: 'linear-gradient(135deg, #a855f7, #ec4899, #3b82f6, #a855f7)',
                      backgroundSize: '300% 300%',
                      animation: 'celebrity-gradient-shift 5s ease infinite',
                    }}>
                      <div className="w-full h-full rounded-[calc(2.5rem-4px)] overflow-hidden bg-[#0a0014]">
                        <img
                          src={guest.image}
                          alt={guest.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        {/* Shine effect */}
                        <div className="absolute inset-0 pointer-events-none opacity-30" style={{
                          background: 'linear-gradient(120deg, transparent 30%, #fff 50%, transparent 70%)',
                          width: '200%',
                          left: '-100%',
                          animation: 'celebrity-shine 6s ease-in-out infinite'
                        }} />
                      </div>
                    </div>
                  </div>

                  {/* Name Badge */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-8 py-3 rounded-full shadow-[0_10px_30px_rgba(168,85,247,0.4)]" style={{ animation: 'celebrity-float 4s ease-in-out infinite' }}>
                      <span className="text-white font-black text-sm md:text-lg tracking-wider uppercase">{guest.badge}</span>
                    </div>
                  </div>

                  {/* Small decor elements */}
                  <div className="guest-decor absolute -top-6 -right-6 text-purple-400">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <div className="guest-decor absolute -bottom-10 -left-6 text-pink-400">
                    <Star className="w-8 h-8 fill-current" />
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className={`guest-content-container space-y-6 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-6xl font-black text-white leading-none">
                    {guest.name.split(' ').slice(0, -1).join(' ')}<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                      {guest.lastName}
                    </span>
                  </h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
                  <p className="text-white/40 text-sm md:text-base font-bold uppercase tracking-[0.3em]" dangerouslySetInnerHTML={{ __html: guest.role }} />
                </div>

                <div className="space-y-4 text-white/70 text-lg md:text-xl leading-relaxed font-light">
                  {guest.bio.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {guest.highlights.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      className="guest-badge flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/90 text-xs font-semibold backdrop-blur-sm hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                    >
                      <span className="text-purple-400">{h.icon}</span>
                      {h.text}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  {guest.socials.map((social, sIdx) => (
                    <a
                      key={sIdx}
                      href={social.url}
                      className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                    >
                      {social.icon}
                      <span className="text-white/60 group-hover:text-white font-bold text-sm transition-colors">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Show Poster Section (Shared or Specific) ── */}

      </div>
    </section>
  );
};

export default CelebrityGuest;
