'use client';
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className={"flex items-center justify-between px-10 w-screen absolute top-2 left-0 right-0 md:left-4 md:right-auto z-10"}>
                <div className="flex justify-center items-center">
                    <Link href={"/"}>
                    <Image 
                        src={"/jimslogo.webp"} 
                        alt={"logo"} 
                        width={100} 
                        height={100}
                        className="w-14 h-14 md:w-[100px] md:h-[100px]" 
                        />
                    </Link>
                    <Image 
                     src={"/vk2logo.png"} 
                     alt={"logo"} 
                     width={100} 
                     height={100}
                     className="w-14 h-14 md:w-[100px] md:h-[100px] rounded-full" 
                    />
                    <Image 
                        src={"/eglogo.webp"} 
                        className={"w-10 h-10 md:w-[70px] md:h-[70px]"} 
                        alt={"logo"} 
                        width={70} 
                        height={70} 
                    />
                </div>
                {!isMenuOpen && (
                    <button 
                        onClick={toggleMenu} 
                        className="relative group w-10 h-10 flex justify-center items-center z-30"
                    >
                        <span className={`relative flex overflow-hidden items-center justify-center w-8 h-8 transform transition-all`}>
                            <span className={`flex flex-col justify-between gap-1 group cursor-pointer transform transition-all duration-300`}>
                                <span className={`bg-white h-[3px] w-48 group-hover:bg-green-500 transform transition-all duration-300 origin-left`}></span>
                                <span className={`bg-white h-[3px] w-48 group-hover:bg-green-500 transform transition-all duration-300 origin-left`}></span>
                                <span className={`bg-white h-[3px] w-48 group-hover:bg-green-500 rounded transform transition-all duration-300`}></span>
                            </span>
                        </span>
                    </button>
                )}
            </div>

            <div className={`fixed inset-0 bg-black/80 backdrop-blur-md z-20 transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className={`w-full h-full bg-black/95 relative transform transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <button 
                        onClick={toggleMenu}
                        className="absolute top-6 right-10 text-white hover:text-gray-300 transition-colors z-50"
                    >
                        <div className="w-8 h-8 flex items-center justify-center">
                            <div className="relative w-7 h-7">
                                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white rotate-45"></div>
                                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white -rotate-45"></div>
                            </div>
                        </div>
                    </button>

                    <nav className="h-full flex flex-col justify-center items-center px-12">
                        <div className="space-y-12 text-center w-screen text-center flex items-center justify-center flex-col">
                            <h2 className="text-white text-2xl mb-8 font-monot font-bold">MENU</h2>
                            <ul className="flex flex-col space-y-8 items-center justify-center w-min ml-10">
                                {[
                                    { href: "/", text: "Home" },
                                    // { href: "/events", text: "Events" },
                                    { href: "/register-for-events", text: "Registration" },
                                    { href: "/gallery", text: "Gallery" },
                                    { href: "/contact", text: "Contact" }
                                ].map((item, index) => (
                                    <li key={index} className="border-b border-gray-800 pb-2">
                                        <Link 
                                            href={item.href} 
                                            className="text-white text-3xl md:text-4xl hover:text-green-500 active:text-green-500 transition-all hover:pl-4 duration-300 flex items-center group font-monot"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.text}
                                            <span className="ml-2 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">→</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Navbar;
