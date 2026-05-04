import React from "react"
import hero from "../assets/hero.mp4"

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
            <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white text-center px-4">
                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" alt="Logo" className="w-20 mb-4" />
                <div className="absolute top-10 right-5 bg-[#c167ff] opacity-25 w-[60%] h-[60px] rounded-full flex items-center justify-evenly px-6 ">
                    <div>Home</div>
                    <div>Gallery</div>
                    <div>event</div>
                    <div>committee</div>
                    <div>sponsor</div>
                    <div>contact</div>
                    <div className="text-white font-bold bg-[#c167ff] rounded-full px-4 py-2">register</div>

                </div>
            </div>

        </div>
    )
}

