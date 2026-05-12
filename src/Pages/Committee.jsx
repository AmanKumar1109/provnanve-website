import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Crown, Shield, Users, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import placeholderImg from '../assets/committee_placeholder.png';
import aman from '../assets/committees/aman.png';
import priyanshu from '../assets/committees/priyansu.png';
import abhijeet from '../assets/committees/abhijeet.png';


gsap.registerPlugin(ScrollTrigger);

// ── Core Organizing Team (shown right below hero) ───────────────────────────
const coreTeam = [
  {
    name: 'Satish Verma',
    role: 'Overall Head',
    work: 'Leads the entire Provenance 6.0 event. Manages all clubs & coordinates between teams.',
    image: placeholderImg,
    color: 'from-purple-400 to-pink-500',
    glow: 'rgba(168,85,247,0.3)',
  },
  {
    name: 'Priyanshu Ghosh',
    role: 'Overall Co-Head',
    work: 'Assists in overall event management. Handles technical infrastructure & web platform.',
    image: placeholderImg,
    color: 'from-blue-400 to-cyan-400',
    glow: 'rgba(56,189,248,0.3)',
  },
];

// ── Club-wise Committee Data ────────────────────────────────────────────────
const committees = [
  {
    club: 'HELIX',
    tagline: 'Tech & AI Club',
    color: 'from-blue-400 to-cyan-300',
    glow: 'rgba(56,189,248,0.3)',
    members: [
      { name: 'Satish Verma', role: 'Head', work: 'Website Development, Tech Event Management', image: placeholderImg },
      { name: 'Priyanshu Ghosh', role: 'Co-Head', work: 'App Development, Backend Architecture', image: priyanshu },
      { name: 'Aman Kumar', role: 'Tech Coordinator', work: 'Hackathon Coordination, AI/ML Workshops', image: aman },
      { name: 'Abhijeet Ghosh', role: 'Tech Coordinator', work: 'Database Management, API Integration', image: abhijeet },
    ],
  },
  {
    club: 'XPECTRA',
    tagline: 'Media & PR Club',
    color: 'from-purple-400 to-pink-400',
    glow: 'rgba(216,184,255,0.3)',
    members: [
      { name: 'Saksham Kumar', role: 'Head', work: 'Photography, Event Coverage & PR', image: placeholderImg },
      { name: 'T. Sasi Kiran', role: 'Co-Head', work: 'Videography, Social Media Management', image: placeholderImg },
      { name: 'Sumit Ghosh', role: 'Lead Designer', work: 'Creative Design, Branding & Posters', image: placeholderImg },
    ],
  },
  {
    club: 'CIRCUITRON',
    tagline: 'IoT & Robotics Club',
    color: 'from-green-400 to-emerald-400',
    glow: 'rgba(52,211,153,0.3)',
    members: [
      { name: 'Member Name', role: 'Head', work: 'Robotics Competitions, Hardware Labs', image: placeholderImg },
      { name: 'Member Name', role: 'Co-Head', work: 'IoT Workshops, Smart Automation Projects', image: placeholderImg },
    ],
  },
  {
    club: 'TARANGINI',
    tagline: 'Cultural Club',
    color: 'from-orange-400 to-yellow-400',
    glow: 'rgba(250,204,21,0.3)',
    members: [
      { name: 'Member Name', role: 'Head', work: 'Music & Dance Performances, Cultural Fest', image: placeholderImg },
      { name: 'Member Name', role: 'Co-Head', work: 'Drama & Theatre Events, Fine Arts', image: placeholderImg },
    ],
  },
  {
    club: 'RVS PANTHERS',
    tagline: 'Sports Club',
    color: 'from-red-400 to-orange-400',
    glow: 'rgba(248,113,113,0.3)',
    members: [
      { name: 'Member Name', role: 'Head', work: 'Sports Event Management, Tournaments', image: placeholderImg },
      { name: 'Member Name', role: 'Co-Head', work: 'Fitness Sessions, Sportsmanship Promotion', image: placeholderImg },
    ],
  },
];

// ── Role Icon helper ────────────────────────────────────────────────────────
const getRoleIcon = (role) => {
  if (role === 'Head' || role === 'Overall Head') return Crown;
  if (role === 'Co-Head' || role === 'Overall Co-Head') return Shield;
  return Users;
};

