"use client"
import React from 'react'

const Events = () => {
    const eventList = [
        "innovision-6",
        "ai-design-sprint",
        "hack-the-hunt",
        "gamexcite",
        "byete-beyond",
        "green-pixel",
        "green-tech-quest"
    ];
    return (
        <div className='w-screen min-h-screen font-poppins flex gap-8 flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-[url(/cynet_eve_bg.png)] py-20 relative'>
            <div className='absolute inset-0 bg-black/50'></div>
            <h2 className='text-4xl md:text-6xl font-monot text-white mt-16 z-2'>Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 md:p-8 max-w-7xl mx-auto">
                {eventList.slice(0, 4).map((event, index) => (
                    <div 
                        key={index}
                        className="hexagon-container group"
                    >
                        <div className="hexagon bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/90 transition-all duration-300 border border-green-500">
                            <div className="hexagon-content">
                                <h3 className="text-white text-lg md:text-2xl capitalize text-center font-poppins font-bold text-xl group-hover:text-green-400 transition-colors">
                                    {event.replace(/-/g, ' ')}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4 md:p-8 max-w-7xl mx-auto">
                {eventList.slice(4).map((event, index) => (
                    <div 
                        key={index + 4}
                        className="hexagon-container group"
                    >
                        <div className="hexagon bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/90 transition-all duration-300 border border-green-500">
                            <div className="hexagon-content">
                                <h3 className="text-white text-lg md:text-2xl capitalize text-center font-poppins font-bold group-hover:text-green-400 transition-colors">
                                    {event.replace(/-/g, ' ')}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .hexagon-container {
                    width: 100%;
                    padding-top: 115%; /* Maintain aspect ratio */
                    position: relative;
                    cursor: pointer;
                    min-width: 200px;
                }
                
                .hexagon {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                    transition: transform 0.3s ease;
                }
                
                .hexagon-content {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 15%;
                }
                
                .hexagon-container:hover .hexagon {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    )
}

export default Events;

