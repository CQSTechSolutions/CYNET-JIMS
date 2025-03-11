"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

const heads = [
  { 
    name: "Divyan Mayank", 
    role: "President", 
    designation: "Technical Head",
    position: "Core Team",
    image: "/vp2.webp" 
  },
  { 
    name: "Harshit Verma", 
    role: "Vice President", 
    designation: "Event Coordinator",
    position: "Management Team",
    image: "/em.webp" 
  },
  { 
    name: "Mehak Arora", 
    role: "Vice President", 
    designation: "Creative Head",
    position: "Design Team",
    image: "/sc.webp" 
  },
  { 
    name: "Kirat Awasth", 
    role: "President", 
    designation: "Marketing Lead",
    position: "PR Team",
    image: "/mt.webp" 
  },
  { 
    name: "Hardik Solanki", 
    role: "President", 
    designation: "Operations Head",
    position: "Core Team",
    image: "/pr.webp" 
  },
  { 
    name: "Aniket Choudhary", 
    role: "Vice President", 
    designation: "Social Media Manager",
    position: "Marketing Team",
    image: "/sm.webp" 
  },
  { 
    name: "Rachel Arora", 
    role: "Vice President", 
    designation: "Content Head",
    position: "Creative Team",
    image: "/smd.webp" 
  },
  { 
    name: "John Doe", 
    role: "Vice President", 
    designation: "Technical Coordinator",
    position: "Development Team",
    image: "/ct.webp" 
  },
];

const Ourteam = () => {
  return (
    <section className="w-full min-h-screen text-white relative">
      <video 
        src="/10.mp4" 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      ></video>
      <h2 className="font-monot text-center text-3xl sm:text-4xl md:text-5xl p-3 py-12 sm:py-16 md:py-20 relative z-10">
        Our Team
      </h2>
      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-4 sm:px-6 md:px-8 lg:px-10 space-y-4 relative z-10">
        {heads.map((head, i) => {
          const { ref, inView } = useInView({
            threshold: 0.1,
            triggerOnce: true
          });

          return (
            <motion.div
              key={i}
              ref={ref}
              className="relative w-full break-inside-avoid mb-4 group"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }} // staggered animation
            >
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg cursor-pointer">
                {/* Image */}
                <Image
                  src={head.image}
                  alt={head.name}
                  fill
                  className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay that appears on hover */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-center space-y-2">
                    <p className="text-lg sm:text-xl font-bold">{head.name}</p>
                    <p className="text-xs sm:text-sm text-[#CBFF4D] font-semibold">{head.role}</p>
                    <div className="w-12 h-0.5 bg-[#CBFF4D] mx-auto my-2"></div>
                    <p className="text-sm text-white/90">{head.designation}</p>
                    <p className="text-xs text-[#CBFF4D]/80">{head.position}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Ourteam;
