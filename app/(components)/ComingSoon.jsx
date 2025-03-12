import React from 'react'
import Navbar from './Navbar'

const ComingSoon = () => {
  return (
    <div className="w-screen h-screen overflow-hidden select-none">
        <Navbar />
        <div className="w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-t from-red-600 to-black">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-monot text-white uppercase text-center">coming soon</h1>
        </div>
    </div>
  )
}

export default ComingSoon