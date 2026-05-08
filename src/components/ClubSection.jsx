import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Icons ─────────────────────────────────────────────────────────────────────
const InstagramIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const clubs = [
  {
    name: 'HELIX', tagline: 'Tech & AI',
    desc: "RVSCET's premier club driving innovation with hands-on experience in emerging technologies and next-gen projects.",
    color: 'from-blue-400 to-cyan-300', glowColor: 'rgba(56,189,248,0.4)',
    socials: [
      { icon: InstagramIcon, href: 'https://www.instagram.com/helix.rvscet/' },
      { icon: LinkedinIcon, href: 'https://www.linkedin.com/company/helixrvscet/posts/?feedView=all' },
      { icon: FacebookIcon, href: 'https://www.facebook.com/people/Helix-The-Tech-AI-Club/61575162227587/' },
    ],
  },
  {
    name: 'XPECTRA', tagline: 'Media & PR',
    desc: 'Official media club capturing campus events and nurturing creative skills in photography, videography, and web design.',
    color: 'from-purple-400 to-pink-400', glowColor: 'rgba(216,184,255,0.4)',
    socials: [
      { icon: InstagramIcon, href: 'https://www.instagram.com/xpectra.rvscet/' },
      { icon: FacebookIcon, href: 'https://www.facebook.com/xpectra.rvscet/' },
      { icon: LinkedinIcon, href: 'https://www.linkedin.com/company/officialrvsxpectra/posts/?feedView=all' },
    ],
  },
  {
    name: 'CIRCUITRON', tagline: 'IoT & Robotics',
    desc: 'Bridging theoretical electronics and practical innovation via hands-on workshops in smart automation and sensor integration.',
    color: 'from-green-400 to-emerald-400', glowColor: 'rgba(52,211,153,0.4)',
    socials: [
      { icon: InstagramIcon, href: 'https://www.instagram.com/circuitron.rvscet/' },
    ],
  },
  {
    name: 'TARANGINI', tagline: 'Cultural',
    desc: 'The vibrant creative heartbeat of the campus, showcasing talents in music, dance, drama, and fine arts.',
    color: 'from-orange-400 to-yellow-400', glowColor: 'rgba(250,204,21,0.4)',
    socials: [
      { icon: InstagramIcon, href: 'https://www.instagram.com/provenance.rvscet/' },
    ],
  },
  {
    name: 'RVS PANTHERS', tagline: 'Sports',
    desc: 'The powerhouse of athletic excellence, fostering teamwork, sportsmanship, and physical endurance.',
    color: 'from-red-400 to-orange-400', glowColor: 'rgba(248,113,113,0.4)',
    socials: [
      { icon: InstagramIcon, href: 'https://www.instagram.com/panthers.rvscet/' },
    ],
  },
];

// ── ClubCard ──────────────────────────────────────────────────────────────────
const ClubCard = ({ club }) => {
  const cardRef = useRef(null);

  // Hover: lift + glow  (mirrors hover:-translate-y-2 + borderGlow)
  const onEnter = () => {
    gsap.to(cardRef.current, {
      y: -8,
      boxShadow: `0 0 20px ${club.glowColor}`,
      borderColor: 'rgba(107,114,128,1)', // gray-500
      duration: 0.3,
      ease: 'power2.out',
    });
    // Top bar opacity → 1
    gsap.to(cardRef.current.querySelector('.top-bar'), {
      opacity: 1, duration: 0.3,
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: '0 0 0px transparent',
      borderColor: 'rgba(31,41,55,1)', // gray-800
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(cardRef.current.querySelector('.top-bar'), {
      opacity: 0.7, duration: 0.3,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ borderColor: 'rgba(31,41,55,1)' }}
      className="shrink-0 w-[270px] sm:w-[320px] relative bg-[#0d051a] border rounded-xl p-6 sm:p-7 flex flex-col"
    >
      {/* Colored Top Bar */}
      <div
        className={`top-bar absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${club.color} rounded-t-xl`}
        style={{ opacity: 0.7 }}
      />

      <div className="flex-grow">
        <h3 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${club.color} mb-1 pb-1 inline-block`}>
          {club.name}
        </h3>
        <div className="mb-3">
          <span className="inline-block text-[10px] font-semibold tracking-wider text-gray-300 bg-gray-800/80 px-2 py-0.5 rounded-full">
            {club.tagline}
          </span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{club.desc}</p>
      </div>

      {/* Social Links */}
      {/* Social Links */}
      <div className="mt-6 pt-4 border-t border-gray-800/50 flex items-center gap-3">
        {club.socials.map((social, i) => {
          const Icon = social.icon;
          return (

            <a key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors duration-200"
              onMouseEnter={e => gsap.to(e.currentTarget, { color: '#ffffff', duration: 0.2 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { color: '#6b7280', duration: 0.2 })}
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

// ── ClubSection ───────────────────────────────────────────────────────────────
const ClubSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const scrollRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // ── Section entrance via ScrollTrigger ──────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fades up
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Cards stagger in from below
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Scroll progress bar ──────────────────────────────────────────────────
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setScrollProgress((scrollLeft / (scrollWidth - clientWidth)) * 100);
  };

  // ── Drag-to-scroll ───────────────────────────────────────────────────────
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080012] py-16 px-4 sm:px-6 overflow-hidden border-t border-purple-500/10"
    >
      <div className="container mx-auto relative z-10 max-w-6xl">

        {/* Heading */}
        <div ref={headingRef} style={{ opacity: 0 }} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-wider mb-2">
            ORGANIZING COMMITTEES
          </h2>
          <p className="text-sm text-gray-400">The creative and technical minds behind PROVENANCE 6.0</p>
        </div>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute top-0 left-0 w-8 sm:w-16 h-full bg-gradient-to-r from-[#080012] to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-8 sm:w-16 h-full bg-gradient-to-l from-[#080012] to-transparent pointer-events-none z-10" />

          {/* Scrollable cards row */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={() => setIsDragging(false)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            className={`flex gap-4 sm:gap-6 overflow-x-auto pb-8 pt-4 px-4 sm:px-0 -mx-4 sm:mx-0 snap-x snap-mandatory scrollbar-hide items-stretch overscroll-x-contain ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab'}`}
          >
            {/* Inner ref wrapper for GSAP stagger targeting */}
            <div ref={cardsRef} className="flex gap-4 sm:gap-6">
              {clubs.map((club, idx) => (
                <ClubCard key={idx} club={club} />
              ))}
            </div>
          </div>

          {/* Scroll progress bar */}
          <div className="mt-8 max-w-md mx-auto h-1.5 bg-gray-900 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              style={{
                width: `${Math.max(5, scrollProgress)}%`,
                transition: 'width 0.15s ease-out',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default ClubSection;