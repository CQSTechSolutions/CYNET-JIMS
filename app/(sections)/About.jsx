"use client";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

const About = () => {
    const { ref, inView } = useInView({
        threshold: 0.1, // Trigger when 10% of the component is in view
        triggerOnce: true // Only trigger once
    });

    return(
        <section className={"w-full min-h-screen bg-[url('/extra.png')] text-white relative bg-fixed"}>
            <div className='absolute inset-0 bg-black/50'></div>
            <div className='relative z-10' ref={ref}>
                <motion.h2 
                    className={"font-monot text-center text-3xl sm:text-4xl md:text-5xl p-3 py-10 md:py-20"} 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} 
                    transition={{ duration: 0.5 }}
                >
                    About - Cynet
                </motion.h2>
                <motion.div 
                    className={"font-poppins flex flex-col items-center justify-center text-justify text-base sm:text-lg md:text-xl lg:text-2xl gap-6 sm:gap-8 md:gap-10 px-4 sm:px-8 md:px-10 lg:px-12 mx-4 sm:mx-8 md:mx-16 lg:mx-24 rounded-md py-8 md:py-10 bg-gradient-to-br from-red-500 to-black"}
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }} 
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <p className="text-sm sm:text-base md:text-lg">CYNET, the flagship Annual IT Fest of JIMS Vasant Kunj, has been a beacon of technological excellence for the past 20 years. This hallmark event is a dynamic convergence of creativity and innovation, showcasing a diverse array of competitions. From the precision of website design to the excitement of treasure hunts, the cinematic craft of reel making, and the strategic intensity of gaming competitions, CYNET offers a comprehensive platform for IT enthusiasts.</p>

                    <p className="text-sm sm:text-base md:text-lg">What distinguishes CYNET is its broad appeal, drawing participants from across Delhi NCR. It has become a melting pot of talent, ideas, and enthusiasm, reflecting the rich diversity of the region's student community. As a testament to its success, CYNET has evolved beyond a mere fest becoming a hub for the exchange of ideas and the celebration of technological prowess.</p>
                </motion.div>
            </div>
            <style jsx>{`
                section {
                    animation: fadeIn 1s ease-in-out;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </section>
    )
};

export default About;