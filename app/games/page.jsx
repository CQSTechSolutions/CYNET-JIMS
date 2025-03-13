"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Navbar from "@/app/(components)/Navbar";
import gameData from '@/helpers/gamedata.json';

const GameCard = ({ game }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <Link href={`/games/${game.id}`}>
        <div className={`backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-red-500/10 
          transition-all duration-300 hover:transform hover:scale-105
          hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] 
          bg-[#540909]`}>
          {/* Card Header */}
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent truncate pb-4">
              {game.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-300">
                {game.platform}
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-rose-500/20 text-rose-300">
                {game.format}
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-300">
                {game.location}
              </span>
            </div>
          </div>

          {/* Rules Preview */}
          <div className="mt-4">
            <ul className="space-y-2">
              {game.rules.slice(0, 3).map((rule, index) => (
                <li key={index} className="text-gray-400 text-sm flex items-start space-x-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span className={"truncate"}>{rule}</span>
                </li>
              ))}
              {game.rules.length > 3 && (
                <li className="text-red-400 text-sm italic">
                  +{game.rules.length - 3} more rules...
                </li>
              )}
            </ul>
          </div>

          {/* Price Tag */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-right">
              <span className="text-green-400 font-semibold text-lg">
                ₹{game.price}
              </span>
            </div>
            {game.miniGames && (
              <span className="text-sm text-gray-400">
                {game.miniGames.length} mini-games included
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const GamesPage = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-b from-[#210000] to-[#830101] text-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10" ref={ref}>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-white text-transparent bg-gradient-to-r from-red-400 via-rose-500 to-red-400">
              Gaming Tournaments
            </h1>
            <p className="text-green-400 text-lg">
              Compete in our thrilling gaming competitions and prove your skills
            </p>
          </motion.div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gameData.gamedata.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamesPage;