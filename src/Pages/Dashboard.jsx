import React, { useEffect, useState } from 'react';
import { ArrowLeft, User, Mail, Phone, GraduationCap, Hash, Shirt, CheckCircle, Clock, Calendar, Building2, LogOut, ShieldCheck, ShieldX, Copy, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

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

    const branchMap = {
        cse: 'Computer Science',
        ece: 'Electronics & Communication',
        ee: 'Electrical Engineering',
        me: 'Mechanical Engineering',
        ce: 'Civil Engineering',
    };

    const tshirtMap = {
        s: 'Small (S)',
        m: 'Medium (M)',
        l: 'Large (L)',
        xl: 'Extra Large (XL)',
        xxl: 'XXL',
    };

    return (
        <div className="min-h-screen bg-[#09000f] text-white">
            {/* Top Nav Bar */}
            <nav className="border-b border-white/10 bg-[#0e0018]/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
                <span
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                    className="text-sm font-bold tracking-widest text-purple-400 uppercase"
                >
                    Provenance 6.0
                </span>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors text-sm font-medium"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-10">

                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-1">Member Dashboard</h1>
                    <p className="text-white/40 text-sm">
                        Welcome back, <span className="text-purple-400">{profile?.name || user?.email || 'Member'}</span>
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-6">

                        {/* Verification Status Banner */}
                        <div className={`flex items-center gap-4 rounded-xl px-5 py-4 border ${profile?.isVerified
                                ? 'bg-green-500/10 border-green-500/30'
                                : 'bg-yellow-500/10 border-yellow-500/30'
                            }`}>
                            {profile?.isVerified ? (
                                <>
                                    <ShieldCheck className="w-6 h-6 text-green-400 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-green-400 text-sm">Payment Verified</p>
                                        <p className="text-white/50 text-xs mt-0.5">Your registration has been confirmed by the organizers.</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <ShieldX className="w-6 h-6 text-yellow-400 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-yellow-400 text-sm">Verification Pending</p>
                                        <p className="text-white/50 text-xs mt-0.5">Your payment is being reviewed. Please wait for confirmation.</p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Registration ID Card */}
                        {profile?.registerationId && (
                            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl px-5 py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold tracking-widest uppercase text-purple-400 mb-1">Your Registration ID</p>
                                        <p className="text-2xl font-bold font-mono text-white tracking-[0.3em]">{profile.registerationId}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(profile.registrationId);
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 2000);
                                        }}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${copied
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                : 'bg-white/5 text-white/60 border border-white/10 hover:bg-purple-500/20 hover:text-purple-400 hover:border-purple-500/30'
                                            }`}
                                    >
                                        {copied ? (
                                            <><Check className="w-4 h-4" /> Copied!</>
                                        ) : (
                                            <><Copy className="w-4 h-4" /> Copy</>
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-white/40 mt-2">Keep this ID safe. You will need it for event check-in.</p>
                            </div>
                        )}

                        {/* Profile Details Card */}
                        <div className="bg-[#0e0018] border border-white/10 rounded-xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                                <User className="w-5 h-5 text-purple-400" />
                                <h2 className="font-semibold text-white">Profile Information</h2>
                            </div>
                            <div className="divide-y divide-white/5">

                                {/* Name */}
                                <div className="flex items-center gap-4 px-6 py-4">
                                    <User className="w-4 h-4 text-purple-400/60 shrink-0" />
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-white/40 text-sm">Full Name</span>
                                        <span className="text-white text-sm font-medium">{profile?.name || '—'}</span>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-4 px-6 py-4">
                                    <Mail className="w-4 h-4 text-purple-400/60 shrink-0" />
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-white/40 text-sm">Email</span>
                                        <span className="text-white text-sm font-medium">{profile?.email || user?.email || '—'}</span>
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div className="flex items-center gap-4 px-6 py-4">
                                    <Phone className="w-4 h-4 text-purple-400/60 shrink-0" />
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-white/40 text-sm">Mobile</span>
                                        <span className="text-white text-sm font-medium">{profile?.mobile || '—'}</span>
                                    </div>
                                </div>

                                {/* College */}
                                <div className="flex items-center gap-4 px-6 py-4">
                                    <Building2 className="w-4 h-4 text-purple-400/60 shrink-0" />
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-white/40 text-sm">College</span>
                                        <span className="text-white text-sm font-medium">{profile?.collegeName || '—'}</span>
                                    </div>
                                </div>

                                {/* Roll Number (only for within college) */}
                                {profile?.collegeType === 'within' && (
                                    <div className="flex items-center gap-4 px-6 py-4">
                                        <Hash className="w-4 h-4 text-purple-400/60 shrink-0" />
                                        <div className="flex-1 flex items-center justify-between">
                                            <span className="text-white/40 text-sm">Roll Number</span>
                                            <span className="text-white text-sm font-medium">{profile?.rollNumber || '—'}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Branch */}
                                <div className="flex items-center gap-4 px-6 py-4">
                                    <GraduationCap className="w-4 h-4 text-purple-400/60 shrink-0" />
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-white/40 text-sm">Branch</span>
                                        <span className="text-white text-sm font-medium">
                                            {branchMap[profile?.branch] || profile?.branch || '—'}
                                        </span>
                                    </div>
                                </div>

                                {/* T-Shirt Size */}
                                <div className="flex items-center gap-4 px-6 py-4">
                                    <Shirt className="w-4 h-4 text-purple-400/60 shrink-0" />
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-white/40 text-sm">T-Shirt Size</span>
                                        <span className="text-white text-sm font-medium">
                                            {tshirtMap[profile?.tshirtSize] || profile?.tshirtSize || '—'}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Registered Events Card */}
                        <div className="bg-[#0e0018] border border-white/10 rounded-xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-purple-400" />
                                <h2 className="font-semibold text-white">My Registered Events</h2>
                            </div>

                            {profile?.registeredEvents && profile.registeredEvents.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {profile.registeredEvents.map((event, idx) => (
                                        <div key={idx} className="flex items-center gap-4 px-6 py-4">
                                            <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                                            <span className="text-white/80 text-sm">{event}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-8 text-center">
                                    <Calendar className="w-8 h-8 text-white/20 mx-auto mb-3" />
                                    <p className="text-white/30 text-sm">No events registered yet.</p>
                                    <p className="text-white/20 text-xs mt-1">Events will appear here once the organizers assign them.</p>
                                </div>
                            )}
                        </div>

                        {/* Payment Info */}
                        <div className="bg-[#0e0018] border border-white/10 rounded-xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-purple-400" />
                                <h2 className="font-semibold text-white">Payment Details</h2>
                            </div>
                            <div className="divide-y divide-white/5">
                                <div className="flex items-center gap-4 px-6 py-4">
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-white/40 text-sm">Payment App</span>
                                        <span className="text-white text-sm font-medium capitalize">{profile?.paymentApp || '—'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 px-6 py-4">
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-white/40 text-sm">Transaction ID</span>
                                        <span className="text-white text-sm font-medium font-mono">{profile?.transactionId || '—'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 px-6 py-4">
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-white/40 text-sm">Payment Status</span>
                                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${profile?.isVerified
                                                ? 'text-green-400 bg-green-500/10'
                                                : 'text-yellow-400 bg-yellow-500/10'
                                            }`}>
                                            {profile?.isVerified ? 'Verified' : 'Pending Review'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer note */}
                        <p className="text-center text-white/25 text-xs pb-4">
                            Need help? Contact the organizers at provenance@rvscet.ac.in
                        </p>

                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;