import React from 'react';
import { motion } from 'framer-motion';

// Inline SVGs for Social Icons
const InstagramIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FacebookIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const clubs = [
  {
    name: "HELIX",
    tagline: "Tech & AI",
    desc: "RVSCET’s premier club driving innovation with hands-on experience in emerging technologies and next-gen projects.",
    color: "from-blue-400 to-cyan-300",
    borderGlow: "group-hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]",
    socials: [
      { icon: InstagramIcon, href: "https://www.instagram.com/helix.rvscet/" },
      { icon: LinkedinIcon, href: "https://www.linkedin.com/company/helixrvscet/posts/?feedView=all" },
      { icon: FacebookIcon, href: "https://www.facebook.com/people/Helix-The-Tech-AI-Club/61575162227587/" }
    ]
  },
  {
    name: "XPECTRA",
    tagline: "Media & PR",
    desc: "Official media club capturing campus events and nurturing creative skills in photography, videography, and web design.",
    color: "from-purple-400 to-pink-400",
    borderGlow: "group-hover:shadow-[0_0_20px_rgba(216,184,255,0.4)]",
    socials: [
      { icon: InstagramIcon, href: "https://www.instagram.com/xpectra.rvscet/" },
      { icon: FacebookIcon, href: "https://www.facebook.com/xpectra.rvscet/" },
      { icon: LinkedinIcon, href: "https://www.linkedin.com/company/officialrvsxpectra/posts/?feedView=all" }
    ]
  },
  {
    name: "CIRCUITRON",
    tagline: "IoT & Robotics",
    desc: "Bridging theoretical electronics and practical innovation via hands-on workshops in smart automation and sensor integration.",
    color: "from-green-400 to-emerald-400",
    borderGlow: "group-hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]",
    socials: [
      { icon: InstagramIcon, href: "https://www.instagram.com/circuitron.rvscet/" }
    ]
  },
  {
    name: "TARANGINI",
    tagline: "Cultural",
    desc: "The vibrant creative heartbeat of the campus, showcasing talents in music, dance, drama, and fine arts.",
    color: "from-orange-400 to-yellow-400",
    borderGlow: "group-hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]",
    socials: [
      { icon: InstagramIcon, href: "https://www.instagram.com/provenance.rvscet/" }
    ]
  },
  {
    name: "RVS PANTHERS",
    tagline: "Sports",
    desc: "The powerhouse of athletic excellence, fostering teamwork, sportsmanship, and physical endurance.",
    color: "from-red-400 to-orange-400",
    borderGlow: "group-hover:shadow-[0_0_20px_rgba(248,113,113,0.4)]",
    socials: [
      { icon: InstagramIcon, href: "https://www.instagram.com/panthers.rvscet/" }
    ]
  }
];

const ClubSection = () => {
  return (
    <section className="relative bg-[#080012] py-16 px-4 sm:px-6 overflow-hidden border-t border-purple-500/10">
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-wider mb-2">
            ORGANIZING COMMITTEES
          </h2>
          <p className="text-sm text-gray-400">The creative and technical minds behind PROVENANCE 6.0</p>
        </div>

        {/* Scrollable Layout */}
        <div className="relative">
          {/* Fading Edges for Scroll indication */}
          <div className="absolute top-0 left-0 w-4 sm:w-8 h-full bg-gradient-to-r from-[#080012] to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-4 sm:w-8 h-full bg-gradient-to-l from-[#080012] to-transparent pointer-events-none z-10" />

          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-12 pt-4 px-4 sm:px-0 -mx-4 sm:mx-0 snap-x snap-mandatory scrollbar-hide items-stretch overscroll-x-contain">
            {clubs.map((club, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className={`snap-start shrink-0 w-[270px] sm:w-[320px] group relative bg-[#0d051a] border border-gray-800 rounded-xl p-6 sm:p-7 flex flex-col transition-all duration-300 hover:border-gray-500 hover:-translate-y-2 ${club.borderGlow}`}
              >
                {/* Colored Top Bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${club.color} rounded-t-xl opacity-70 group-hover:opacity-100 transition-opacity`}></div>

                <div className="flex-grow">
                  <h3 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${club.color} mb-1 pb-1 inline-block`}>
                    {club.name}
                  </h3>
                  <div className="mb-3">
                    <span className="inline-block text-[10px] font-semibold tracking-wider text-gray-300 bg-gray-800/80 px-2 py-0.5 rounded-full">
                      {club.tagline}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {club.desc}
                  </p>
                </div>

                {/* Social Links Footer */}
                <div className="mt-6 pt-4 border-t border-gray-800/50 flex items-center gap-3">
                  {club.socials.map((social, sIdx) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={sIdx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors duration-200"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar utility */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default ClubSection;
