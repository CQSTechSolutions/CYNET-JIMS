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
        <div className='w-screen h-screen font-poppins flex gap-18 flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-black'>
            <h2 className='text-6xl font-monot text-white'>Events</h2>
            <div className="flex flex-wrap justify-center gap-6 p-8">
                {eventList.map((event, index) => (
                    <div 
                        key={index}
                        className="cursor-pointer bg-gray-800 p-8 rounded-lg shadow-lg w-64 flex justify-center items-center text-5xl transition-transform transform hover:scale-105"
                    >
                        <h3 className="text-white text-xl mb-2 capitalize text-center">
                            {event.replace(/-/g, ' ')}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Events