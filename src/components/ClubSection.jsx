import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Inline SVGs for Social Icons
const InstagramIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FacebookIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const clubs = [
  {
    name: "HELIX",
    tagline: "Tech & AI",
    desc: "RVSCET’s premier club driving innovation with hands-on experience in emerging technologies and next-gen projects.",
    color: "from-blue-400 to-cyan-300",
    mask: "blue-400",
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
    mask: "purple-400",
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
    mask: "green-400",
    socials: [
      { icon: InstagramIcon, href: "https://www.instagram.com/circuitron.rvscet/" }
    ]
  },
  {
    name: "TARANGINI",
    tagline: "Cultural",
    desc: "The vibrant creative heartbeat of the campus, showcasing talents in music, dance, drama, and fine arts.",
    color: "from-orange-400 to-yellow-400",
    mask: "orange-400",
    socials: [
      { icon: InstagramIcon, href: "https://www.instagram.com/provenance.rvscet/" }
    ]
  },
  {
    name: "RVS PANTHERS",
    tagline: "Sports",
    desc: "The powerhouse of athletic excellence, fostering teamwork, sportsmanship, and physical endurance.",
    color: "from-red-400 to-orange-400",
    mask: "red-400",
    socials: [
      { icon: InstagramIcon, href: "https://www.instagram.com/panthers.rvscet/" }
    ]
  }
];

// icons unchanged...


// ... (Keep your Icon components and clubs array as they are)

const ClubSection = () => {
  const containerRef = useRef(null);
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const el = containerRef.current;
    if (!el) return;

    const totalWidth = el.scrollWidth / 2;

    const tween = gsap.to(el, {
      scrollLeft: totalWidth,
      duration: 15,
      ease: "none",
      repeat: -1,
      modifiers: {
        scrollLeft: (x) => parseFloat(x) % totalWidth
      }
    });

    const pause = () => tween.pause();
    const resume = () => tween.resume();

    el.addEventListener("touchstart", pause);
    el.addEventListener("touchend", resume);

    return () => {
      tween.kill();
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, [isMobile]);

  const handleMouseEnter = (e) => {
    const target = e.currentTarget;
    const cards = containerRef.current.querySelectorAll('.club-card');

    // 1. Expand the hovered card
    gsap.to(target, {
      flex: 1.6, // Increase width share
      borderRadius: "24px",
      borderColor: "rgba(168, 85, 247, 0.4)",
      duration: 0.5,
      ease: "power3.out"
    });

    // 2. Shrink the siblings
    cards.forEach((card) => {
      if (card !== target) {
        gsap.to(card, {
          flex: 0.85, // Reduce width share
          opacity: 0.6, // Subtle fade for focus
          duration: 0.5,
          ease: "power3.out"
        });
      }
    });
  };

  const handleMouseLeave = () => {
    const cards = containerRef.current.querySelectorAll('.club-card');

    // Reset everyone to equal width and pill shape
    gsap.to(cards, {
      flex: 1,
      borderRadius: "9999px",
      backgroundColor: "#0d051a",
      borderColor: "rgb(31, 41, 55)",
      opacity: 1,
      duration: 0.5,
      ease: "power3.inOut"
    });
  };

  return (
    <section className="relative bg-[#080012] py-16 px-4 overflow-hidden border-t border-purple-500/10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-wider mb-2">
            ORGANIZING COMMITTEES
          </h2>
          <p className="text-sm text-gray-400">The creative and technical minds behind PROVENANCE 6.0</p>
        </div>

        <div
          ref={containerRef}
          className="
  flex gap-4

  overflow-x-auto lg:overflow-visible
  scroll-smooth

  snap-none

  px-4

  h-[420px] sm:h-[480px] lg:h-[550px]
"
        >
          {(isMobile ? [...clubs, ...clubs] : clubs).map((club, idx) => {
            // Extract the base color name (e.g., "blue" from "blue-400")
            const baseColor = club.mask.split('-')[0];

            return (
              <div
                key={idx}
                onMouseEnter={!isMobile ? handleMouseEnter : undefined}
                onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                className="
                  club-card group relative flex flex-col cursor-pointer overflow-hidden

                  w-[85%] sm:w-[70%] md:w-[50%] lg:w-auto
              flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-1 lg:min-w-0

                  snap-center lg:snap-none

                  border border-gray-800 rounded-3xl lg:rounded-full
                "
                style={{ willChange: "flex, border-radius" }}
              >
                {/* ================= IMAGE & DYNAMIC MASK ================= */}
                <div className="relative w-full h-[50%] sm:h-[55%] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1526394931762-90052e97b376?w=500&auto=format&fit=crop&q=60"
                    alt={club.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />

                  {/* Gradient Mask: Fades from the dynamic bottom color to transparent */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to top, ${baseColor === 'blue' ? '#08143a' : baseColor === 'purple' ? '#1a0b2e' : baseColor === 'green' ? '#061a11' : baseColor === 'orange' ? '#241005' : '#1a0505'} 20%, transparent 80%)`
                    }}
                  />
                </div>

                {/* ================= DYNAMIC CONTENT SECTION ================= */}
                <div
                  className="
                  flex flex-col justify-end 
                  h-[50%] sm:h-[45%]

                  px-4 sm:px-6 
                  py-6 sm:py-8 
                  text-center relative z-10
                "
                  style={{
                    // Fallback to a dark version of the specific club color
                    backgroundColor: `color-mix(in srgb, ${baseColor}, black 85%)`
                  }}
                >
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {club.name}
                  </p>

                  <div className="mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                      {club.tagline}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 mb-4">
                    {club.desc}
                  </p>

                  {/* Socials */}
                  <div className="flex gap-4 justify-center">
                    {club.socials.map((social, sIdx) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={sIdx}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-400 hover:text-white transition-transform hover:scale-110"
                        >
                          <Icon size={20} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClubSection;