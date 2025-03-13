"use client"
import React from 'react'
import TechnoTreasure from "@/app/(components)/TechnoTreasure";
import TechWhiz from "@/app/(components)/TechWhiz";
import Reelify from "@/app/(components)/Reelify";
import UxMarvels from "@/app/(components)/UxMarvels";
import GamexCite from "@/app/(components)/Gamexcite";
import GenAi from "@/app/(components)/GenAi";
import Inovision from "@/app/(components)/Inovision";

const Events = () => {
    const eventComponents = [
        <Inovision />,
        <TechnoTreasure />,
        <TechWhiz />,
        <Reelify />,
        <UxMarvels />,
        <GamexCite />,
        <GenAi />
    ]
    return (
        <div className='w-screen min-h-auto bg-[#1A0F0F] py-8' id='events'>
            <h1 className='text-white text-center py-4 mb-2 font-monot text-3xl sm:text-4xl md:text-5xl'>Events</h1>
            
            {/* SVG  Rendering*/}
            <div className='flex flex-wrap justify-center items-center px-4 lg:px-8 gap-4'>
                {
                    eventComponents.map((component, index) => (
                        <div key={index} className='cursor-pointer hover:scale-90 transform transition-transform duration-300'>
                            {component}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Events;