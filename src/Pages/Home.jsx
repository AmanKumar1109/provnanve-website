import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';

const Home = () => {
  return (
    <div className="bg-[#0a0014] min-h-screen text-white selection:bg-purple-500/30">
      <Navbar />
      <main>
        <Hero />
        <About />
      </main>
    </div>
  );
};

export default Home;
