import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import { AuthProvider } from './contexts/AuthContext';
import PageTransition from './components/PageTransition';
import ReactLenis from 'lenis/react';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.06,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        smoothTouch: true,       // ✅ REQUIRED for mobile
        touchMultiplier: 1.2,    // increase for noticeable effect
        syncTouch: true
      }}
    >
      <AuthProvider>
        <ScrollProgress />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </PageTransition>
      </AuthProvider>
    </ReactLenis>
  );
}

export default App;