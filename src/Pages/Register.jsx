// UPDATED BRANCH LIST - VERSION 3
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, GraduationCap, Hash, Shirt, Lock, CheckCircle, AlertCircle, Loader, CreditCard, Wallet, HelpCircle, X, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import heroVideo from '../assets/hero.mp4';
import qrcode from '../assets/qr.jpg';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    rollNumber: '',
    collegeType: 'within', // Added collegeType state
    collegeName: '',       // Added collegeName state
    branch: '',
    year: '',
    tshirtSize: '',
    paymentApp: '',
    otherPaymentApp: '',
    transactionId: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successRegId, setSuccessRegId] = useState('');
  const [copiedRegId, setCopiedRegId] = useState(false);
  const [showHelp, setShowHelp] = useState(false); // Added help modal state

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    const isWithinCollege = form.collegeType === 'within';
    const hasRequiredFields = form.name && form.email && form.password && form.mobile && form.branch && form.year && form.tshirtSize;
    const hasConditionalFields = isWithinCollege ? form.rollNumber : form.collegeName;
    const hasPaymentFields = form.paymentApp && form.transactionId && (form.paymentApp !== 'other' || form.otherPaymentApp);

    if (!hasRequiredFields || !hasConditionalFields || !hasPaymentFields) {
      setError('Please fill in all required fields.');
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

      // 2. Generate unique 6-digit registration ID
      const generateRegId = async () => {
        let regId;
        let isUnique = false;
        while (!isUnique) {
          regId = String(Math.floor(100000 + Math.random() * 900000));
          const q = query(collection(db, 'users'), where('registrationId', '==', regId));
          const snap = await getDocs(q);
          if (snap.empty) isUnique = true;
        }
        return regId;
      };
      const registrationId = await generateRegId();

      // 3. Save details to Firestore → users/{uid}
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        registerationId: registrationId,
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        collegeType: form.collegeType,
        rollNumber: form.collegeType === 'within' ? form.rollNumber : '',
        collegeName: form.collegeType === 'outside' ? form.collegeName : 'RVSCET',
        branch: form.branch,
        year: form.year,
        tshirtSize: form.tshirtSize,
        paymentApp: form.paymentApp === 'other' ? form.otherPaymentApp : form.paymentApp,
        transactionId: form.transactionId,
        paymentStatus: 'pending',
        registeredAt: serverTimestamp(),
      });

      setSuccessRegId(registrationId);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 5000);
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

  const CustomSelect = ({ label, name, value, options, onChange, icon: Icon, isSearchable = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Flatten options if they are grouped
    const allOptions = options.flatMap(opt => opt.options || opt);
    const selectedOption = allOptions.find(opt => opt.value === value);

    const filteredOptions = options.map(group => {
      if (group.options) {
        const matchingOptions = group.options.filter(opt =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (opt.keywords && opt.keywords.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        return matchingOptions.length > 0 ? { ...group, options: matchingOptions } : null;
      }
      return (
        group.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (group.keywords && group.keywords.toLowerCase().includes(searchTerm.toLowerCase()))
      ) ? group : null;
    }).filter(Boolean);

    return (
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`${inputClass} cursor-pointer flex items-center justify-between group transition-all duration-300 ${isOpen ? 'border-purple-500/50 ring-1 ring-purple-500/20' : ''}`}
        >
          <div className="flex items-center gap-3">
            {Icon && <Icon className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-purple-400' : 'text-purple-400/50 group-hover:text-purple-400'}`} />}
            <span className={value ? 'text-white' : 'text-white/30'}>
              {selectedOption ? selectedOption.label : label}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg className={`w-5 h-5 transition-colors ${isOpen ? 'text-purple-400' : 'text-white/30'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => { setIsOpen(false); setSearchTerm(''); setIsSearchOpen(false); }}
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute z-50 w-full mt-2 bg-[#0d021a]/95 backdrop-blur-2xl border border-purple-500/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                {isSearchable && (
                  <div className="p-3 border-b border-white/5">
                    {!isSearchOpen ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsSearchOpen(true);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white/40 hover:text-white/60 transition-colors bg-white/5 rounded-xl border border-white/5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search Branch...
                      </button>
                    ) : (
                      <div className="relative flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Type to search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-white/5 border border-purple-500/30 rounded-xl py-2 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
                          autoFocus
                        />
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setIsSearchOpen(false);
                          }}
                          className="p-2 text-white/30 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="scrollbar-hide">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((item, idx) => {
                      if (item.options) {
                        return (
                          <div key={idx} className="mb-2 last:mb-0">
                            <div className="px-6 py-2 text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] bg-white/5 border-y border-white/5">
                              {item.category}
                            </div>
                            {item.options.map((opt) => (
                              <div
                                key={opt.value}
                                onClick={() => {
                                  onChange({ target: { name, value: opt.value } });
                                  setIsOpen(false);
                                  setSearchTerm('');
                                }}
                                className={`px-6 py-3 text-sm cursor-pointer transition-all hover:bg-purple-500/20 ${value === opt.value ? 'text-purple-400 bg-purple-500/10' : 'text-white/70 hover:text-white'}`}
                              >
                                {opt.label}
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return (
                        <div
                          key={item.value}
                          onClick={() => {
                            onChange({ target: { name, value: item.value } });
                            setIsOpen(false);
                            setSearchTerm('');
                          }}
                          className={`px-6 py-3 text-sm cursor-pointer transition-all hover:bg-purple-500/20 ${value === item.value ? 'text-purple-400 bg-purple-500/10' : 'text-white/70 hover:text-white'}`}
                        >
                          {item.label}
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-6 py-8 text-center text-white/30 text-sm">
                      No results found
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="relative w-full p-6 py-24 bg-black">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover z-0 opacity-40">
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0014]/90 via-[#0a0014]/70 to-[#0a0014]/90 z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent z-0" />

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
        className="relative z-10 w-full max-w-2xl mx-auto"
      >
        <div className="glass-panel p-8 md:p-12 rounded-[2rem] border-purple-500/20 shadow-[0_0_50px_rgba(124,58,237,0.15)]">

          {/* Success State */}
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-6 py-12 text-center"
            >
              <CheckCircle className="w-20 h-20 text-green-400" />
              <h2 className="text-3xl font-bold text-white">Registration Successful!</h2>

              {/* Registration ID Display */}
              <div className="w-full max-w-sm bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl px-5 py-4">
                <p className="text-xs font-bold tracking-widest uppercase text-purple-400 mb-2">Your Registration ID</p>
                <p className="text-3xl font-bold font-mono text-white tracking-[0.3em] mb-3">{successRegId}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(successRegId);
                    setCopiedRegId(true);
                    setTimeout(() => setCopiedRegId(false), 2000);
                  }}
                  className={`mx-auto flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${copiedRegId
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-purple-500/20 hover:text-purple-400'
                    }`}
                >
                  {copiedRegId ? 'Copied!' : 'Copy ID'}
                </button>
                <p className="text-xs text-white/40 mt-3">Save this ID — you'll need it for event check-in.</p>
              </div>

              <p className="text-white/40 text-sm">Redirecting to login page in 5 seconds…</p>
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

                  {/* College Type Selection */}
                  <CustomSelect
                    label="Select College Type"
                    name="collegeType"
                    value={form.collegeType}
                    onChange={handleChange}
                    icon={GraduationCap}
                    options={[
                      { value: 'within', label: 'Within College' },
                      { value: 'outside', label: 'Outside College' }
                    ]}
                  />

                  {/* Conditional Rendering: Roll Number or College Name */}
                  {form.collegeType === 'within' ? (
                    <div className="relative group">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50 group-focus-within:text-purple-400 transition-colors" />
                      <input name="rollNumber" type="text" placeholder="Enter Roll Number" value={form.rollNumber} onChange={handleChange} className={inputClass} />
                    </div>
                  ) : (
                    <div className="relative group">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50 group-focus-within:text-purple-400 transition-colors" />
                      <input name="collegeName" type="text" placeholder="Enter College Name" value={form.collegeName} onChange={handleChange} className={inputClass} />
                    </div>
                  )}
                </div>

                {/* Branch Dropdown */}
                <CustomSelect
                  label="Select Branch"
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  icon={GraduationCap}
                  isSearchable={true}
                  options={[
                    { value: 'bca', label: 'BCA (Bachelor of Computer Applications)', keywords: 'bca computer applications' },
                    { value: 'bba', label: 'BBA (Bachelor of Business Administration)', keywords: 'bba business administration' },
                    { value: 'mca', label: 'MCA (Master of Computer Applications)', keywords: 'mca computer applications' },
                    { value: 'diploma', label: 'Diploma (Diploma in Engineering)', keywords: 'diploma engineering' },
                    { value: 'cse', label: 'CSE (Computer Science & Engineering)', keywords: 'cse computer science engineering' },
                    { value: 'aiml', label: 'AI/ML (Artificial Intelligence & Machine Learning)', keywords: 'ai ml aiml artificial intelligence machine learning' },
                    { value: 'ece', label: 'ECE (Electronics & Communication Engineering)', keywords: 'ece electronics communication engineering' },
                    { value: 'eee', label: 'EEE (Electrical & Electronics Engineering)', keywords: 'eee electrical electronics engineering' },
                    { value: 'me', label: 'ME (Mechanical Engineering)', keywords: 'me mechanical engineering' },
                    { value: 'civil', label: 'Civil Engineering', keywords: 'civil engineering' }
                  ]}
                />

                {/* Year Selection */}
                <CustomSelect
                  label="Select Year"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  icon={GraduationCap}
                  options={[
                    { value: '1st', label: '1st Year' },
                    { value: '2nd', label: '2nd Year' },
                    { value: '3rd', label: '3rd Year' },
                    { value: '4th', label: '4th Year' },
                    { value: 'other', label: 'Other / Graduated' }
                  ]}
                />

                {/* T-Shirt Size */}
                <CustomSelect
                  label="Select T-Shirt Size"
                  name="tshirtSize"
                  value={form.tshirtSize}
                  onChange={handleChange}
                  icon={Shirt}
                  options={[
                    { value: 's', label: 'Small (S)' },
                    { value: 'm', label: 'Medium (M)' },
                    { value: 'l', label: 'Large (L)' },
                    { value: 'xl', label: 'Extra Large (XL)' },
                    { value: 'xxl', label: 'XXL' }
                  ]}
                />

                {/* --- Payment Section --- */}
                <div className="pt-6 border-t border-white/10 space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-purple-400" />
                    Payment Verification
                  </h3>

                  {/* Admin QR Code Display */}
                  <div className="flex flex-col items-center justify-center space-y-4 py-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-sm font-bold tracking-widest text-purple-400 uppercase">Scan & Pay</span>
                    <div className="relative p-3 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      {/* Stylized QR Placeholder - User can replace src with their actual QR asset */}
                      <div className="w-40 h-40 bg-zinc-200 flex items-center justify-center rounded overflow-hidden">
                        <img
                          src={qrcode}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="absolute -inset-1 border-2 border-purple-500/20 rounded-xl pointer-events-none animate-pulse" />
                    </div>
                    <p className="text-xs text-white/50 text-center px-4 italic">
                      Scan this QR using any UPI app to make your payment.
                    </p>

                    {/* Registration Fee */}
                    <div className="flex flex-col items-center gap-1 pt-2">
                      <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl px-5 py-2">
                        <span className="text-2xl font-extrabold text-white tracking-wide">₹900</span>
                        <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Registration Fee</span>
                      </div>
                      <p className="text-xs text-yellow-400/80 flex items-center gap-1 mt-1">
                        <span>🎁</span>
                        <span>This Registration fee includes a <span className="font-bold text-yellow-300">Welcome Kit</span></span>
                      </p>
                    </div>
                  </div>


                  {/* Payment App Dropdown & Details */}
                  <div className="space-y-6">
                    {/* Payment App Dropdown & Details */}
                    <CustomSelect
                      label="Select Payment App Used"
                      name="paymentApp"
                      value={form.paymentApp}
                      onChange={handleChange}
                      icon={Wallet}
                      options={[
                        { value: 'gpay', label: 'Google Pay' },
                        { value: 'phonepe', label: 'PhonePe' },
                        { value: 'paytm', label: 'Paytm' },
                        { value: 'bhim', label: 'BHIM' },
                        { value: 'amazonpay', label: 'Amazon Pay' },
                        { value: 'other', label: 'Other' }
                      ]}
                    />

                    {form.paymentApp === 'other' && (
                      <div className="relative group">
                        <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50 group-focus-within:text-purple-400 transition-colors" />
                        <input name="otherPaymentApp" type="text" placeholder="Enter Payment App Name" value={form.otherPaymentApp} onChange={handleChange} className={inputClass} />
                      </div>
                    )}

                    <div className="relative group">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50 group-focus-within:text-purple-400 transition-colors" />
                      <input
                        name="transactionId"
                        type="text"
                        placeholder="Enter Transaction ID (e.g. TXN123456...)"
                        value={form.transactionId}
                        onChange={handleChange}
                        className={inputClass}
                      />
                      <div className="flex flex-col mt-2 px-1">
                        <span className="text-[10px] text-white/40 italic">You can find this in your payment app history</span>
                        <button
                          type="button"
                          onClick={() => setShowHelp(true)}
                          className="text-[11px] text-purple-400 hover:text-purple-300 underline mt-1 text-left flex items-center gap-1 transition-colors"
                        >
                          <HelpCircle className="w-3 h-3" />
                          Don't know Transaction ID? Click here
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transaction ID Help Modal */}
                <AnimatePresence>
                  {showHelp && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
                    >
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-[#1a0b2e] border border-purple-500/30 rounded-3xl p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(124,58,237,0.2)]"
                      >
                        <button
                          onClick={() => setShowHelp(false)}
                          className="absolute top-4 right-4 text-white/40 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all"
                        >
                          <X className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 bg-purple-500/20 rounded-2xl">
                            <Info className="w-6 h-6 text-purple-400" />
                          </div>
                          <h2 className="text-2xl font-bold text-white">How to find it?</h2>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <p className="text-white/80 text-sm leading-relaxed">
                              Transaction ID is a unique number generated after every successful payment.
                            </p>
                          </div>

                          <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-white/5">
                            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest">Example Formats</h3>
                            <ul className="text-sm text-white/60 space-y-1 font-mono">
                              <li>• TXN123456789</li>
                              <li>• 8A7B9C123XYZ</li>
                            </ul>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest">Where to check?</h3>
                            <div className="grid grid-cols-1 gap-3">
                              {[
                                { app: "Google Pay", text: "Open payment → see 'UPI Transaction ID'" },
                                { app: "PhonePe", text: "Tap payment → check 'Transaction ID'" },
                                { app: "Paytm", text: "Open payment → view 'Order ID / UPI Ref No'" }
                              ].map((guide, idx) => (
                                <div key={idx} className="flex flex-col gap-1">
                                  <span className="text-xs font-bold text-white/90">{guide.app}</span>
                                  <span className="text-xs text-white/50">{guide.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowHelp(false)}
                            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all shadow-lg"
                          >
                            Got it!
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

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
