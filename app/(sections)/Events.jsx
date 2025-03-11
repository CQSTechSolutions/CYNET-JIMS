"use client"
import React from 'react'

const Events = () => {
    return (
        <div className='w-screen min-h-screen bg-[#1A0F0F] relative'>
            {/* Date and Tagline */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-10">
                <div className="bg-[#2A4220] rounded-xl inline-block px-12 py-4 mb-6">
                    <h2 className="text-[#CBFF4D] text-5xl font-bold tracking-wider">
                        22 MARCH 2025
                    </h2>
                </div>
                <p className="text-[#CBFF4D] text-2xl italic font-light">
                    "Code and clay, a better way."
                </p>
            </div>

            {/* Main Content - Events Layout */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-full max-w-[1400px]">
                {/* Top Row */}
                <div className="flex justify-center items-center gap-8 mb-20">
                    {["INNOVISION 6.0", "TECHNO TREASURE", "GEN AI DESIGN SPRINT", "GAMEXCITE", "TECHWHIZ"].map((event, index) => (
                        <div className="relative w-[250px] h-[230px] flex items-center justify-center mx-2.5 
                                        xl:w-[220px] xl:h-[200px] lg:w-[180px] lg:h-[170px] md:w-[150px] md:h-[140px]" 
                             key={index}>
                            <div className={`relative w-full h-full bg-[url('/hexagon.png')] bg-contain bg-center bg-no-repeat
                                           transition-all duration-300 hover:brightness-125 
                                           ${index < 3 ? 'hover:rotate-y-5 hover:rotate-x-5 hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]' : ''}`}>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center z-10">
                                    <h3 className="text-[#CBFF4D] text-2xl font-bold mb-2 lg:text-xl md:text-lg">
                                        {event}
                                    </h3>
                                    <p className="text-[#9EF8FF] text-lg lg:text-base md:text-sm">
                                        {getEventDescription(event)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Row */}
                <div className="flex justify-center items-center gap-8 mt-10">
                    <div className="w-[300px]"></div> {/* Spacer */}
                    {["REELIFY", "UX MARVELS"].map((event, index) => (
                        <div className="relative w-[250px] h-[230px] flex items-center justify-center mx-2.5
                                        xl:w-[220px] xl:h-[200px] lg:w-[180px] lg:h-[170px] md:w-[150px] md:h-[140px]" 
                             key={index}>
                            <div className="relative w-full h-full bg-[url('/hexagon.png')] bg-contain bg-center bg-no-repeat
                                          transition-all duration-300 hover:brightness-125
                                          hover:rotate-y-5 hover:rotate-x-5 hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center z-10">
                                    <h3 className="text-[#CBFF4D] text-2xl font-bold mb-2 lg:text-xl md:text-lg">
                                        {event}
                                    </h3>
                                    <p className="text-[#9EF8FF] text-lg lg:text-base md:text-sm">
                                        {getEventDescription(event)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="w-[300px]"></div> {/* Spacer */}
                </div>
            </div>
        </div>
    )
}

const getEventDescription = (event) => {
    const descriptions = {
        "INNOVISION 6.0": "Ideathon Competition",
        "TECHNO TREASURE": "Treasure Hunt",
        "GEN AI DESIGN SPRINT": "Poster Making Competition",
        "GAMEXCITE": "Gaming Event",
        "TECHWHIZ": "Kahoot Quiz Competition",
        "REELIFY": "Reel Making Challenge",
        "UX MARVELS": "Figma UI Challenge"
    };
    return descriptions[event] || "";
}

export default Events;
