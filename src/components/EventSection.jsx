import React, { useState, useRef } from 'react';
import { X, Clock, MapPin, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';

/* ═══════════════════════════════════
    EVENT DATA
   ═══════════════════════════════════ */
const categories = [
  {
    id: 'helix',
    name: 'HELIX',
    label: 'AI Lab',
    color: '#38bdf8',
    events: [
      { title: 'Neural Nexus', desc: 'Build an AI model that solves real-world problems in 24 hours.', icon: '🧠', prize: '₹50,000', time: 'Day 1 — 10:00 AM', venue: 'AI Lab, Block A', rules: ['Team of 3-4', '24-hour limit', 'Working demo required'] },
      { title: 'Prompt Wars', desc: 'Master the art of prompt engineering in competitive rounds.', icon: '⚡', prize: '₹20,000', time: 'Day 1 — 2:00 PM', venue: 'Smart Room, Block B', rules: ['Individual', '3 elimination rounds', 'Time-limited'] },
      { title: 'DataForge', desc: 'Competitive data science — analyze, predict, conquer.', icon: '📊', prize: '₹30,000', time: 'Day 2 — 10:00 AM', venue: 'Data Center, Block A', rules: ['Team of 2', 'Python/R only', 'Datasets on-spot'] },
      { title: 'RoboMind', desc: 'Program autonomous bots to navigate challenges.', icon: '🤖', prize: '₹40,000', time: 'Day 2 — 2:00 PM', venue: 'Robotics Lab, Block C', rules: ['Team of 2-3', 'Arduino/RPi platforms', 'Safety gear mandatory'] },
    ],
  },
  {
    id: 'tarangani',
    name: 'TARANGANI',
    label: 'Cultural',
    color: '#fb923c',
    events: [
      { title: 'Rhythmic Storm', desc: 'Group dance competition — bring your crew and own the stage.', icon: '💃', prize: '₹60,000', time: 'Day 1 — 6:00 PM', venue: 'Main Auditorium', rules: ['Team of 6-12', '8 min limit', 'Props allowed'] },
      { title: 'Vocal Vortex', desc: 'Solo singing — let your voice echo through dimensions.', icon: '🎤', prize: '₹25,000', time: 'Day 1 — 4:00 PM', venue: 'Open Air Theater', rules: ['Solo event', 'Any genre', '5 min limit'] },
      { title: 'Canvas Cosmos', desc: 'Live art competition — paint your universe on canvas.', icon: '🎨', prize: '₹15,000', time: 'Day 2 — 11:00 AM', venue: 'Art Gallery, Block D', rules: ['Individual', 'All mediums', '3-hour limit'] },
      { title: 'NatyaVerse', desc: 'Theatrical drama — perform a story that transcends time.', icon: '🎭', prize: '₹45,000', time: 'Day 2 — 5:00 PM', venue: 'Main Auditorium', rules: ['Team of 8-15', '20 min limit', 'Original scripts preferred'] },
    ],
  },
  {
    id: 'xpectra',
    name: 'XPECTRA',
    label: 'Media',
    color: '#c084fc',
    events: [
      { title: 'CineForge', desc: 'Short film making — 48 hours to create a cinematic masterpiece.', icon: '🎬', prize: '₹50,000', time: 'Day 1 — 8:00 AM', venue: 'Media Lab, Block B', rules: ['Team of 3-6', '48-hour window', 'Max 10 min runtime'] },
      { title: 'PixelHunt', desc: 'Photography competition — capture moments that tell stories.', icon: '📸', prize: '₹15,000', time: 'Day 1 — 9:00 AM', venue: 'Campus-wide', rules: ['Individual', 'Any camera', 'Submit top 5 photos'] },
      { title: 'ReelRush', desc: 'Instagram reels competition — go viral in 60 seconds.', icon: '📱', prize: '₹10,000', time: 'Day 2 — 12:00 PM', venue: 'Anywhere on Campus', rules: ['Solo or duo', 'Max 60 seconds', 'Use event hashtag'] },
      { title: 'VoiceOver Arena', desc: 'Dubbing & voice acting — bring characters to life.', icon: '🎙️', prize: '₹12,000', time: 'Day 2 — 3:00 PM', venue: 'Recording Studio, Block B', rules: ['Individual', '3 rounds', 'Improv round included'] },
    ],
  },
  {
    id: 'panthers',
    name: 'PANTHERS',
    label: 'Battle',
    color: '#f87171',
    events: [
      { title: 'CodeStrike', desc: 'Competitive programming — solve, optimize, dominate.', icon: '⚔️', prize: '₹35,000', time: 'Day 1 — 10:00 AM', venue: 'Computer Lab, Block A', rules: ['Individual', 'C/C++/Java/Python', '3-hour contest'] },
      { title: 'Esports Clash', desc: 'Valorant & BGMI tournaments — show gaming supremacy.', icon: '🎮', prize: '₹75,000', time: 'Day 1 — 11:00 AM', venue: 'Gaming Arena, Block E', rules: ['Team of 4-5', 'Bring own peripherals', 'Anti-cheat mandatory'] },
      { title: 'Debug Deathmatch', desc: 'Find and fix bugs faster than your opponents.', icon: '🐛', prize: '₹20,000', time: 'Day 2 — 10:00 AM', venue: 'Computer Lab, Block A', rules: ['Individual', 'Multiple languages', 'Timed rounds'] },
      { title: 'Quiz Kombat', desc: 'Tech & general knowledge quiz — brain vs brain.', icon: '🧩', prize: '₹25,000', time: 'Day 2 — 2:00 PM', venue: 'Seminar Hall, Block D', rules: ['Team of 3', 'Prelims + Finals', 'Buzzer rounds'] },
    ],
  },
  {
    id: 'circuitorn',
    name: 'CIRCUITORN',
    label: 'Tech',
    color: '#4ade80',
    events: [
      { title: 'HackForge', desc: '36-hour hardware hackathon — build something the world hasn\'t seen.', icon: '🔧', prize: '₹80,000', time: 'Day 1 — 8:00 AM', venue: 'Innovation Hub, Block C', rules: ['Team of 3-5', '36-hour build', 'Working demo required'] },
      { title: 'Circuit Sage', desc: 'Electronic circuit design — precision meets creativity.', icon: '⚡', prize: '₹25,000', time: 'Day 1 — 1:00 PM', venue: 'Electronics Lab, Block C', rules: ['Team of 2', 'Simulation + build', 'Docs required'] },
      { title: 'Web Blitz', desc: 'Speed web development — build a full website in 4 hours.', icon: '🌐', prize: '₹30,000', time: 'Day 2 — 9:00 AM', venue: 'Computer Lab, Block A', rules: ['Team of 2-3', '4-hour limit', 'Must deploy live'] },
      { title: 'DroneForce', desc: 'Drone racing & aerial challenges — take flight and conquer.', icon: '🚁', prize: '₹35,000', time: 'Day 2 — 1:00 PM', venue: 'Open Ground', rules: ['Solo or duo', 'BYO or provided drone', 'Safety cert required'] },
    ],
  },
];

/* ═══════════════════════════════════
    EVENT MODAL
   ═══════════════════════════════════ */
const EventModal = ({ event, category, onClose }) => {
  if (!event || !category) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full" style={{ background: category.color }} />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10"
        >
          <X className="w-4 h-4 text-white/50" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <span className="text-4xl">{event.icon}</span>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-0.5" style={{ color: category.color }}>
              {category.name}
            </p>
            <h3 className="text-xl font-bold text-white">{event.title}</h3>
          </div>
        </div>

        {/* Info badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            { icon: <Trophy className="w-3.5 h-3.5" />, text: event.prize },
            { icon: <Clock className="w-3.5 h-3.5" />, text: event.time },
            { icon: <MapPin className="w-3.5 h-3.5" />, text: event.venue },
          ].map((badge, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/70 border border-white/5">
              <span style={{ color: category.color }}>{badge.icon}</span>
              {badge.text}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed mb-6">{event.desc}</p>

        {/* Rules */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: category.color }}>
            Rules
          </h4>
          <div className="space-y-2">
            {event.rules.map((rule, i) => (
              <div
                key={i}
                className="text-sm text-white/60 pl-4 py-1.5 border-l-2 rounded-r-lg bg-white/[0.02]"
                style={{ borderColor: `${category.color}40` }}
              >
                {rule}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          className="w-full py-3 rounded-xl text-sm font-semibold text-white hover:brightness-110"
          style={{ background: category.color }}
        >
          Register for {event.title}
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════
    EVENT CARD
   ═══════════════════════════════════ */
const EventCard = ({ event, category, onClick }) => {
  const [overlayPos, setOverlayPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setOverlayPos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -16; // Slightly reduced tilt for better readability
    const rotateY = ((x - centerX) / centerX) * 16;

    setTilt({ x: rotateX, y: rotateY });
  };

  return (
    <div className="shrink-0 w-260px sm:w-280px perspective:1000px">
      <div
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setTilt({ x: 0, y: 0 });
        }}
        className="group relative bg-[#0d0d0d] rounded-2xl p-5 cursor-pointer active:bg-zinc-800 border border-white/[0.06]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovering ? 'none' : 'transform 0.5s ease, border-color 0.3s',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── BORDER GLOW LAYER ── */}
        {/* We use a pseudo-element style div that sits exactly on the border */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(120px circle at ${overlayPos.x}px ${overlayPos.y}px, ${category.color}, transparent 80%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px', // Matches the border thickness
          }}
        />

        {/* ── INNER SPOTLIGHT ── */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(200px circle at ${overlayPos.x}px ${overlayPos.y}px, ${category.color}15, transparent 40%)`,
          }}
        />

        {/* ── CONTENT ── */}
        <div className="relative z-10" style={{ transform: 'translateZ(25px)' }}>
          <h3 className="text-base font-bold text-white mb-1.5">{event.title}</h3>
          <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
            {event.desc}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[10px] text-white/30 tracking-wide">{event.time}</span>
            <span 
              className="text-[10px] font-medium tracking-wider uppercase" 
              style={{ color: `${category.color}cc` }}
            >
              Details →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════
    MAIN: EVENT SECTION
   ═══════════════════════════════════ */
const EventSection = () => {
  const [activeCategory, setActiveCategory] = useState('helix');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const scrollRef = useRef(null);

  const currentCategory = categories.find(c => c.id === activeCategory);
  const currentEvents = currentCategory?.events || [];

  const scrollCards = (direction) => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount });
    }
  };

  return (
    <section id="event" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#0a0014]">
      {/* Subtle top glow */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" /> */}

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <span className="text-purple-400 text-xs font-bold tracking-[0.3em] uppercase">Explore</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-2 mb-3">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">Events</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-md mx-auto">
            Choose a category and discover what awaits you at Provenance 6.0
          </p>
        </div>

        {/* ── Category Bar (Horizontal Scroll) ── */}
        <div className="mb-10">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory justify-start sm:justify-center">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    shrink-0 snap-start flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium border
                    ${isActive
                      ? 'text-white border-white/15 shadow-lg'
                      : 'text-white/40 border-transparent hover:text-white/70 hover:bg-white/3'
                    }
                  `}
                  style={isActive ? {
                    background: `${cat.color}10`,
                    borderColor: `${cat.color}25`,
                    boxShadow: `0 4px 20px ${cat.color}10`,
                  } : {}}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: isActive ? cat.color : 'rgba(255,255,255,0.15)' }}
                  />
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-white/25 hidden sm:inline">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Event Cards (Horizontal Scroll) ── */}
        <div className="relative">
          {/* Scroll arrows (desktop only) */}
          <button
            onClick={() => scrollCards('left')}
            className="hidden lg:flex absolute -left-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-zinc-900/90 border border-white/10 text-white/50 hover:text-white hover:border-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollCards('right')}
            className="hidden lg:flex absolute -right-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-zinc-900/90 border border-white/10 text-white/50 hover:text-white hover:border-white/20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          >
            {currentEvents.map((event) => (
              <div key={event.title} className="snap-start">
                <EventCard
                  event={event}
                  category={currentCategory}
                  onClick={() => setSelectedEvent(event)}
                />
              </div>
            ))}
          </div>

          {/* Fade edges */}
          {/* <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-[#0a0014] to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-[#0a0014] to-transparent pointer-events-none z-10" /> */}
        </div>

      </div>

      {/* ── Modal ── */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          category={currentCategory}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Hide scrollbar utility */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default EventSection;