import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './Pages/Home';
import PageTransition from './components/PageTransition';
import ReactLenis from 'lenis/react';
import ScrollProgress from './components/ScrollProgress';
import ScrollToHash from './components/ScrollToHash';


// Lazy loading the page components
const Register = lazy(() => import('./Pages/Register'));
const Login = lazy(() => import('./Pages/Login'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Committee = lazy(() => import('./Pages/Committee'));


// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-[#0a0014] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.06,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        smoothTouch: true,       // ✅ REQUIRED for mobile
        touchMultiplier: 1.2,    // increase for noticeable effect
        syncTouch: true
      }}
    >
      <AuthProvider>
        <ScrollProgress />
        <ScrollToHash />
        <PageTransition>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/committee" element={<Committee />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </AuthProvider>
    </ReactLenis>
  );
}

export default App;