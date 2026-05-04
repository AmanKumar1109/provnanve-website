import React from 'react';
import { motion } from 'framer-motion';
import { Users, Rocket, Cpu, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users className="w-6 h-6" />, label: 'Attendees', value: '5,000+' },
    { icon: <Rocket className="w-6 h-6" />, label: 'Innovation', value: 'Next-Gen' },
    { icon: <Cpu className="w-6 h-6" />, label: 'Events', value: '50+' },
    { icon: <Globe className="w-6 h-6" />, label: 'Reach', value: 'National' },
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden bg-[#0a0014]">
      {/* Seamless Deep Gradient Transition (Replaces the line) */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#0a0014] via-[#0a0014]/50 to-transparent z-10 -translate-y-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-transparent via-transparent to-[#0a0014] z-10 -mt-80 pointer-events-none" />
      
      {/* Soft Glow Ambient Layer */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none opacity-60" />

      {/* Decorative Elements */}
      <div className="absolute -top-48 -left-24 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] opacity-30" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] opacity-30" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-purple-400 font-bold tracking-[0.3em] uppercase text-sm"
              >
                The Legacy of Excellence
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-pulse">PROVENANCE 6.0</span>
              </h2>
            </div>

            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Provenance 6.0, <span className="text-white font-semibold">R.V.S. College of Engineering and Technology's</span> annual techno-cultural fest, stands as one of the most anticipated events in Jharkhand. With an impressive turnout of over <span className="text-purple-400 font-bold">5,000+ attendees</span>, including students, professionals, educators, and artists from premier institutions across the country.
              </p>
              <p>
                This edition is a celebration of technology, creativity, and culture, offering a platform for innovation and artistic expression. It brings together diverse talents to showcase groundbreaking ideas and inspire future advancements.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors group text-center"
                >
                  <div className="text-purple-400 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Element / Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 glass-panel p-2 rounded-[2.5rem] rotate-3 hover:rotate-0 transition-transform duration-700 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)]">
               <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center relative overflow-hidden">
                  {/* Abstract Cyberpunk Shapes */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-64 h-64 border-4 border-dashed border-purple-500/30 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
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
            
            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 z-20 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full text-sm font-bold shadow-xl"
            >
              Jharkhand's Biggest Fest
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
