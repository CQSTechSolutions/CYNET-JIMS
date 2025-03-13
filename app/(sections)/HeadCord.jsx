"use client";
import Image from "next/image";
import {motion} from "framer-motion";

const heads = [
    {name: "Dhruv", role: "President", image: "/prs.webp"},
    {name: "Jatinder", role: "President", image: "/pr2.jpeg"}

];

const HeadCord = () => {
    return (
        <section className="w-full min-h-screen bg-[url('/7.png')] text-white relative">
            <div className='absolute inset-0 bg-black/50'></div>
            <h2 className="font-monot text-center text-3xl md:text-4xl lg:text-5xl p-3 py-12 md:py-16 lg:py-20 flex flex-col justify-center items-center relative z-10">
                <span>Head</span>
                <span>Coordinators</span>
            </h2>
            <div
                className="flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:gap-10 lg:gap-12 md:px-8 lg:px-10 relative z-10">
                {heads.map((head, i) => (
                    <motion.div
                        key={i}
                        className="relative w-[280px] md:w-[20vw] lg:w-[220px] h-[320] md:h-[240px] lg:h-[260px] rounded-lg overflow-hidden shadow-lg cursor-pointer"
                        whileHover={{scale: 1.05}}
                    >
                        {/* Image */}
                        <Image
                            src={head.image}
                            alt={head.name}
                            fill
                            className="rounded-lg object-cover"
                        />

                        {/* Overlay with Name and Role */}
                        <motion.div
                            initial={{opacity: 0}}
                            whileHover={{opacity: 1}}
                            transition={{duration: 0.3}}
                            className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white"
                        >
                            <p className="text-lg md:text-xl font-bold capitalize">{head.name}</p>
                            <p className="text-xs md:text-sm">{head.role}</p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HeadCord;
