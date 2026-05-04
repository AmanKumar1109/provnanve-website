import React, { useLayoutEffect, useRef } from 'react';
import { Users, Rocket, Cpu, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef([]);
  const visualRef = useRef(null);
  const badgeRef = useRef(null);
  const circlesRef = useRef([]);

  const stats = [
    { icon: <Users className="w-6 h-6" />, label: 'Attendees', value: '5,000+' },
    { icon: <Rocket className="w-6 h-6" />, label: 'Innovation', value: 'Next-Gen' },
    { icon: <Cpu className="w-6 h-6" />, label: 'Events', value: '50+' },
    { icon: <Globe className="w-6 h-6" />, label: 'Reach', value: 'National' },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Content Entrance (Initial: opacity 0, x -50)
      gsap.from(textRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // 2. Stats Staggered Entrance
      gsap.from(statsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // 3. Visual Element Scale Entrance
      gsap.from(visualRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // 4. Infinite Floating Animation (Badge)
      gsap.to(badgeRef.current, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // 5. Infinite Rotation (Cyberpunk Circles)
      gsap.to(circlesRef.current[0], {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
      gsap.to(circlesRef.current[1], {
        rotate: -360,
        duration: 15,
        repeat: -1,
        ease: "none",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden bg-[#0a0014]"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#0a0014] via-[#0a0014]/50 to-transparent z-10 -translate-y-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-transparent via-transparent to-[#0a0014] z-10 -mt-80 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none opacity-60" />

      {/* Decorative Elements */}
      <div className="absolute -top-48 -left-24 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] opacity-30" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] opacity-30" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div ref={textRef} className="space-y-8">
            <div className="space-y-4">
              <span className="text-purple-400 font-bold tracking-[0.3em] uppercase text-sm block">
                The Legacy of Excellence
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-pulse">PROVENANCE 6.0</span>
              </h2>
            </div>

            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Provenance 6.0, <span className="text-white font-semibold">R.V.S. College of Engineering and Technology's</span> annual techno-cultural fest, stands as one of the most anticipated events in Jharkhand. With an impressive turnout of over <span className="text-purple-400 font-bold">5,000+ attendees</span>.
              </p>
              <p>
                This edition is a celebration of technology, creativity, and culture, offering a platform for innovation and artistic expression.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  ref={el => statsRef.current[idx] = el}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors group text-center"
                >
                  <div className="text-purple-400 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element / Card */}
          <div ref={visualRef} className="relative">
            <div className="relative z-10 glass-panel p-2 rounded-[2.5rem] rotate-3 hover:rotate-0 transition-transform duration-700 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)]">
               <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                  
                  {/* Rotating Circles */}
                  <div 
                    ref={el => circlesRef.current[0] = el}
                    className="w-64 h-64 border-4 border-dashed border-purple-500/30 rounded-full" 
                  />
                  <div 
                    ref={el => circlesRef.current[1] = el}
                    className="absolute w-48 h-48 border-4 border-dashed border-blue-500/30 rounded-full" 
                  />

                  <div className="relative text-center space-y-2">
                    <div style={{ fontFamily: "'Luckiest Guy', cursive" }} className="text-8xl text-white opacity-10 leading-none">6.0</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Rocket className="w-24 h-24 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                    </div>
                  </div>
               </div>
            </div>
            
            {/* Floating Badge */}
            <div 
              ref={badgeRef}
              className="absolute -top-6 -right-6 z-20 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full text-sm font-bold shadow-xl text-white"
            >
              Jharkhand's Biggest Fest
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;