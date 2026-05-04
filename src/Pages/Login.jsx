import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Loader, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import heroVideo from '../assets/hero.mp4';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        default:
          setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all';

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-black">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0014]/90 via-[#0a0014]/70 to-[#0a0014]/90 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent z-0" />

      <Link to="/" className="fixed top-8 left-8 z-50 flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
        <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="font-medium">Back to Home</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="glass-panel p-8 md:p-12 rounded-[2rem] border-purple-500/20 shadow-[0_0_50px_rgba(124,58,237,0.15)] overflow-hidden">
          <div className="text-center mb-10">
            <h1
              style={{ fontFamily: "'Luckiest Guy', system-ui" }}
              className="text-5xl md:text-6xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 via-yellow-400 via-cyan-400 to-purple-400 animate-gradient-text drop-shadow-[0_4px_10px_rgba(168,85,247,0.5)] mb-4 tracking-wider"
            >
              MEMBER LOGIN
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
            <p className="mt-4 text-sm text-white/70 max-w-lg mx-auto">
              Log in to access your registration details, update your profile, or continue to the event dashboard.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-red-300 text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50 group-focus-within:text-purple-400 transition-colors" />
              <input
                name="email"
                type="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50 group-focus-within:text-purple-400 transition-colors" />
              <input
                name="password"
                type="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02, boxShadow: loading ? 'none' : '0 0 20px rgba(124,58,237,0.5)' }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-10 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:from-purple-500 hover:to-pink-500 transition-all text-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Logging in…
                  </>
                ) : (
                  'LOGIN'
                )}
              </motion.button>
              <Link
                to="/register"
                className="inline-flex items-center justify-center text-sm font-medium text-purple-200 hover:text-white transition-colors"
              >
                New here? Register instead
              </Link>
            </div>
          </form>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 shadow-[0_0_40px_rgba(124,58,237,0.12)]">
            <h2 className="text-xl font-semibold text-white mb-3">Need help logging in?</h2>
            <p className="text-sm leading-6">
              If this is your first time, use the registration page to create your account. Otherwise, enter your email and password above.
            </p>
            <p className="mt-4 text-sm text-purple-200">
              Forgot your password? Please contact the event coordinator to reset it.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
