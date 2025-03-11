"use client"
import React from 'react'

const Events = () => {
    const e = ["INNOVISION 6.0", "TECHNO TREASURE", "GEN AI DESIGN SPRINT", "GAMEXCITE", "TECHWHIZ", "REELIFY", "UX MARVELS"];
    
    return (
        <div className='w-screen min-h-screen bg-[#1A0F0F]'>
            <h1 className='text-white text-center py-16 mb-2 font-monot text-5xl' >Events</h1>
            <div className='flex justify-center items-center py-8'>
                <img src="/events.png" alt="eve" />
            </div>
        </div>
    )
}

export default Events;
