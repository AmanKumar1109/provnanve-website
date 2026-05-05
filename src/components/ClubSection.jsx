import React, { useEffect, useRef, useState } from 'react';
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

  // ✅ Responsive detection
  const [isMobile, setIsMobile] = useState(false);

  const scrollByAmount = (dir = 1) => {
    const el = containerRef.current;
    if (!el) return;

    // scroll ~1 card at a time (90% of container width)
    const amount = el.clientWidth * 0.9 * dir;

    el.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);


  // ✅ Desktop hover animation
  const handleMouseEnter = (e) => {
    const target = e.currentTarget;
    const cards = containerRef.current.querySelectorAll(".club-card");

    gsap.to(target, {
      flex: 1.6,
      borderRadius: "24px",
      duration: 0.5,
      ease: "power3.out",
    });

    cards.forEach((card) => {
      if (card !== target) {
        gsap.to(card, {
          flex: 0.85,
          opacity: 0.6,
          duration: 0.5,
        });
      }
    });
  };

  const handleMouseLeave = () => {
    const cards = containerRef.current.querySelectorAll(".club-card");

    gsap.to(cards, {
      flex: 1,
      borderRadius: "9999px",
      opacity: 1,
      duration: 0.5,
      ease: "power3.inOut",
    });
  };

  return (
    <section className="relative bg-[#080012] py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            ORGANIZING COMMITTEES
          </h2>
          <p className="text-sm text-gray-400">
            The creative and technical minds behind PROVENANCE 6.0
          </p>
        </div>

        <div className="relative">

          {/* LEFT BUTTON */}
          {isMobile && <button
            onClick={() => scrollByAmount(-1)}
            className="
      hidden sm:flex
      absolute left-0 top-1/2 -translate-y-1/2 z-20

      h-10 w-10 items-center justify-center
      rounded-full bg-black/50 backdrop-blur
      border border-white/10 text-white

      hover:bg-black/70
    "
          >
            ‹
          </button>}

          {/* RIGHT BUTTON */}
          {isMobile && <button
            onClick={() => scrollByAmount(1)}
            className="
      hidden sm:flex
      absolute right-0 top-1/2 -translate-y-1/2 z-20

      h-10 w-10 items-center justify-center
      rounded-full bg-black/50 backdrop-blur
      border border-white/10 text-white

      hover:bg-black/70
    "
          >
            ›
          </button>
}
          {/* Container */}
          <div
            ref={containerRef}
            className="
              flex gap-4
              overflow-x-auto lg:overflow-visible
              scroll-smooth

              snap-x snap-mandatory lg:snap-none

              px-4
              h-[420px] sm:h-[480px] lg:h-[550px]"
          >

            {clubs.map((club, idx) => {
              const baseColor = club.mask.split("-")[0];

              return (
                <div
                  key={idx}
                  onMouseEnter={!isMobile ? handleMouseEnter : undefined}
                  onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                  className="
                  club-card group relative flex flex-col cursor-pointer overflow-hidden

                  w-[85%] sm:w-[70%] md:w-[50%] lg:w-auto
                  flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-1
                  snap-center lg:snap-none
                  border border-gray-800 rounded-3xl lg:rounded-full
                "
                >

                  {/* IMAGE */}
                  <div className="relative w-full h-[50%] sm:h-[55%] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1526394931762-90052e97b376?w=500&auto=format&fit=crop&q=60"
                      alt={club.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />

                    {/* MASK */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to top, ${baseColor === "blue"
                          ? "#08143a"
                          : baseColor === "purple"
                            ? "#1a0b2e"
                            : baseColor === "green"
                              ? "#061a11"
                              : baseColor === "orange"
                                ? "#241005"
                                : "#1a0505"
                          } 20%, transparent 80%)`,
                      }}
                    />
                  </div>

                  {/* CONTENT */}
                  <div
                    className="
                    flex flex-col justify-end
                    h-[50%] sm:h-[45%]
                    px-4 sm:px-6 py-6 sm:py-8
                    text-center
                  "
                    style={{
                      backgroundColor: `color-mix(in srgb, ${baseColor}, black 85%)`,
                    }}
                  >
                    <p className="text-xs sm:text-sm text-gray-300">
                      {club.name}
                    </p>

                    <div className="mb-2">
                      <span className="text-[10px] uppercase text-white/90 bg-white/10 px-3 py-1 rounded-full">
                        {club.tagline}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 line-clamp-3">
                      {club.desc}
                    </p>

                    <div className="flex justify-center gap-3 mt-3">
                      {club.socials.map((social, i) => {
                        const Icon = social.icon;
                        return <Icon key={i} size={18} />;
                      })}
                    </div>
                  </div>

                </div>
              );
            })}

<<<<<<< HEAD
=======
          <div className="mt-8 max-w-md mx-auto h-1.5 bg-gray-900 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              style={{ width: `${Math.max(5, scrollProgress)}%` }}
            />
>>>>>>> 2f9476d93b469bef3d0c1a159fe382a232b90b53
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubSection;