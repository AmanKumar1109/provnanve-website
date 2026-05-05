import React, { useState, useRef } from 'react';
import { X, Clock, MapPin, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';

/* ═══════════════════════════════════
    EVENT DATA
   ═══════════════════════════════════ */
const categories = [
  {
    id: 'helix',
    name: 'HELIX',
    label: 'Tech & AI Club',
    color: '#38bdf8',
    events: [
      { title: 'Eminence in Prompt', desc: 'AI image generation challenge using advanced Prompt Engineering.', icon: '🎨', prize: 'Exciting Prizes', time: 'Day 2 — 12:00 PM - 1:00 PM', venue: 'AI Lab', rules: ['Individual event', 'Bring your own laptop', 'Time limit: 1 hour'] },
      { title: 'Shinobi Script', desc: 'DSA Coding Battle (C, C++, Java, Python). Prove your algorithmic might.', icon: '🥷', prize: 'Exciting Prizes', time: 'Day 1 — 2:00 PM - 3:30 PM', venue: 'Computer Lab', rules: ['Individual event', 'Platform: HackerRank', 'No internet access'] },
      { title: 'Mangaka\'s Edge', desc: 'Graphic Design competition (Dojo Design).', icon: '🖌️', prize: 'Exciting Prizes', time: 'Day 2 — 11:00 AM - 12:00 PM', venue: 'Design Studio', rules: ['Individual event', 'Software: Photoshop/Illustrator', 'Theme given on spot'] },
      { title: 'Hunter Rank: PRO', desc: 'ATS-based Resume Building competition.', icon: '📜', prize: 'Exciting Prizes', time: 'Day 1 — 10:00 AM - 11:00 AM', venue: 'Seminar Hall', rules: ['Individual event', 'Bring details/portfolio', 'Judged on ATS score'] },
      { title: 'Frag-Ops: PC Gaming', desc: 'PC Gaming Tournament. Tactical supremacy.', icon: '🔫', prize: 'Exciting Prizes', time: 'Day 2 — 11:00 AM - 12:00 PM', venue: 'Gaming Arena', rules: ['Team of 5', 'Bring your peripherals', 'Knockout format'] },
      { title: 'Trigger-Point: BGMI Arena', desc: 'Battle Royale Mobile Gaming. Survive till the end.', icon: '📱', prize: 'Exciting Prizes', time: 'Day 1 — 2:00 PM - 3:30 PM', venue: 'Main Auditorium', rules: ['Squad of 4', 'Eradicate hackers', 'Multiple room matches'] },
      { title: 'Colors of Konoha', desc: 'Anime Rangoli Competition. Bring the ninja world to life with colors.', icon: '🌸', prize: 'Exciting Prizes', time: 'Day 1 — 10:00 AM - 11:00 AM', venue: 'Campus Corridor', rules: ['Team of 2-3', 'Bring your own colors', 'Anime theme mandatory'] },
      { title: 'Sage Mode: Trivia', desc: 'Tech + Anime Quiz. Test your ultimate otaku and geek knowledge.', icon: '🧠', prize: 'Exciting Prizes', time: 'Day 1 — 11:00 AM - 11:30 AM', venue: 'Seminar Hall', rules: ['Team of 2', 'Buzzer rounds', 'Tech and Anime questions'] },
    ],
  },
  {
    id: 'tarangini',
    name: 'TARANGINI',
    label: 'Cultural Club',
    color: '#fb923c',
    events: [
      { title: 'Paper Dance', desc: 'Dance on a shrinking piece of paper with your partner without stepping off.', icon: '👣', prize: 'Exciting Prizes', time: 'Day 1 — 11:00 AM - 12:30 PM', venue: 'Open Air Theater', rules: ['Duo event', 'Paper folds every round', 'Last pair standing wins'] },
      { title: 'Street Reloaded', desc: 'Impromptu Dance battle. Show your spontaneous moves.', icon: '🕺', prize: 'Exciting Prizes', time: 'Day 1 — 4:00 PM - 5:00 PM', venue: 'Main Ground', rules: ['Individual/Crew', 'Random tracks', 'Freestyle'] },
      { title: 'Solo Song', desc: 'Sing your heart out and mesmerize the audience.', icon: '🎤', prize: 'Exciting Prizes', time: 'Day 1 — 5:00 PM - 6:00 PM', venue: 'Main Auditorium', rules: ['Solo', 'Karaoke allowed', '3 min time limit'] },
      { title: 'Cut the Crap', desc: 'Design and create a stunning dress using only newspapers.', icon: '👗', prize: 'Exciting Prizes', time: 'Day 2 — 11:30 AM - 1:00 PM', venue: 'Art Gallery', rules: ['Team of 3 (1 model)', 'Only newspaper & pins', 'Time limit: 1 hour'] },
      { title: 'Solo/Group Dance', desc: 'Prepared dance performances across various genres. (Round 1 & 2)', icon: '💃', prize: 'Exciting Prizes', time: 'Day 1 — 4:40 PM - 7:00 PM', venue: 'Main Auditorium', rules: ['Any dance style', 'Bring track in pendrive', 'Max 5 mins'] },
      { title: 'Face Painting', desc: 'Use the face as a canvas to express creativity.', icon: '🎨', prize: 'Exciting Prizes', time: 'Day 2 — 10:00 AM - 11:30 AM', venue: 'Corridor Area', rules: ['Team of 2 (1 model)', 'Bring own paints', 'Theme based'] },
      { title: 'Ramp Walk', desc: 'Sizzle the stage with your style, confidence, and walk. (Grand Finale)', icon: '✨', prize: 'Exciting Prizes', time: 'Day 1 — 7:00 PM Onwards', venue: 'Main Auditorium', rules: ['Individual or Couple', 'Appropriate attire', 'Judged on confidence & style'] },
    ],
  },
  {
    id: 'xpectra',
    name: 'XPECTRA',
    label: 'Media Club',
    color: '#c084fc',
    events: [
      { title: 'Photography', desc: 'Capture the best moments of the fest or based on a theme.', icon: '📸', prize: 'Exciting Prizes', time: 'Day 1: All Day | Day 2: Before 11:30 PM', venue: 'Campus Wide', rules: ['Individual', 'DSLR or Mobile', 'No heavy editing'] },
      { title: 'Reel Making', desc: 'Create viral short-form content covering the energy of the fest.', icon: '📱', prize: 'Exciting Prizes', time: 'Day 1: All Day | Day 2: Before 11:30 PM', venue: 'Campus Wide', rules: ['Individual/Team', 'Max 60 secs', 'Submit by Day 2 11:30 PM'] },
      { title: 'AI Film Making', desc: 'Produce a short film utilizing AI tools for generation/editing.', icon: '🎬', prize: 'Exciting Prizes', time: 'Day 2 — 11:00 AM', venue: 'Media Lab', rules: ['Team of up to 4', 'AI usage mandatory', 'Runtime 3-5 mins'] },
      { title: 'Khana Khazana', desc: 'Food Without Fire competition. Show your culinary skills safely.', icon: '🥗', prize: 'Exciting Prizes', time: 'Day 1 — 11:00 AM - 12:00 PM', venue: 'Food Court Area', rules: ['Team of 2-3', 'No flame/induction', 'Judged on taste & presentation'] },
    ],
  },
  {
    id: 'panthers',
    name: 'RVS PANTHERS',
    label: 'Sports Club',
    color: '#f87171',
    events: [
      { title: 'Girls Cricket / Gully Cricket', desc: 'The classic street-style cricket tournament.', icon: '🏏', prize: 'Exciting Prizes', time: 'Day 1 — 11:00 AM - 5:00 PM', venue: 'Sports Ground', rules: ['Team of 6', 'Tennis ball', 'Box cricket rules'] },
      { title: 'Basketball', desc: 'Fast-paced basketball matches.', icon: '🏀', prize: 'Exciting Prizes', time: 'Day 1 — 10:00 AM - 2:00 PM', venue: 'Basketball Court', rules: ['Team of 3+1', 'Half-court', '10-min matches'] },
      { title: 'Volleyball', desc: 'High-flying spikes and solid blocks in this team tournament.', icon: '🏐', prize: 'Exciting Prizes', time: 'Day 1 — 10:00 AM (End TBC)', venue: 'Volleyball Court', rules: ['Team of 6', 'Standard rules', 'Knockout matches'] },
      { title: 'Football', desc: 'Show your footwork and teamwork on the pitch.', icon: '⚽', prize: 'Exciting Prizes', time: 'Day 1 — 10:00 AM (End TBC)', venue: 'Main Field', rules: ['Team of 7', 'Rolling subs', '15 min halves'] },
      { title: 'Tug of War', desc: 'Ultimate test of raw strength and team coordination.', icon: '🪢', prize: 'Exciting Prizes', time: 'Day 1 — 2:00 PM - 3:30 PM', venue: 'Sports Ground', rules: ['Team of 8', 'Weight limit applies', 'Best of 3 pulls'] },
      { title: 'Arm Wrestling', desc: 'One-on-one test of arm strength and technique.', icon: '💪', prize: 'Exciting Prizes', time: 'Day 1 — 12:00 PM - 1:00 PM', venue: 'Indoor Sports Hall', rules: ['Individual', 'Weight categories', 'Standard rules'] },
      { title: 'Musical Chair', desc: 'The classic game of speed, alertness, and finding a seat.', icon: '🪑', prize: 'Exciting Prizes', time: 'Day 1 — 3:00 PM - 4:00 PM', venue: 'Indoor Area', rules: ['Individual', 'Music stops, grab a chair', 'Last one wins'] },
    ],
  },
  {
    id: 'circuitron',
    name: 'CIRCUITRON',
    label: 'Robotics & IoT Club',
    color: '#4ade80',
    events: [
      { title: 'IoT Design', desc: 'Design and prototype an innovative IoT solution.', icon: '🌐', prize: 'Exciting Prizes', time: 'Day 1 — 10:00 AM - 11:30 AM', venue: 'IoT Lab', rules: ['Team of 2-4', 'Hardware + Software', 'Working prototype needed'] },
      { title: 'Rubik’s Cube', desc: 'Speedcubing competition to see who solves it the fastest.', icon: '🧊', prize: 'Exciting Prizes', time: 'Day 2 — 10:30 AM - 11:30 AM', venue: 'Seminar Hall', rules: ['Individual', 'Bring your own cube', 'WCA rules apply'] },
      { title: 'Robo Race', desc: 'Race your custom-built robots through a challenging obstacle track.', icon: '🏎️', prize: 'Exciting Prizes', time: 'Day 1 — 10:00 AM - 11:30 AM', venue: 'Open Ground', rules: ['Team of 3-4', 'Wired/Wireless bots', 'Time penalty for track exits'] },
      { title: 'Robo Soccer', desc: 'Bots face off in a soccer match. Control and score!', icon: '⚽', prize: 'Exciting Prizes', time: 'Day 1 — 2:00 PM - 3:30 PM', venue: 'Robotics Arena', rules: ['Team of 2-4', 'Specific dimension limits', '2v2 bot matches'] },
      { title: 'Robo War', desc: 'Heavyweight bot combat. Destroy or be destroyed.', icon: '⚔️', prize: 'Exciting Prizes', time: 'Day 1 — 11:30 AM - 1:00 PM', venue: 'War Arena', rules: ['Team of 3-5', 'Weight class limits', 'Safety precautions mandatory'] },
      { title: 'Balloon Pop', desc: 'Equip your bot with needles and pop the opponent’s balloons.', icon: '🎈', prize: 'Exciting Prizes', time: 'Day 1 — 11:30 AM - 1:00 PM', venue: 'Robotics Arena', rules: ['Team of 2-3', 'Remote control', 'Last balloon standing wins'] },
      { title: 'Treasure Hunt', desc: 'Solve tech and logic clues scattered around campus to find the treasure.', icon: '🗺️', prize: 'Exciting Prizes', time: 'Day 2 — 2:00 PM - 4:00 PM', venue: 'Campus Wide', rules: ['Team of 4', 'Time-based', 'Decode clues to advance'] },
      { title: 'Bridge the Gap', desc: 'Construct a bridge using popsicle sticks that can hold the most weight.', icon: '🌉', prize: 'Exciting Prizes', time: 'Day 2 — 10:00 AM - 11:00 AM', venue: 'Civil Lab', rules: ['Team of 2-3', 'Materials provided', 'Judged on load-to-weight ratio'] },
    ],
  },
  {
    id: 'independent',
    name: 'INDEPENDENT EVENTS',
    label: 'Open Events',
    color: '#eab308',
    events: [
      { title: 'Debate Competition', desc: 'Test your oratory and analytical skills against the best minds.', icon: '🗣️', prize: 'Exciting Prizes', time: 'Day 2 — 1:00 PM - 3:00 PM', venue: 'Seminar Hall', rules: ['Individual/Team', 'Topics provided prior', 'Not managed by any club'] },
      { title: 'Flip & Win', desc: 'A fun game of chance and skill.', icon: '🎲', prize: 'Exciting Prizes', time: 'Day 2 — 3:30 PM - 4:30 PM', venue: 'Open Ground', rules: ['Individual', 'On-spot registration', 'Not managed by any club'] },
    ],
  },
];

/* ═══════════════════════════════════
    EVENT MODAL
   ═══════════════════════════════════ */
const EventModal = ({ event, category, onClose }) => {
  React.useEffect(() => {
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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
    <div className="shrink-0 w-[260px] sm:w-[280px] lg:w-[270px] xl:w-[275px] [perspective:1000px]">
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
            className="flex gap-4 overflow-x-auto pb-8 pt-2 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 sm:-mx-0 sm:px-0 overscroll-x-contain"
          >
            {currentEvents.map((event) => (
              <div key={event.title} className="snap-start py-2">
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