"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const heads = [
  { name: "Varun", role: "President", image: "/vp2.webp" },
  { name: "John Doe", role: "Vice President", image: "/sc.webp" },
  { name: "Varun", role: "President", image: "/pr.webp" },
  { name: "John Doe", role: "Vice President", image: "/em.webp" },
  { name: "Varun", role: "President", image: "/mt.webp" },
  { name: "John Doe", role: "Vice President", image: "/sm.webp" },
  { name: "John Doe", role: "Vice President", image: "/smd.webp" },
];

const Ourteam = () => {
  return (
    <section className="w-full min-h-screen bg-[url('/8.png')] text-white">
      <h2 className="font-monot text-center text-3xl sm:text-4xl md:text-5xl p-3 py-12 sm:py-16 md:py-20 flex flex-col justify-center items-center">
        <span>Our Team</span>
      </h2>
      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-4 sm:px-6 md:px-8 lg:px-10 space-y-4">
        {heads.map((head, i) => (
          <motion.div
            key={i}
            className="relative w-full break-inside-avoid mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg cursor-pointer">
              {/* Image */}
              <Image
                src={head.image}
                alt={head.name}
                fill
                className="rounded-lg object-cover"
              />

              {/* Sliding Name Overlay */}
              <motion.div
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="absolute bottom-0 left-0 w-full h-full bg-black/70 flex flex-col items-center justify-center text-white"
              >
                <p className="text-lg sm:text-xl font-bold">{head.name}</p>
                <p className="text-xs sm:text-sm">{head.role}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Ourteam;
