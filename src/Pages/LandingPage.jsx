import React from "react";
import zenitsu from "../assets/zenitsu.mp4"

export default function LandingPage() {
    return (
        <div className="flex relative">
            <video
                src={zenitsu}
                class="fixed top-0 left-0 w-screen h-screen object-cover -z-10"
                autoplay
                loop
                muted
                playsinline>

            </video>

        </div>
    )
};