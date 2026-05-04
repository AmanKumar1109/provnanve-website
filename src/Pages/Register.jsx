import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, GraduationCap, Hash, Shirt, Lock, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import heroVideo from '../assets/hero.mp4';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    rollNumber: '',
    branch: '',
    tshirtSize: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!form.name || !form.email || !form.password || !form.mobile || !form.rollNumber || !form.branch || !form.tshirtSize) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // 2. Save details to Firestore → users/{uid}
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        rollNumber: form.rollNumber,
        branch: form.branch,
        tshirtSize: form.tshirtSize,
        registeredAt: serverTimestamp(),
      });

      setSuccess(true);
      setTimeout(() => navigate('/'), 2500);
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please login instead.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Use at least 6 characters.');
          break;
        default:
          setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all';

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-black">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0014]/90 via-[#0a0014]/70 to-[#0a0014]/90 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent z-0" />

      {/* Back Button */}
      <Link to="/" className="fixed top-8 left-8 z-50 flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
        <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="glass-panel p-8 md:p-12 rounded-[2rem] border-purple-500/20 shadow-[0_0_50px_rgba(124,58,237,0.15)] overflow-hidden">

          {/* Success State */}
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-6 py-12 text-center"
            >
              <CheckCircle className="w-20 h-20 text-green-400" />
              <h2 className="text-3xl font-bold text-white">Registration Successful!</h2>
              <p className="text-white/60">Welcome aboard! Redirecting you to the homepage…</p>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1
                  style={{ fontFamily: "'Luckiest Guy', system-ui" }}
                  className="text-5xl md:text-6xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 via-yellow-400 via-cyan-400 to-purple-400 animate-gradient-text drop-shadow-[0_4px_10px_rgba(168,85,247,0.5)] mb-4 tracking-wider"
                >
                  EVENT REGISTRATION
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                <p className="mt-4 text-sm text-white/70 max-w-xl mx-auto">
                  Already registered?{' '}
                  <Link to="/login" className="text-purple-300 hover:text-purple-100 underline transition-colors">
                    Login here
                  </Link>{' '}
                  or complete the form below to join the event.
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50 group-focus-within:text-purple-400 transition-colors" />
                    <input name="name" type="text" placeholder="Enter Name" value={form.name} onChange={handleChange} className={inputClass} />
                  </div>

                  {/* Email */}
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50 group-focus-within:text-purple-400 transition-colors" />
                    <input name="email" type="email" placeholder="Enter Email" value={form.email} onChange={handleChange} className={inputClass} />
                  </div>

                  {/* Password */}
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50 group-focus-within:text-purple-400 transition-colors" />
                    <input name="password" type="password" placeholder="Create Password (min 6 chars)" value={form.password} onChange={handleChange} className={inputClass} />
                  </div>

                  {/* Mobile */}
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50 group-focus-within:text-purple-400 transition-colors" />
                    <input name="mobile" type="tel" placeholder="Enter Mobile Number" value={form.mobile} onChange={handleChange} className={inputClass} />
                  </div>

                  {/* Roll Number */}
                  <div className="relative group">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50 group-focus-within:text-purple-400 transition-colors" />
                    <input name="rollNumber" type="text" placeholder="Enter Roll Number" value={form.rollNumber} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* Branch Dropdown */}
                <div className="relative group">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50 group-focus-within:text-purple-400 transition-colors" />
                  <select name="branch" value={form.branch} onChange={handleChange} className={`${inputClass} appearance-none pr-10`}>
                    <option value="" disabled>Select Branch</option>
                    <option value="cse">Computer Science</option>
                    <option value="ece">Electronics &amp; Communication</option>
                    <option value="ee">Electrical Engineering</option>
                    <option value="me">Mechanical Engineering</option>
                    <option value="ce">Civil Engineering</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* T-Shirt Size */}
                <div className="relative group">
                  <Shirt className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50 group-focus-within:text-purple-400 transition-colors" />
                  <select name="tshirtSize" value={form.tshirtSize} onChange={handleChange} className={`${inputClass} appearance-none pr-10`}>
                    <option value="" disabled>Select T-Shirt Size</option>
                    <option value="s">Small (S)</option>
                    <option value="m">Medium (M)</option>
                    <option value="l">Large (L)</option>
                    <option value="xl">Extra Large (XL)</option>
                    <option value="xxl">XXL</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.02, boxShadow: loading ? 'none' : '0 0 30px rgba(124, 58, 237, 0.4)' }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:from-purple-500 hover:to-pink-500 transition-all text-lg mt-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Registering…
                    </>
                  ) : (
                    'COMPLETE REGISTRATION'
                  )}
                </motion.button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
