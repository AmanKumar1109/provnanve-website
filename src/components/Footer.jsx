import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

// Icons (same as before)
const InstagramIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const FacebookIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4z"></path>
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (e, destination) => {
    e.preventDefault();
    const id = destination.toLowerCase();

    if (id === "register" || id === "login") {
      navigate(`/${id}`);
      return;
    }

    if (id === "contact") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id === "home" ? "hero-section" : id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // spotlight (unchanged)
  useEffect(() => {
    const el = document.getElementById("spotlight-text");
    if (!el) return;

    const updateMask = (clientX, clientY) => {
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      el.style.webkitMaskImage = `radial-gradient(circle 200px at ${x}px ${y}px, white 40%, transparent 60%)`;
      el.style.maskImage = `radial-gradient(circle 200px at ${x}px ${y}px, white 40%, transparent 60%)`;
    };

    window.addEventListener("mousemove", (e) => updateMask(e.clientX, e.clientY));
    return () => window.removeEventListener("mousemove", updateMask);
  }, []);

  const quickLinks = ["Home", "Events", "Register", "Schedule", "Contact"];

  const categories = [
    { name: "HELIX", desc: "Tech & AI" },
    { name: "TARANGINI", desc: "Cultural" },
    { name: "XPECTRA", desc: "Media" },
    { name: "RVS PANTHERS", desc: "Sports" },
    { name: "CIRCUITRON", desc: "Robotics & IoT" },
  ];

  const rvscetLinks = [
    {
      icon: InstagramIcon,
      href: "https://www.instagram.com/rvscetjsr/",
      color: "hover:text-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]"
    },
    {
      icon: FacebookIcon,
      href: "https://www.facebook.com/rvscet.engineering",
      color: "hover:text-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
    },
    {
      icon: LinkedinIcon,
      href: "https://www.linkedin.com/school/rvs-college-of-engineering-and-technology/posts/?feedView=all",
      color: "hover:text-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.5)]"
    },
    {
      icon: YoutubeIcon,
      href: "https://www.youtube.com/@rvscetjsr",
      color: "hover:text-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
    },
  ];

  const provenanceLinks = [
    {
      icon: InstagramIcon,
      href: "https://www.instagram.com/provenance.rvscet/",
      color: "hover:text-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
    },
  ];

  return (
    <footer className="border-[#7c3aed]/50 bg-[#7c3aed]/20 text-zinc-200 overflow-hidden rounded-t-xl sm:rounded-t-[10rem] md:rounded-t-[14rem] pt-10 relative">

      <div id="spotlight-text" className="text-center text-[10vw] font-bold tracking-tight bg-[url('/noise.png')] bg-repeat bg-size-[180px] bg-clip-text text-transparent pointer-events-none select-none">
        PROVENANCE 6.0
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pb-10 md:pb-20">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 mb-16">

          {/* BRAND + LOCATION + EMAIL */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-zinc-400">Where Tech, Culture & Innovation Collide</p>

            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex items-center gap-3">
                <MapPin size={16} />
                <span>RVSCET, Jamshedpur</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} />
                <a href="mailto:info@provenance.com" className="hover:text-white">
                  info@provenance.com
                </a>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <nav>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link}>
                  <a
                    onClick={(e) => handleLinkClick(e, link)}
                    className="relative block h-[20px] overflow-hidden group cursor-pointer"
                  >
                    {/* Default text */}
                    <span className="block text-zinc-400 transition-transform duration-300 group-hover:-translate-y-full">
                      {link}
                    </span>

                    {/* Hover text */}
                    <span className="block text-white absolute left-0 top-full transition-transform duration-300 group-hover:translate-y-[-100%]">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-white mb-4">Event Categories</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat.name}>{cat.name} — {cat.desc}</li>
              ))}
            </ul>
          </div>

          {/* CONNECT WITH US (IDENTIFIABLE) */}
          <div>
            <h3 className="text-white mb-4">Connect With Us</h3>

            <p className="text-xs text-zinc-400 mb-2">RVSCET Official</p>
            <div className="flex gap-3 mb-4">
              {rvscetLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a key={i} href={s.href} className="p-2 bg-zinc-900 rounded-full hover:text-white">
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            <p className="text-xs text-zinc-400 mb-2">Provenance 6.0</p>
            <div className="flex gap-3">
              {provenanceLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a key={i} href={s.href} className="p-2 bg-zinc-900 rounded-full hover:text-white">
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex justify-between text-sm text-zinc-500">
          <span>© {new Date().getFullYear()} PROVENANCE 6.0 • RVSCET</span>
          <span>Built with precision, performance, and intent.</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;