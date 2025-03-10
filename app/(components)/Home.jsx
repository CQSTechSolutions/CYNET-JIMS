'use client';
import BigText from "@/app/(components)/BigText";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <section className={"w-screen h-screen overflow-hidden relative select-none"}>
            <div className={"flex items-center justify-between px-10 w-screen absolute top-2 left-0 right-0 md:left-4 md:right-auto z-10"}>
                <div className="flex items-center">
                    <Image 
                        src={"/jimslogo.webp"} 
                        alt={"logo"} 
                        width={100} 
                        height={100}
                        className="w-14 h-14 md:w-[100px] md:h-[100px]" 
                    />
                    <p className={"text-white text-xl md:text-4xl font-monot mx-2"}>X</p>
                    <Image 
                        src={"/eglogo.webp"} 
                        className={"w-10 h-10 md:w-[70px] md:h-[70px]"} 
                        alt={"logo"} 
                        width={70} 
                        height={70} 
                    />
                </div>
                <button onClick={toggleMenu} className="text-white text-3xl mr-4 md:mr-8 z-30 hover:text-gray-300 transition-colors">
                    ══
                </button>
            </div>
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-20 flex items-center justify-center text-center">
                    <div className="w-full md:w-full bg-black/95 h-full relative animate-slide-left flex flex-col items-center justify-center">
                        <button 
                            onClick={toggleMenu} 
                            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <nav className="h-full flex flex-col justify-center items-center px-12">
                            <div className="space-y-12 text-center w-screen text-center flex items-center justify-center flex-col">
                                <h2 className="text-white text-2xl mb-8 font-monot font-bold">MENU</h2>
                                <ul className="flex flex-col space-y-8 items-center justify-center w-min ml-10">
                                    <li className="border-b border-gray-800 pb-2">
                                        <a href="/" className="text-white text-3xl md:text-4xl hover:text-green-500 transition-all hover:pl-4 duration-300 flex items-center group font-monot">
                                            Home
                                            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        </a>
                                    </li>
                                    <li className="border-b border-gray-800 pb-2 ml-4">
                                        <a href="/register-for-events" className="text-white text-3xl md:text-4xl hover:text-green-500 transition-all hover:pl-4 duration-300 flex items-center group font-monot">
                                            Regsitration
                                            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        </a>
                                    </li>
                                    <li className="border-b border-gray-800 pb-2">
                                        <a href="/gallery" className="text-white text-3xl md:text-4xl hover:text-green-500 transition-all hover:pl-4 duration-300 flex items-center group font-monot">
                                            Gallery
                                            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        </a>
                                    </li>
                                    <li className="border-b border-gray-800 pb-2">
                                        <a href="/contact" className="text-white text-3xl md:text-4xl hover:text-green-500 transition-all hover:pl-4 duration-300 flex items-center group font-monot">
                                            Contact
                                            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
            {/* Background Video */}
            <video 
                src={"/nnn.mp4"} 
                autoPlay 
                muted 
                loop 
                className="h-full w-full object-cover"
            ></video>
            <div id={"black-overlay"} className={"w-screen h-screen bg-black/30 absolute top-0 left-0"}></div>
            <div className={"absolute top-0 left-0 w-screen h-screen"}>
                <BigText/>
            </div>
        </section>
    );
}

export default Home;