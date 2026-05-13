import React, { useEffect, useState } from 'react';
import { ArrowLeft, User, Mail, Phone, GraduationCap, Hash, Shirt, CheckCircle, Calendar, Building2, LogOut, ShieldCheck, ShieldX, Copy, Check, Trash2, CreditCard, AlertCircle, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import qrcode from '../assets/qr.jpg';

const Dashboard = () => {
    const { user, logout, login } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    // Event Payment States
    const [paymentApp, setPaymentApp] = useState('');
    const [otherPaymentApp, setOtherPaymentApp] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [paying, setPaying] = useState(false);
    const [payError, setPayError] = useState('');
    const [paySuccess, setPaySuccess] = useState('');
    const [unrollingEvent, setUnrollingEvent] = useState(null);

    // Highly robust fallback profile containing user object data or fetched profile
    const currentProfile = profile || user || {};

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.uid) {
                setLoading(false);
                return;
            }
            try {
                const docRef = doc(db, 'users', user.uid);
                // Force fetch fresh data from the server directly to bypass cached/stale data
                let docSnap;
                try {
                    docSnap = await getDoc(docRef, { source: 'server' });
                } catch (serverErr) {
                    console.warn('Server fetch failed, falling back to default/cache:', serverErr);
                    docSnap = await getDoc(docRef);
                }

                if (docSnap.exists()) {
                    const freshData = docSnap.data();
                    setProfile(freshData);
                    if (login && typeof login === 'function') {
                        login({ ...user, ...freshData });
                    }
                } else {
                    setProfile(user);
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                setProfile(user);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user?.uid]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleUnenroll = async (eventDetail) => {
        if (!window.confirm(`Are you sure you want to unenroll from ${eventDetail.title}?`)) return;
        setUnrollingEvent(eventDetail.title);
        try {
            const userRef = doc(db, 'users', user.uid);

            const currentEvts = currentProfile.registeredEvents || [];
            const currentDetails = currentProfile.registeredEventsDetails || [];

            // Remove from local profile state arrays to compute new arrays
            const newRegisteredEvents = currentEvts.filter(e => e !== eventDetail.title);
            const newRegisteredEventsDetails = currentDetails.filter(e => e.title !== eventDetail.title);

            await updateDoc(userRef, {
                registeredEvents: newRegisteredEvents,
                registeredEventsDetails: newRegisteredEventsDetails
            });

            // Delete from event collection
            await deleteDoc(doc(db, eventDetail.title, user.uid));

            setProfile({ ...currentProfile, registeredEvents: newRegisteredEvents, registeredEventsDetails: newRegisteredEventsDetails });

            // Update auth context
            if (user) {
                login({ ...user, registeredEvents: newRegisteredEvents, registeredEventsDetails: newRegisteredEventsDetails });
            }
        } catch (error) {
            console.error("Unenroll error", error);
            alert("Failed to unenroll.");
        } finally {
            setUnrollingEvent(null);
        }
    };

    const handleEventPayment = async (e) => {
        e.preventDefault();
        if (!paymentApp || !transactionId) {
            setPayError("Please provide both payment app and transaction ID.");
            return;
        }
        if (paymentApp === 'other' && !otherPaymentApp.trim()) {
            setPayError("Please enter the payment app name.");
            return;
        }
        setPaying(true);
        setPayError('');
        try {
            const userRef = doc(db, 'users', user.uid);

            const finalPaymentApp = paymentApp === 'other' ? otherPaymentApp.trim() : paymentApp;

            const currentDetails = currentProfile.registeredEventsDetails || [];
            const updatedDetails = currentDetails.map(evt => {
                if (evt.entryFee && evt.eventPaymentStatus === 'pending') {
                    return { ...evt, eventPaymentStatus: 'reviewing', transactionId, paymentApp: finalPaymentApp };
                }
                return evt;
            });

            await updateDoc(userRef, {
                registeredEventsDetails: updatedDetails
            });

            const newProfileState = { ...currentProfile, registeredEventsDetails: updatedDetails };
            setProfile(newProfileState);
            if (login && typeof login === 'function') {
                login({ ...user, ...newProfileState });
            }
            setPaySuccess("Payment submitted for review.");
            setPaymentApp('');
            setOtherPaymentApp('');
            setTransactionId('');
            setTimeout(() => setPaySuccess(''), 3000);
        } catch (error) {
            console.error("Payment error", error);
            setPayError("Failed to submit payment. Try again.");
        } finally {
            setPaying(false);
        }
    };

    const branchMap = {
        bca: 'BCA', bba: 'BBA', mca: 'MCA', diploma: 'Diploma', cse: 'CSE', aiml: 'AI/ML', ece: 'ECE', eee: 'EEE', me: 'ME', civil: 'Civil Engineering',
    };

    const tshirtMap = { s: 'S', m: 'M', l: 'L', xl: 'XL', xxl: 'XXL' };

    const paidEvents = currentProfile?.registeredEventsDetails?.filter(e => e.entryFee) || [];
    const freeEvents = currentProfile?.registeredEventsDetails?.filter(e => !e.entryFee) || [];

    const pendingPaidEvents = paidEvents.filter(e => e.eventPaymentStatus === 'pending');
    const totalAmountDue = pendingPaidEvents.reduce((acc, curr) => acc + (curr.entryFee || 0), 0);

    return (
        <div className="min-h-screen bg-[#09000f] text-white">
            <nav className="border-b border-white/10 bg-[#0e0018]/80 backdrop-blur-sm px-4 sm:px-6 py-4 flex items-center justify-between gap-2">
                <Link to="/" className="flex items-center gap-1.5 sm:gap-2 text-white/60 hover:text-white transition-colors text-xs sm:text-sm font-medium shrink-0">
                    <ArrowLeft className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Back to Home</span><span className="sm:hidden">Home</span>
                </Link>
                <span style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-xs sm:text-sm font-bold tracking-wider sm:tracking-widest text-purple-400 uppercase text-center truncate">
                    Provenance 6.0
                </span>
                <button onClick={handleLogout} className="flex items-center gap-1.5 sm:gap-2 text-white/50 hover:text-red-400 transition-colors text-xs sm:text-sm font-medium shrink-0">
                    <LogOut className="w-4 h-4 shrink-0" /> <span>Logout</span>
                </button>
            </nav>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Member Dashboard</h1>
                        <p className="text-white/40 text-xs sm:text-sm">Welcome back, <span className="text-purple-400 break-words">{currentProfile?.name || user?.email || 'Member'}</span></p>
                    </div>
                    <button
                        onClick={async () => {
                            if (!user?.uid) return;
                            setLoading(true);
                            try {
                                const docSnap = await getDoc(doc(db, 'users', user.uid));
                                if (docSnap.exists()) {
                                    setProfile(docSnap.data());
                                    if (login && typeof login === 'function') {
                                        login({ ...user, ...docSnap.data() });
                                    }
                                }
                            } catch (err) {
                                console.error('Refresh error:', err);
                            } finally {
                                setLoading(false);
                            }
                        }}
                        className="w-full sm:w-auto justify-center text-xs bg-white/5 hover:bg-white/10 text-purple-300 border border-white/10 px-4 py-2.5 sm:py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <span>🔄</span> Refresh Details
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-4 sm:space-y-6">

                        {/* Reg ID Card */}
                        {(currentProfile?.registerationId || currentProfile?.registrationId) && (
                            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="w-full sm:w-auto">
                                    <p className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-purple-400 mb-1">Registration ID</p>
                                    <p className="text-lg sm:text-2xl font-bold font-mono text-white tracking-widest sm:tracking-[0.3em] break-all">{currentProfile.registerationId || currentProfile.registrationId}</p>
                                </div>
                                <button onClick={() => { navigator.clipboard.writeText(currentProfile.registerationId || currentProfile.registrationId); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                                    className={`w-full sm:w-auto justify-center flex items-center gap-2 px-4 py-2.5 sm:py-2 rounded-lg text-xs font-bold uppercase transition-all ${copied ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-white/60 border border-white/10 hover:bg-purple-500/20 hover:text-purple-400'}`}>
                                    {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
                                </button>
                            </div>
                        )}

                        {/* Event Payment Summary & Pay Flow */}
                        {paidEvents.length > 0 && (
                            <div className="bg-[#0e0018] border border-amber-500/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                                <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between bg-amber-500/5 gap-1.5 sm:gap-0">
                                    <div className="flex items-center gap-2.5 sm:gap-3">
                                        <CreditCard className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                                        <h2 className="font-bold text-amber-400 text-sm sm:text-base">Paid Events Summary</h2>
                                    </div>
                                    <span className="text-amber-400/80 text-xs sm:text-sm font-medium self-end sm:self-auto">Total Due: ₹{totalAmountDue}</span>
                                </div>

                                <div className="divide-y divide-white/5">
                                    {paidEvents.map((event, idx) => (
                                        <div key={idx} className="px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 shrink-0 mt-1.5 sm:mt-0" />
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-white text-xs sm:text-sm font-medium block sm:inline break-words">{event.title}</span>
                                                    {event.teamType && <span className="mt-1 sm:mt-0 block sm:inline-block sm:ml-2 text-[9px] sm:text-[10px] uppercase text-white/40 border border-white/10 px-1.5 py-0.5 rounded w-max">Team: {event.teamType}</span>}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t border-white/5 sm:border-t-0">
                                                <span className="text-amber-400 font-bold text-xs sm:text-sm">₹{event.entryFee}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:py-1 rounded-md uppercase tracking-wider ${event.eventPaymentStatus === 'verified' ? 'bg-green-500/20 text-green-400' :
                                                            event.eventPaymentStatus === 'reviewing' ? 'bg-blue-500/20 text-blue-400' :
                                                                'bg-yellow-500/20 text-yellow-400'
                                                        }`}>
                                                        {event.eventPaymentStatus === 'verified' ? 'Verified' : event.eventPaymentStatus === 'reviewing' ? 'Reviewing' : 'Pending'}
                                                    </span>
                                                    {event.eventPaymentStatus === 'pending' && (
                                                        <button onClick={() => handleUnenroll(event)} disabled={unrollingEvent === event.title} className="text-red-400 hover:text-red-300 transition-colors p-1.5 sm:p-1" title="Unenroll">
                                                            {unrollingEvent === event.title ? <Loader className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {totalAmountDue > 0 && (
                                    <div className="p-4 sm:p-6 bg-black/40 border-t border-white/5">
                                        <h3 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4 text-center sm:text-left">Complete Payment for Pending Events</h3>
                                        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-center sm:items-start">
                                            <div className="shrink-0 flex flex-col items-center bg-white/5 p-4 rounded-xl border border-white/10 w-full sm:w-auto">
                                                <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-lg p-2 mb-2">
                                                    <img src={qrcode} alt="UPI QR Code" className="w-full h-full object-contain" />
                                                </div>
                                                <span className="text-[11px] sm:text-xs text-white/70 font-medium">Scan & Pay ₹{totalAmountDue}</span>
                                            </div>
                                            <form onSubmit={handleEventPayment} className="w-full flex-1 space-y-3 sm:space-y-4">
                                                {payError && <div className="text-red-400 text-xs flex gap-1 items-center bg-red-500/10 p-2 rounded-lg border border-red-500/20"><AlertCircle className="w-3.5 h-3.5 shrink-0" /> <span>{payError}</span></div>}
                                                {paySuccess && <div className="text-green-400 text-xs flex gap-1 items-center bg-green-500/10 p-2 rounded-lg border border-green-500/20"><CheckCircle className="w-3.5 h-3.5 shrink-0" /> <span>{paySuccess}</span></div>}
                                                <select value={paymentApp} onChange={e => setPaymentApp(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 sm:py-3 px-3.5 sm:px-4 text-xs sm:text-sm text-white focus:border-amber-500/50 outline-none">
                                                    <option value="" disabled className="bg-zinc-900">Select Payment App</option>
                                                    <option value="gpay" className="bg-zinc-900">Google Pay</option>
                                                    <option value="phonepe" className="bg-zinc-900">PhonePe</option>
                                                    <option value="paytm" className="bg-zinc-900">Paytm</option>
                                                    <option value="other" className="bg-zinc-900">Other</option>
                                                </select>
                                                {paymentApp === 'other' && (
                                                    <input type="text" placeholder="Enter Payment App Name" value={otherPaymentApp} onChange={e => setOtherPaymentApp(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 sm:py-3 px-3.5 sm:px-4 text-xs sm:text-sm text-white focus:border-amber-500/50 outline-none" />
                                                )}
                                                <input type="text" placeholder="Transaction ID (e.g. TXN123...)" value={transactionId} onChange={e => setTransactionId(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 sm:py-3 px-3.5 sm:px-4 text-xs sm:text-sm text-white focus:border-amber-500/50 outline-none" />
                                                <button type="submit" disabled={paying} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md">
                                                    {paying ? <Loader className="w-4 h-4 animate-spin" /> : 'Submit Payment Details'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Free Events Card */}
                        <div className="bg-[#0e0018] border border-white/10 rounded-xl overflow-hidden">
                            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 flex items-center gap-2.5 sm:gap-3 bg-white/[0.02]">
                                <Calendar className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-purple-400 shrink-0" />
                                <h2 className="font-semibold text-white text-xs sm:text-base">My Registered Free Events</h2>
                            </div>
                            {freeEvents.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {freeEvents.map((event, idx) => (
                                        <div key={idx} className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 gap-2">
                                            <div className="flex items-start sm:items-center gap-2.5 sm:gap-4 min-w-0">
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 shrink-0 mt-1.5 sm:mt-0" />
                                                <span className="text-white/80 text-xs sm:text-sm break-words leading-tight">{event.title}</span>
                                            </div>
                                            <button onClick={() => handleUnenroll(event)} disabled={unrollingEvent === event.title} className="text-red-400/50 hover:text-red-400 transition-colors p-1.5 sm:p-1 shrink-0" title="Unenroll">
                                                {unrollingEvent === event.title ? <Loader className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-4 sm:px-6 py-6 sm:py-8 text-center text-white/30 text-xs sm:text-sm">No free events registered.</div>
                            )}
                        </div>

                        {/* Profile Info */}
                        <div className="bg-[#0e0018] border border-white/10 rounded-xl overflow-hidden">
                            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 flex items-center gap-2.5 sm:gap-3 bg-white/[0.02]">
                                <User className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-purple-400 shrink-0" />
                                <h2 className="font-semibold text-white text-xs sm:text-base">Profile Information</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
                                <div className="bg-[#0e0018] p-3 sm:p-4 flex gap-3 items-start"><User className="w-4 h-4 text-purple-400/60 shrink-0 mt-0.5" /><div className="text-xs sm:text-sm min-w-0 flex-1"><p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">Name</p><p className="break-words font-medium">{currentProfile?.name || 'N/A'}</p></div></div>
                                <div className="bg-[#0e0018] p-3 sm:p-4 flex gap-3 items-start"><Mail className="w-4 h-4 text-purple-400/60 shrink-0 mt-0.5" /><div className="text-xs sm:text-sm min-w-0 flex-1"><p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">Email</p><p className="break-all font-medium">{currentProfile?.email || 'N/A'}</p></div></div>
                                <div className="bg-[#0e0018] p-3 sm:p-4 flex gap-3 items-start"><Phone className="w-4 h-4 text-purple-400/60 shrink-0 mt-0.5" /><div className="text-xs sm:text-sm min-w-0 flex-1"><p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">Mobile</p><p className="font-medium">{currentProfile?.mobile || 'N/A'}</p></div></div>
                                <div className="bg-[#0e0018] p-3 sm:p-4 flex gap-3 items-start"><Building2 className="w-4 h-4 text-purple-400/60 shrink-0 mt-0.5" /><div className="text-xs sm:text-sm min-w-0 flex-1"><p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">College</p><p className="break-words font-medium">{currentProfile?.collegeName || 'N/A'}</p></div></div>
                                <div className="bg-[#0e0018] p-3 sm:p-4 flex gap-3 items-start"><GraduationCap className="w-4 h-4 text-purple-400/60 shrink-0 mt-0.5" /><div className="text-xs sm:text-sm min-w-0 flex-1"><p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">Branch</p><p className="break-words font-medium">{currentProfile?.branch ? (branchMap[currentProfile.branch?.toLowerCase()] || currentProfile.branch?.toUpperCase()) : 'N/A'}</p></div></div>
                                {currentProfile?.collegeType === 'within' && <div className="bg-[#0e0018] p-3 sm:p-4 flex gap-3 items-start"><Hash className="w-4 h-4 text-purple-400/60 shrink-0 mt-0.5" /><div className="text-xs sm:text-sm min-w-0 flex-1"><p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">Roll No</p><p className="font-mono font-medium break-all">{currentProfile?.rollNumber || 'N/A'}</p></div></div>}
                            </div>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;