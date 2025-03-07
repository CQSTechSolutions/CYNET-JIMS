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
    <section className="w-full min-h-screen bg-gradient-to-b from-pink-500 to-black text-white">
      <h2 className="font-monot text-center text-5xl p-3 py-20 flex flex-col justify-center items-center">
        <span>Our Team</span>
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-12 px-10">
        {heads.map((head, i) => (
          <motion.div
            key={i}
            className="relative w-[220px] h-[260px] rounded-lg overflow-hidden shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            {/* Image */}
            <Image
              src={head.image}
              alt={head.name}
              width={220}
              height={260}
              className="rounded-lg"
            />

            {/* Sliding Name Overlay */}
            <motion.div
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="absolute bottom-0 left-0 w-full h-full bg-black/70 flex flex-col items-center justify-center text-white"
            >
              <p className="text-xl font-bold">{head.name}</p>
              <p className="text-sm">{head.role}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Ourteam;
