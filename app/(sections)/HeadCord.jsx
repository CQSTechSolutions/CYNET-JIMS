"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const heads = [
	{
		name: "Dhruv",
		role: "President - Enigma IT Club",
		image: "/our-team/dhruv.jpeg",
	},
	{ name: "Jatinder", role: "President - Bug Slayers", image: "/pr2.jpeg" },
];

const HeadCord = () => {
	const [activeIndex, setActiveIndex] = useState(null);

	return (
		<section className="w-full min-h-screen bg-[url('/7.png')] bg-cover bg-center text-white relative">
			<div className="absolute inset-0 bg-black/50"></div>
			<h2 className="font-monot text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl p-3 py-8 sm:py-12 md:py-16 lg:py-20 flex flex-col justify-center items-center relative z-10">
				<span>Head</span>
				<span>Coordinators</span>
			</h2>
			<div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-10 relative z-10 pb-8 sm:pb-12">
				{heads.map((head, i) => (
					<motion.div
						key={i}
						className="relative w-[280px] sm:w-[240px] md:w-[260px] lg:w-[280px] aspect-[3/4] rounded-lg overflow-hidden shadow-lg cursor-pointer mb-6 sm:mb-0"
						whileHover={{ scale: 1.05 }}
						onClick={() => setActiveIndex(activeIndex === i ? null : i)}
					>
						{/* Image */}
						<Image
							src={head.image}
							alt={head.name}
							fill
							className="rounded-lg object-cover"
							sizes="(max-width: 640px) 280px, (max-width: 768px) 240px, (max-width: 1024px) 260px, 280px"
						/>

						{/* Overlay with Name and Role */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{
								opacity: activeIndex === i || false ? 1 : 0,
							}}
							whileHover={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
							className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-4"
						>
							<p className="text-base sm:text-lg md:text-xl font-bold capitalize text-center">
								{head.name}
							</p>
							<p className="text-xs sm:text-sm md:text-base text-center mt-2">
								{head.role}
							</p>
						</motion.div>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default HeadCord;
