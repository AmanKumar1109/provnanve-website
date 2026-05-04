import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Calendar, MapPin, Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import heroVideo from '../assets/hero.mp4';

const Dashboard = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-black">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
            >
                <source src={heroVideo} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0014]/90 via-[#0a0014]/70 to-[#0a0014]/90 z-0"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent z-0"></div>

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
                className="relative z-10 w-full max-w-4xl"
            >
                <div className="glass-panel p-8 md:p-12 rounded-[2rem] border-purple-500/20 shadow-[0_0_50px_rgba(124,58,237,0.15)] overflow-hidden">
                    <div className="text-center mb-10">
                        <h1
                            style={{ fontFamily: "'Luckiest Guy', system-ui" }}
                            className="text-5xl md:text-6xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 via-yellow-400 via-cyan-400 to-purple-400 animate-gradient-text drop-shadow-[0_4px_10px_rgba(168,85,247,0.5)] mb-4 tracking-wider"
                        >
                            MEMBER DASHBOARD
                        </h1>
                        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                        <p className="mt-4 text-sm text-white/70">
                            Welcome back, {user?.email || 'Member'}! Here's your event information.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <User className="w-6 h-6 text-purple-400" />
                                <h3 className="text-xl font-semibold text-white">Profile Information</h3>
                            </div>
                            <div className="space-y-2 text-white/80">
                                <p><span className="font-medium">Email:</span> {user?.email}</p>
                                <p><span className="font-medium">Status:</span> Registered Member</p>
                            </div>
                        </div>

                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Calendar className="w-6 h-6 text-purple-400" />
                                <h3 className="text-xl font-semibold text-white">Event Details</h3>
                            </div>
                            <div className="space-y-2 text-white/80">
                                <p><span className="font-medium">Event:</span> Provenance 2026</p>
                                <p><span className="font-medium">Date:</span> Coming Soon</p>
                                <p><span className="font-medium">Location:</span> RVS College</p>
                            </div>
                        </div>

                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="w-6 h-6 text-purple-400" />
                                <h3 className="text-xl font-semibold text-white">Registration Status</h3>
                            </div>
                            <div className="space-y-2 text-white/80">
                                <p><span className="font-medium">Status:</span> <span className="text-green-400">Confirmed</span></p>
                                <p><span className="font-medium">T-Shirt Size:</span> Pending Selection</p>
                            </div>
                        </div>

                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Shirt className="w-6 h-6 text-purple-400" />
                                <h3 className="text-xl font-semibold text-white">Quick Actions</h3>
                            </div>
                            <div className="space-y-3">
                                <Link
                                    to="/signup"
                                    className="block w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
                                >
                                    Sign Up for Events
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-white/60 text-sm">
                            Need help? Contact the event organizers for any questions about your registration.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;