// ── Core Leader Card (big, prominent) ───────────────────────────────────────
const CoreLeaderCard = ({ person }) => {
  const ref = useRef(null);
  const Icon = getRoleIcon(person.role);

  const handleEnter = () => {
    gsap.to(ref.current, {
      y: -10,
      scale: 1.02,
      boxShadow: `0 0 40px ${person.glow}, 0 20px 60px rgba(0,0,0,0.5)`,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleLeave = () => {
    gsap.to(ref.current, {
      y: 0,
      scale: 1,
      boxShadow: `0 0 0px transparent`,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="core-card relative bg-[#0d051a]/90 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center group hover:border-white/20 transition-colors duration-300 max-w-sm w-full"
    >
      {/* Gradient accent top */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${person.color} rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity`} />

      {/* Photo with glow ring */}
      <div className="relative mb-6 mt-2">
        <div className={`absolute -inset-2 rounded-full bg-gradient-to-br ${person.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
        <div className={`absolute -inset-0.5 rounded-full bg-gradient-to-br ${person.color} opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
        <img
          src={person.image}
          alt={person.name}
          className="relative w-32 h-32 rounded-full object-cover border-2 border-white/10"
        />
      </div>

      {/* Name */}
      <h3 className="text-xl font-bold text-white mb-2">{person.name}</h3>

      {/* Role Badge */}
      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r ${person.color} text-white mb-4`}>
        <Icon size={14} />
        {person.role}
      </span>

      {/* Work description */}
      <p className="text-sm text-gray-400 leading-relaxed">{person.work}</p>
    </div>
  );
};

// ── Club Member Card (per-club) ─────────────────────────────────────────────
const MemberCard = ({ member, clubColor, clubGlow }) => {
  const ref = useRef(null);
  const Icon = getRoleIcon(member.role);

  const handleEnter = () => {
    gsap.to(ref.current, {
      y: -6,
      boxShadow: `0 0 25px ${clubGlow}, 0 10px 30px rgba(0,0,0,0.4)`,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleLeave = () => {
    gsap.to(ref.current, {
      y: 0,
      boxShadow: '0 0 0px transparent',
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="member-card relative bg-[#0d051a]/80 backdrop-blur-sm border border-white/[0.08] rounded-xl p-5 flex flex-col items-center text-center group hover:border-white/20 transition-colors duration-300"
    >
      {/* Photo */}
      <div className="relative mb-4">
        <div className={`absolute -inset-1 rounded-full bg-gradient-to-br ${clubColor} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500`} />
        <img
          src={member.image}
          alt={member.name}
          className="relative w-20 h-20 rounded-full object-cover border-2 border-white/10 group-hover:border-white/25 transition-all duration-300"
        />
      </div>

      {/* Name */}
      <h4 className="text-white font-semibold text-base mb-1">{member.name}</h4>

      {/* Role Badge */}
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/10 bg-white/[0.03] mb-3`}>
        <Icon size={11} className="text-white/50" />
        <span className={`bg-gradient-to-r ${clubColor} bg-clip-text text-transparent`}>{member.role}</span>
      </span>

      {/* Work */}
      <p className="text-xs text-gray-500 leading-relaxed">{member.work}</p>
    </div>
  );
};

// ── Club Section ────────────────────────────────────────────────────────────
const ClubSection = ({ committee }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });

      const cards = sectionRef.current.querySelectorAll('.member-card');
      gsap.fromTo(cards, { opacity: 0, y: 25, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ opacity: 0 }} className="relative">
      {/* Club Header */}
      <div className="mb-6">
        <div className={`h-[2px] w-14 bg-gradient-to-r ${committee.color} rounded-full mb-3`} />
        <div className="flex flex-wrap items-end gap-3 mb-1">
          <h3 className={`text-2xl md:text-3xl font-black tracking-wider bg-gradient-to-r ${committee.color} bg-clip-text text-transparent`}>
            {committee.club}
          </h3>
          <span className="text-sm text-gray-500 font-medium pb-0.5">{committee.tagline}</span>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {committee.members.map((member, i) => (
          <MemberCard key={i} member={member} clubColor={committee.color} clubGlow={committee.glow} />
        ))}
      </div>

      {/* Separator */}
      <div className="mt-10 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </div>
  );
};

// ── Main Page ───────────────────────────────────────────────────────────────
const Committee = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        titleRef.current?.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      // Core team entrance
      const coreCards = coreRef.current?.querySelectorAll('.core-card');
      if (coreCards) {
        gsap.fromTo(coreCards,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.7, ease: 'back.out(1.2)', delay: 0.6 }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#0a0014] min-h-screen text-white selection:bg-purple-500/30 relative">
      <Navbar />

      {/* ── Hero Section ── */}
      <section ref={heroRef} className="relative pt-32 pb-10 px-6 overflow-hidden">
        {/* BG Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12)_0%,transparent_70%)]" />
          <div className="absolute top-20 left-[15%] w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-32 right-[10%] w-56 h-56 bg-pink-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div ref={titleRef} className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Back link */}
          <div style={{ opacity: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>

          {/* Badge */}
          <div style={{ opacity: 0 }}>
            <span className="inline-block text-[11px] font-bold tracking-[0.3em] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-5 py-2 rounded-full mb-6 uppercase">
              Provenance 6.0
            </span>
          </div>

          {/* Title */}
          <h1 style={{ opacity: 0 }} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-5">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-text">
              ORGANIZING
            </span>
            <br />
            <span className="text-white">COMMITTEES</span>
          </h1>

          {/* Subtitle */}
          <p style={{ opacity: 0 }} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The creative and technical minds behind PROVENANCE 6.0 — meet the teams powering every event, every moment.
          </p>

          {/* Stats */}
          <div style={{ opacity: 0 }} className="flex justify-center gap-8 mt-10">
            {[
              { label: 'Clubs', value: '5' },
              { label: 'Members', value: '50+' },
              { label: 'Events', value: '20+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-[11px] text-gray-500 font-medium tracking-wider uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Organizing Team (right below hero) ── */}
      <section className="relative px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-yellow-400/80 bg-yellow-500/10 border border-yellow-500/15 px-4 py-1.5 rounded-full mb-4 uppercase">
              <Star size={12} />
              Leading The Event
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Core Organizers</h2>
          </div>

          {/* Core Leader Cards */}
          <div ref={coreRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {coreTeam.map((person, i) => (
              <CoreLeaderCard key={i} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Club-wise Committees ── */}
      <section className="relative px-6 pb-20 pt-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-purple-400/80 bg-purple-500/10 border border-purple-500/15 px-4 py-1.5 rounded-full mb-4 uppercase">
              <Users size={12} />
              Club Committees
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Meet The Teams</h2>
            <p className="text-gray-500 text-sm mt-2">Each club brings their unique expertise to make Provenance 6.0 unforgettable</p>
          </div>

          {/* Club Sections */}
          <div className="space-y-14">
            {committees.map((committee) => (
              <ClubSection key={committee.club} committee={committee} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative px-6 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/[0.08] rounded-2xl p-10 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Want to be part of the team?</h3>
            <p className="text-gray-400 mb-6">Join our clubs and help shape the next edition of Provenance.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              Explore Events
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Committee;
