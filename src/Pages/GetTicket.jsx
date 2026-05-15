import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket, Minus, Plus, X, CheckCircle, AlertCircle, Loader, Music, Crown, Users, Copy, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, updateDoc, arrayUnion, Timestamp, collection, query, where, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import stageMap from '../assets/stage_area_map.png';
import vdjShaan from '../assets/vdj shan.jpg';
import pranavImg from '../assets/image_copy.png';
import qrcode from '../assets/ticket_qr.jpeg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GetTicket = () => {
  const { isLoggedIn, user, login } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Modal & form state
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [university, setUniversity] = useState('');
  const [branch, setBranch] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [paymentApp, setPaymentApp] = useState('');
  const [otherApp, setOtherApp] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [purchasedTicketId, setPurchasedTicketId] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (purchasedTicketId) {
      navigator.clipboard.writeText(purchasedTicketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tickets = [
    { id: 'normal', label: 'Normal Entry Pass', price: 300, color: 'purple', icon: Users, perks: ['General Seating Area', 'Live Comedy Show Access', 'DJ Night Access', 'Open Ground Standing'] },
    { id: 'vip', label: 'VIP Entry Pass', price: 500, color: 'amber', icon: Crown, perks: ['Premium VIP Seating', 'Comfort Zone with Coolers', 'Water Station Access', 'Priority Entry & Best View'] },
  ];

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setQuantity(1);
    setName(user?.name || '');
    setEmail(user?.email || '');
    setMobile(user?.mobile || '');
    setUniversity(user?.collegeName || '');
    setBranch(user?.branch || '');
    setRollNo(user?.rollNumber || '');
    setError(''); setSuccess('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !mobile || !university || !branch) { setError('Please fill all required fields.'); return; }
    if (!paymentApp) { setError('Please select a payment app.'); return; }
    if (paymentApp === 'other' && !otherApp.trim()) { setError('Please enter the payment app name.'); return; }
    if (!transactionId.trim()) { setError('Please enter the transaction ID.'); return; }

    setSubmitting(true); setError('');
    try {
      const generatedTicketId = Math.floor(100000 + Math.random() * 900000).toString();
      const ticketData = {
        ticketId: generatedTicketId,
        ticketType: selectedTicket.id,
        ticketLabel: selectedTicket.label,
        quantity,
        unitPrice: selectedTicket.price,
        totalPrice: selectedTicket.price * quantity,
        name, email, mobile, university, branch, rollNo,
        paymentApp: paymentApp === 'other' ? otherApp.trim() : paymentApp,
        transactionId: transactionId.trim(),
        status: 'pending',
        purchasedAt: Timestamp.now(),
      };

      if (isLoggedIn && user?.uid) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { ticketPurchases: arrayUnion(ticketData) });

        // Update local auth context
        const freshSnap = await getDoc(userRef);
        if (freshSnap.exists() && login) login({ ...user, ...freshSnap.data() });
      } else {
        const q = query(collection(db, 'users'), where('email', '==', email.toLowerCase()));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const existingDoc = querySnapshot.docs[0];
          const userRef = doc(db, 'users', existingDoc.id);
          await updateDoc(userRef, { ticketPurchases: arrayUnion(ticketData) });
        } else {
          const newUserRef = doc(collection(db, 'users'));
          await setDoc(newUserRef, {
            name,
            email: email.toLowerCase(),
            mobile,
            collegeName: university,
            branch,
            rollNumber: rollNo,
            isGuest: true,
            ticketPurchases: [ticketData]
          });
        }
      }

      setSuccess('');
      setPaymentApp(''); setOtherApp(''); setTransactionId('');
      setShowModal(false);
      setPurchasedTicketId(generatedTicketId);
    } catch (err) {
      console.error('Ticket purchase error:', err);
      setError('Failed to submit. Please try again.');
    } finally { setSubmitting(false); }
  };

  const total = selectedTicket ? selectedTicket.price * quantity : 0;

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.utils.toArray('.animate-on-scroll').forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#09000f] text-white" ref={containerRef}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0e0018]/80 backdrop-blur-sm px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back to Home</span><span className="sm:hidden">Home</span>
        </Link>
        <span style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-xs sm:text-sm font-bold tracking-widest text-purple-400 uppercase">Provenance 6.0</span>
        {isLoggedIn ? (
          <Link to="/dashboard" className="text-purple-400 hover:text-purple-300 text-sm font-medium">Dashboard</Link>
        ) : (
          <Link to="/login" className="text-purple-400 hover:text-purple-300 text-sm font-medium">Login</Link>
        )}
      </nav>

      {/* ═══ Hero Banner ═══ */}
      <section className="relative overflow-hidden pb-4">
        {/* Multi-layer background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0030] via-[#0f001e] to-[#09000f]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(217,70,239,0.18) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 80% 60%, rgba(139,92,246,0.18) 0%, transparent 60%)' }} />
        {/* Animated top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-60" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
          {/* Event badge */}
          <div className="flex items-center justify-center gap-3 mb-8 hero-element">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/40 text-fuchsia-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(217,70,239,0.2)]">
              <Music className="w-3.5 h-3.5" />15th May · Celebrity Night
            </span>
          </div>

          {/* Performer showcase */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-16 mb-10 hero-element">
            {/* Pranav Sharma */}
            <div className="flex flex-col items-center group">
              <div className="relative w-32 h-32 sm:w-44 sm:h-44">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 opacity-30 blur-xl group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative w-full h-full rounded-full border-2 border-purple-500/60 p-1 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                  <img src={pranavImg} alt="Pranav Sharma" className="w-full h-full rounded-full object-cover object-top" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">Pranav Sharma</h3>
                <span className="inline-block mt-1 text-[10px] font-bold tracking-widest uppercase text-purple-300 bg-purple-500/15 border border-purple-500/30 px-3 py-1 rounded-full">Stand-Up Comedy</span>
              </div>
            </div>

            {/* & separator */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden sm:block" />
              <span className="text-4xl sm:text-6xl font-black" style={{ background: 'linear-gradient(135deg, #d946ef, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>&amp;</span>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden sm:block" />
            </div>

            {/* VDJ Shaan */}
            <div className="flex flex-col items-center group">
              <div className="relative w-32 h-32 sm:w-44 sm:h-44">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 opacity-30 blur-xl group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative w-full h-full rounded-full border-2 border-fuchsia-500/60 p-1 shadow-[0_0_40px_rgba(217,70,239,0.4)]">
                  <img src={vdjShaan} alt="VDJ Shaan" className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">VDJ Shaan</h3>
                <span className="inline-block mt-1 text-[10px] font-bold tracking-widest uppercase text-fuchsia-300 bg-fuchsia-500/15 border border-fuchsia-500/30 px-3 py-1 rounded-full">DJ Night</span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight hero-element">
            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Grab Your Spot</span>
            <br />
            <span className="text-white/90">at the Biggest Night of the Year!</span>
          </h1>
          <p className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto hero-element">
            An unforgettable evening of laughs and beats. Choose your seating, grab your pass, and be part of the experience.
          </p>
        </div>
      </section>

      {/* ═══ Seating Map ═══ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 animate-on-scroll">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Venue Layout</h2>
          <p className="text-white/40 text-sm">Choose your preferred seating area</p>
        </div>
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-[0_0_40px_rgba(139,92,246,0.1)]">
          <img src={stageMap} alt="Stage Area Seating Map" className="w-full h-auto" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#09000f] to-transparent" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6">
          {[
            { color: 'bg-blue-500', label: 'Faculty Reserved' },
            { color: 'bg-amber-500', label: 'VIP Seating' },
            { color: 'bg-green-500', label: 'General (Normal)' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
              <div className={`w-3 h-3 rounded-sm ${l.color}`} />
              <span>{l.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Ticket Cards ═══ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 animate-on-scroll">
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Choose Your Pass</h2>
          <p className="text-white/40 text-sm">Select a ticket type to proceed</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {tickets.map((t) => {
            const isVip = t.id === 'vip';
            const IconComp = t.icon;
            return (
              <div
                key={t.id}
                className={`group relative rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col ${isVip
                    ? 'border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-amber-900/5 to-black/60 shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:shadow-[0_0_60px_rgba(245,158,11,0.3)]'
                    : 'border-purple-500/40 bg-gradient-to-br from-purple-500/10 via-purple-900/5 to-black/60 shadow-[0_0_30px_rgba(168,85,247,0.12)] hover:shadow-[0_0_60px_rgba(168,85,247,0.25)]'
                  }`}
                style={{ backdropFilter: 'blur(20px)' }}
                onClick={() => openModal(t)}
              >
                {/* Top glow line */}
                <div className={`absolute top-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-transparent ${isVip ? 'via-amber-400' : 'via-purple-500'} to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Badge row */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${isVip ? 'bg-amber-500/15 border border-amber-500/30' : 'bg-purple-500/15 border border-purple-500/30'
                    }`}>
                    <IconComp className={`w-4 h-4 ${isVip ? 'text-amber-400' : 'text-purple-400'}`} />
                    <span className={`text-xs font-bold ${isVip ? 'text-amber-300' : 'text-purple-300'}`}>{isVip ? 'VIP' : 'General'}</span>
                  </div>
                  {isVip && (
                    <span className="text-[9px] font-black tracking-widest uppercase bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/40 animate-pulse">✦ Premium</span>
                  )}
                </div>

                {/* Title & price */}
                <h3 className="text-xl sm:text-2xl font-black text-white mb-1 tracking-tight">{t.label}</h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className={`text-4xl sm:text-5xl font-black ${isVip ? 'text-amber-400' : 'text-purple-400'}`}>₹{t.price}</span>
                  <span className="text-white/30 text-sm">/person</span>
                </div>

                {/* Perks */}
                <ul className="space-y-2 flex-1 mb-6">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-white/60 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isVip ? 'bg-amber-400' : 'bg-purple-400'}`} />
                      {p}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all hover:scale-105 active:scale-95 ${isVip
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-[0_4px_20px_rgba(245,158,11,0.4)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.6)]'
                      : 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-[0_4px_20px_rgba(168,85,247,0.4)] hover:shadow-[0_4px_30px_rgba(168,85,247,0.6)]'
                    }`}
                >
                  🎟 Buy Now
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ Booking Modal ═══ */}
      {showModal && selectedTicket && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm p-4 sm:p-6" onClick={() => setShowModal(false)} data-lenis-prevent="true">
          <div className="relative w-full max-w-2xl my-8 rounded-2xl border border-white/10 bg-[#0e0018] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Ticket className={`w-5 h-5 ${selectedTicket.id === 'vip' ? 'text-amber-400' : 'text-purple-400'}`} />
                <h3 className="font-bold text-white text-base sm:text-lg">{selectedTicket.label}</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white p-1"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
              {error && <div className="text-red-400 text-xs flex gap-2 items-center bg-red-500/10 p-3 rounded-xl border border-red-500/20"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}
              {success && <div className="text-green-400 text-xs flex gap-2 items-center bg-green-500/10 p-3 rounded-xl border border-green-500/20"><CheckCircle className="w-4 h-4 shrink-0" />{success}</div>}

              {/* Personal Details */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Personal Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="Full Name *" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:border-purple-500/50 outline-none placeholder:text-white/25" />
                  <input type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:border-purple-500/50 outline-none placeholder:text-white/25" />
                  <input type="tel" placeholder="Mobile No. *" value={mobile} onChange={(e) => setMobile(e.target.value)} required className="col-span-1 sm:col-span-2 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:border-purple-500/50 outline-none placeholder:text-white/25" />
                </div>
              </div>

              {/* Academic Details */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Academic Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="University / College *" value={university} onChange={(e) => setUniversity(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:border-purple-500/50 outline-none placeholder:text-white/25" />
                  <input type="text" placeholder="Branch *" value={branch} onChange={(e) => setBranch(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:border-purple-500/50 outline-none placeholder:text-white/25" />
                  <input type="text" placeholder="Roll No. (optional)" value={rollNo} onChange={(e) => setRollNo(e.target.value)} className="col-span-1 sm:col-span-2 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:border-purple-500/50 outline-none placeholder:text-white/25" />
                </div>
              </div>

              {/* Cart */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Your Cart</h4>
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white/70">{selectedTicket.label}</span>
                    <span className={`text-sm font-bold ${selectedTicket.id === 'vip' ? 'text-amber-400' : 'text-purple-400'}`}>₹{selectedTicket.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Quantity</span>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors"><Minus className="w-4 h-4" /></button>
                      <span className="text-lg font-bold text-white w-8 text-center">{quantity}</span>
                      <button type="button" onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors"><Plus className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Total</span>
                    <span className={`text-xl font-black ${selectedTicket.id === 'vip' ? 'text-amber-400' : 'text-purple-400'}`}>₹{total}</span>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Payment</h4>
                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                  <div className="shrink-0 flex flex-col items-center bg-white/5 p-4 rounded-xl border border-white/10 w-full sm:w-auto">
                    <div className="w-32 h-32 bg-white rounded-lg p-2 mb-2">
                      <img src={qrcode} alt="UPI QR Code" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs text-white/60 font-medium">Scan & Pay ₹{total}</span>
                  </div>
                  <div className="w-full flex-1 space-y-3">
                    <select value={paymentApp} onChange={(e) => setPaymentApp(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:border-purple-500/50 outline-none">
                      <option value="" disabled className="bg-zinc-900">Select Payment App</option>
                      <option value="phonepe" className="bg-zinc-900">PhonePe</option>
                      <option value="gpay" className="bg-zinc-900">Google Pay</option>
                      <option value="bhim" className="bg-zinc-900">BHIM</option>
                      <option value="upi" className="bg-zinc-900">UPI</option>
                      <option value="other" className="bg-zinc-900">Others</option>
                    </select>
                    {paymentApp === 'other' && (
                      <input type="text" placeholder="Payment App Name" value={otherApp} onChange={(e) => setOtherApp(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:border-purple-500/50 outline-none placeholder:text-white/25" />
                    )}
                    <input type="text" placeholder="Transaction ID (e.g. TXN123...)" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:border-purple-500/50 outline-none placeholder:text-white/25" />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={submitting} className={`w-full font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98] ${selectedTicket.id === 'vip'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black'
                  : 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white'
                }`}>
                {submitting ? <Loader className="w-4 h-4 animate-spin" /> : 'Submit Ticket Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══ Success Modal ═══ */}
      {purchasedTicketId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6" data-lenis-prevent="true" onClick={() => { setPurchasedTicketId(null); navigate('/dashboard'); }}>
          <div className="relative w-full max-w-sm rounded-2xl border border-green-500/30 bg-[#0e0018] shadow-[0_0_40px_rgba(34,197,94,0.15)] text-center p-8 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-80" />
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Request Submitted!</h3>
            <p className="text-white/60 text-sm mb-6">Your ticket purchase request is under review. Please keep your Ticket ID safe.</p>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 relative group flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-1">Your Ticket ID</span>
                <span className="text-3xl font-black tracking-widest text-fuchsia-400 font-mono select-all">{purchasedTicketId}</span>
              </div>
              <button onClick={handleCopy} className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors border border-white/10 z-10">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
              <div className="absolute inset-0 border border-fuchsia-500/0 group-hover:border-fuchsia-500/30 rounded-xl transition-colors duration-300 pointer-events-none" />
            </div>

            <button onClick={() => { setPurchasedTicketId(null); navigate('/dashboard'); }} className="w-full py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95">
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetTicket;
