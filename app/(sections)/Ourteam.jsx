"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const heads = [
  {
    name: "Divyant Mayank",
    role: "Vice President",
    position: "Core Team",
    image: "/our-team/DivyantMayank.jpg",
  },
  {
    name: "Vivek Prasad",
    role: "Vice President (Bug Slayers)",
    position: "Core Team",
    image: "/our-team/VivekPrasad.jpg",
  },
  {
    name: "Divyanshi Shukla",
    role: "Vice President (Bug Slayers)",
    position: "Core Team",
    image: "/our-team/divyanshishukla.jpg",
  },
  {
    name: "Mehak Arora",
    role: "Secretary",
    position: "Core Team",
    image: "/our-team/mehak.jpeg",
  },
  {
    name: "Megha",
    role: "Secretary (Bug Slayers)",
    position: "Core Team",
    image: "/our-team/Megha.jpg",
  },
  {
    name: "Harshit Verma",
    role: "Events Management Director",
    position: "Management Team",
    image: "/our-team/harshitVerma.jpg",
  },
  {
    name: "Garima Negi",
    role: "Decoration Manager",
    position: "Core Team",
    image: "/our-team/Garimanegi.jpg",
  },
  {
    name: "Kirat Awasthi",
    role: "Marketing Director",
    position: "Marketing Team",
    image: "/our-team/kirat.jpeg",
  },
  {
    name: "Vanshika Vats",
    role: "Social Media Director (Bug Slayers)",
    position: "Social Media Team",
    image: "/our-team/VanshikaVats.jpg",
  },
  {
    name: "Hardik Solanki",
    role: "Public Relation Director",
    position: "Public Relations Team",
    image: "/our-team/HardikSolanki.jpg",
  },
  {
    name: "Keshav Aggarwal",
    role: "Developer Director",
    position: "Developer Team",
    image: "/dvd.webp",
  },
  {
    name: "Rachel Arora",
    role: "Social Media Director",
    position: "Social Media Team",
    image: "/our-team/rachel.jpeg",
  },
  {
    name: "Gurnoor Kaur Pawan",
    role: "Content Director",
    position: "Content Team",
    image: "/our-team/gurnoor.jpeg",
  },
  {
    name: "Harshit Kapur",
    role: "Stills & Motions",
    position: "Stills & Motions Team",
    image: "/our-team/harshitkapoor.jpg",
  },
];

const Ourteam = () => {
  return (
    <div id="our-team">
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
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-6 md:px-8 lg:px-10 relative z-10 pb-10">
          {heads.map((head, i) => {
            const { ref, inView } = useInView({
              threshold: 0.1,
              triggerOnce: true,
            });

            return (
              <motion.div
                key={i}
                ref={ref}
                className="relative w-full group"
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

                  {/* Overlay that appears on hover/touch */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                    <div className="transform translate-y-4 group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300 text-center space-y-2">
                      <p className="text-lg sm:text-xl font-bold">{head.name}</p>
                      <p className="text-xs sm:text-sm text-[#CBFF4D] font-semibold">
                        {head.role} - {head.position}
                      </p>
                      <div className="w-12 h-0.5 bg-[#CBFF4D] mx-auto my-2"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Ourteam;
