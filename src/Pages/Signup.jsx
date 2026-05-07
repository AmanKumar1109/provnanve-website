import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Trophy, Music, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroVideo from '../assets/hero.mp4';

const Signup = () => {
    const [selectedEvents, setSelectedEvents] = useState([]);

    const events = [
        {
            id: 'technical',
            title: 'Technical Events',
            description: 'Coding competitions, hackathons, and technical workshops',
            icon: <Trophy className="w-8 h-8" />,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'cultural',
            title: 'Cultural Events',
            description: 'Dance, music, drama, and cultural performances',
            icon: <Music className="w-8 h-8" />,
            color: 'from-pink-500 to-rose-500'
        },
        {
            id: 'sports',
            title: 'Sports Events',
            description: 'Indoor and outdoor sports competitions',
            icon: <Users className="w-8 h-8" />,
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 'photography',
            title: 'Photography Contest',
            description: 'Capture the best moments of the event',
            icon: <Camera className="w-8 h-8" />,
            color: 'from-purple-500 to-violet-500'
        }
    ];

    const toggleEvent = (eventId) => {
        setSelectedEvents(prev =>
            prev.includes(eventId)
                ? prev.filter(id => id !== eventId)
                : [...prev, eventId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        console.log('Selected events:', selectedEvents);
        alert('Successfully signed up for selected events!');
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-black">
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
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
                            EVENT SIGNUP
                        </h1>
                        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                        <p className="mt-4 text-sm text-white/70 max-w-2xl mx-auto">
                            Select the events you'd like to participate in. You can choose multiple events and update your selections anytime.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {events.map((event) => (
                                <motion.div
                                    key={event.id}
                                    whileHover={{ scale: 1.02 }}
                                    className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer ${selectedEvents.includes(event.id)
                                            ? 'border-purple-400 bg-purple-500/10 shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                                            : 'border-white/10 bg-black/40 hover:border-purple-400/50'
                                        }`}
                                    onClick={() => toggleEvent(event.id)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-lg bg-gradient-to-r ${event.color} text-white`}>
                                            {event.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                                            <p className="text-white/70 text-sm leading-relaxed">{event.description}</p>
                                        </div>
                                    </div>
                                    {selectedEvents.includes(event.id) && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-4 right-4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                                        >
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mb-8">
                            <p className="text-white/60 text-sm">
                                Selected {selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''}
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(124, 58, 237, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={selectedEvents.length === 0}
                            className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:from-purple-500 hover:to-pink-500 transition-all text-lg ${selectedEvents.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            CONFIRM SIGNUP
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-100 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;