import React, { Suspense, lazy } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

// Lazy load components
const About = lazy(() => import('../components/About'));
const CelebrityGuest = lazy(() => import('../components/CelebrityGuest'));
const EventSection = lazy(() => import('../components/EventSection'));
const GallerySection = lazy(() => import('../components/GallerySection'));
const ClubSection = lazy(() => import('../components/ClubSection'));
const Footer = lazy(() => import('../components/Footer'));
const ScrollToTop = lazy(() => import('../components/ScrollToTop'));

const Home = () => {
  return (
    <div className="bg-[#0a0014] min-h-screen text-white selection:bg-purple-500/30 relative">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <CelebrityGuest />
          <div className="-mt-12"><EventSection /></div>
          <div className="-mt-12"><GallerySection /></div>
          <div className="-mt-12"><ClubSection /></div>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <ScrollToTop />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;

