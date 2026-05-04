import React from "react"
import hero from "../assets/hero.mp4"
import picon from "../assets/logo.png"

export default function LandingPage() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <video
                src={hero}
                className="absolute inset-0 w-full h-full object-cover -z-10"
                style={{ transformOrigin: 'center' }}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-[60px] text-white text-center px-4">
                <img src={picon} alt="Logo" className="w-20 mb-4 absolute left-5 top-10 h-20 w-60" />

                <div className="absolute top-10 right-10 bg-[#2a0845]/40 backdrop-blur-md w-[60%] h-[60px] rounded-full border border-white/10 shadow-lg">
                    <div className="flex items-center justify-between h-full text-sm font-medium text-white px-8">
                        <div className="cursor-pointer hover:text-gray-200 transition-colors">Home</div>
                        <div className="cursor-pointer hover:text-gray-200 transition-colors">Event</div>
                        <div className="cursor-pointer hover:text-gray-200 transition-colors">Gallery</div>
                        <div className="cursor-pointer hover:text-gray-200 transition-colors">Committee</div>
                        <div className="cursor-pointer hover:text-gray-200 transition-colors">Sponsor</div>
                        <div className="cursor-pointer hover:text-gray-200 transition-colors">Contact</div>
                        <div className="text-white font-semibold bg-[#7a28cb] hover:bg-[#6520a8] cursor-pointer rounded-full px-6 py-2 transition-all">Register</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

