import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import CelebrityGuest from '../components/CelebrityGuest';
import EventSection from '../components/EventSection';
import GallerySection from '../components/GallerySection';
import ClubSection from '../components/ClubSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const Home = () => {
  return (
    <div className="bg-[#0a0014] min-h-screen text-white selection:bg-purple-500/30 relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <CelebrityGuest />
        <div className="-mt-12"><EventSection /></div>
        <div className="-mt-12"><GallerySection /></div>
        <div className="-mt-12"><ClubSection /></div>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Home;
