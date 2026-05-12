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

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.uid) {
                setLoading(false);
                return;
            }
            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleUnenroll = async (eventDetail) => {
        if (!window.confirm(`Are you sure you want to unenroll from ${eventDetail.title}?`)) return;
        setUnrollingEvent(eventDetail.title);
        try {
            const userRef = doc(db, 'users', user.uid);
            
            // Remove from local profile state arrays to compute new arrays
            const newRegisteredEvents = profile.registeredEvents.filter(e => e !== eventDetail.title);
            const newRegisteredEventsDetails = profile.registeredEventsDetails.filter(e => e.title !== eventDetail.title);
            
            await updateDoc(userRef, {
                registeredEvents: newRegisteredEvents,
                registeredEventsDetails: newRegisteredEventsDetails
            });
            
            // Delete from event collection
            await deleteDoc(doc(db, eventDetail.title, user.uid));
            
            setProfile({ ...profile, registeredEvents: newRegisteredEvents, registeredEventsDetails: newRegisteredEventsDetails });
            
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

            const updatedDetails = profile.registeredEventsDetails.map(evt => {
                if (evt.entryFee && evt.eventPaymentStatus === 'pending') {
                    return { ...evt, eventPaymentStatus: 'reviewing', transactionId, paymentApp: finalPaymentApp };
                }
                return evt;
            });

            await updateDoc(userRef, {
                registeredEventsDetails: updatedDetails
            });

            setProfile({ ...profile, registeredEventsDetails: updatedDetails });
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

    const paidEvents = profile?.registeredEventsDetails?.filter(e => e.entryFee) || [];
    const freeEvents = profile?.registeredEventsDetails?.filter(e => !e.entryFee) || [];
    
    const pendingPaidEvents = paidEvents.filter(e => e.eventPaymentStatus === 'pending');
    const totalAmountDue = pendingPaidEvents.reduce((acc, curr) => acc + (curr.entryFee || 0), 0);

    return (
        <div className="min-h-screen bg-[#09000f] text-white">
            <nav className="border-b border-white/10 bg-[#0e0018]/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <span style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-sm font-bold tracking-widest text-purple-400 uppercase">
                    Provenance 6.0
                </span>
                <button onClick={handleLogout} className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors text-sm font-medium">
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-1">Member Dashboard</h1>
                    <p className="text-white/40 text-sm">Welcome back, <span className="text-purple-400">{profile?.name || user?.email || 'Member'}</span></p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        
                        {/* Reg ID Card */}
                        {profile?.registerationId && (
                            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl px-5 py-4 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold tracking-widest uppercase text-purple-400 mb-1">Registration ID</p>
                                    <p className="text-2xl font-bold font-mono text-white tracking-[0.3em]">{profile.registerationId}</p>
                                </div>
                                <button onClick={() => { navigator.clipboard.writeText(profile.registerationId); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${copied ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-white/60 border border-white/10 hover:bg-purple-500/20 hover:text-purple-400'}`}>
                                    {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
                                </button>
                            </div>
                        )}

                        {/* Event Payment Summary & Pay Flow */}
                        {paidEvents.length > 0 && (
                            <div className="bg-[#0e0018] border border-amber-500/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                                <div className="px-6 py-4 border-b border-amber-500/20 flex items-center justify-between bg-amber-500/5">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="w-5 h-5 text-amber-400" />
                                        <h2 className="font-bold text-amber-400">Paid Events Summary</h2>
                                    </div>
                                    <span className="text-amber-400/80 text-sm font-medium">Total Due: ₹{totalAmountDue}</span>
                                </div>
                                
                                <div className="divide-y divide-white/5">
                                    {paidEvents.map((event, idx) => (
                                        <div key={idx} className="px-6 py-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                                                <div>
                                                    <span className="text-white text-sm font-medium">{event.title}</span>
                                                    {event.teamType && <span className="ml-2 text-[10px] uppercase text-white/40 border border-white/10 px-1.5 py-0.5 rounded">Team: {event.teamType}</span>}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-amber-400 font-bold text-sm">₹{event.entryFee}</span>
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                                                    event.eventPaymentStatus === 'verified' ? 'bg-green-500/20 text-green-400' :
                                                    event.eventPaymentStatus === 'reviewing' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                    {event.eventPaymentStatus === 'verified' ? 'Verified' : event.eventPaymentStatus === 'reviewing' ? 'Reviewing' : 'Pending'}
                                                </span>
                                                {event.eventPaymentStatus === 'pending' && (
                                                    <button onClick={() => handleUnenroll(event)} disabled={unrollingEvent === event.title} className="text-red-400 hover:text-red-300 transition-colors p-1" title="Unenroll">
                                                        {unrollingEvent === event.title ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {totalAmountDue > 0 && (
                                    <div className="p-6 bg-black/40 border-t border-white/5">
                                        <h3 className="text-sm font-bold text-white mb-4">Complete Payment for Pending Events</h3>
                                        <div className="flex flex-col md:flex-row gap-8">
                                            <div className="shrink-0 flex flex-col items-center">
                                                <div className="w-32 h-32 bg-white rounded-lg p-2 mb-2">
                                                    <img src={qrcode} alt="UPI QR Code" className="w-full h-full object-contain" />
                                                </div>
                                                <span className="text-xs text-white/50">Scan & Pay ₹{totalAmountDue}</span>
                                            </div>
                                            <form onSubmit={handleEventPayment} className="flex-1 space-y-4">
                                                {payError && <div className="text-red-400 text-xs flex gap-1 items-center"><AlertCircle className="w-3 h-3"/> {payError}</div>}
                                                {paySuccess && <div className="text-green-400 text-xs flex gap-1 items-center"><CheckCircle className="w-3 h-3"/> {paySuccess}</div>}
                                                <select value={paymentApp} onChange={e => setPaymentApp(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-amber-500/50 outline-none">
                                                    <option value="" disabled className="bg-zinc-900">Select Payment App</option>
                                                    <option value="gpay" className="bg-zinc-900">Google Pay</option>
                                                    <option value="phonepe" className="bg-zinc-900">PhonePe</option>
                                                    <option value="paytm" className="bg-zinc-900">Paytm</option>
                                                    <option value="other" className="bg-zinc-900">Other</option>
                                                </select>
                                                {paymentApp === 'other' && (
                                                    <input type="text" placeholder="Enter Payment App Name" value={otherPaymentApp} onChange={e => setOtherPaymentApp(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-amber-500/50 outline-none" />
                                                )}
                                                <input type="text" placeholder="Transaction ID (e.g. TXN123...)" value={transactionId} onChange={e => setTransactionId(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-amber-500/50 outline-none" />
                                                <button type="submit" disabled={paying} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
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
                            <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-purple-400" />
                                <h2 className="font-semibold text-white">My Registered Free Events</h2>
                            </div>
                            {freeEvents.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {freeEvents.map((event, idx) => (
                                        <div key={idx} className="flex items-center justify-between px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                                                <span className="text-white/80 text-sm">{event.title}</span>
                                            </div>
                                            <button onClick={() => handleUnenroll(event)} disabled={unrollingEvent === event.title} className="text-red-400/50 hover:text-red-400 transition-colors p-1" title="Unenroll">
                                                {unrollingEvent === event.title ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-8 text-center text-white/30 text-sm">No free events registered.</div>
                            )}
                        </div>

                        {/* Profile Info */}
                        <div className="bg-[#0e0018] border border-white/10 rounded-xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                                <User className="w-5 h-5 text-purple-400" />
                                <h2 className="font-semibold text-white">Profile Information</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
                                <div className="bg-[#0e0018] p-4 flex gap-3"><User className="w-4 h-4 text-purple-400/60" /><div className="text-sm"><p className="text-white/40">Name</p><p>{profile?.name}</p></div></div>
                                <div className="bg-[#0e0018] p-4 flex gap-3"><Mail className="w-4 h-4 text-purple-400/60" /><div className="text-sm"><p className="text-white/40">Email</p><p>{profile?.email}</p></div></div>
                                <div className="bg-[#0e0018] p-4 flex gap-3"><Phone className="w-4 h-4 text-purple-400/60" /><div className="text-sm"><p className="text-white/40">Mobile</p><p>{profile?.mobile}</p></div></div>
                                <div className="bg-[#0e0018] p-4 flex gap-3"><Building2 className="w-4 h-4 text-purple-400/60" /><div className="text-sm"><p className="text-white/40">College</p><p>{profile?.collegeName}</p></div></div>
                                <div className="bg-[#0e0018] p-4 flex gap-3"><GraduationCap className="w-4 h-4 text-purple-400/60" /><div className="text-sm"><p className="text-white/40">Branch</p><p>{branchMap[profile?.branch] || profile?.branch}</p></div></div>
                                {profile?.collegeType === 'within' && <div className="bg-[#0e0018] p-4 flex gap-3"><Hash className="w-4 h-4 text-purple-400/60" /><div className="text-sm"><p className="text-white/40">Roll No</p><p>{profile?.rollNumber}</p></div></div>}
                            </div>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;